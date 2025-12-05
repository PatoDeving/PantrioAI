"""
Sistema de Agendamiento de Citas - Torre de Piedra Zarú
Adaptado para Vercel Serverless Functions
"""
import json
import uuid
from datetime import datetime, timedelta, time
from typing import List, Dict, Optional
from .config import settings
from .google_sheets import GoogleSheetsService
from .google_calendar import GoogleCalendarService
import logging

logger = logging.getLogger(__name__)

class SistemaCitas:
    """Gestiona el agendamiento y disponibilidad de citas"""

    def __init__(self):
        self.citas = self._cargar_citas()
        self.horario_inicio = self._parse_time(settings.HORARIO_INICIO)
        self.horario_fin = self._parse_time(settings.HORARIO_FIN)
        self.max_citas_por_hora = settings.MAX_CITAS_POR_HORA

        # Inicializar Google Services
        self.google_sheets = GoogleSheetsService()
        self.google_calendar = GoogleCalendarService()

    def _parse_time(self, time_str: str) -> time:
        """Convierte string HH:MM a objeto time"""
        hour, minute = map(int, time_str.split(':'))
        return time(hour, minute)

    def _cargar_citas(self) -> List[Dict]:
        """Carga las citas desde el archivo JSON en /tmp"""
        try:
            if settings.CITAS_FILE.exists():
                with open(settings.CITAS_FILE, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    return data.get('citas', [])
            return []
        except Exception as e:
            logger.error(f"Error cargando citas: {e}")
            return []

    def _guardar_citas(self):
        """Guarda las citas en el archivo JSON en /tmp"""
        try:
            settings.CITAS_FILE.parent.mkdir(parents=True, exist_ok=True)
            with open(settings.CITAS_FILE, 'w', encoding='utf-8') as f:
                json.dump({'citas': self.citas}, f, ensure_ascii=False, indent=2)
        except Exception as e:
            logger.error(f"Error guardando citas: {e}")

    def _generar_horarios_dia(self) -> List[str]:
        """Genera todos los horarios disponibles en un día"""
        horarios = []
        hora_actual = self.horario_inicio

        while hora_actual < self.horario_fin:
            horarios.append(hora_actual.strftime('%H:%M'))
            hora_dt = datetime.combine(datetime.today(), hora_actual)
            hora_dt += timedelta(hours=1)
            hora_actual = hora_dt.time()

        return horarios

    def obtener_horarios_disponibles(self, fecha_str: str) -> Dict:
        """
        Obtiene los horarios disponibles para una fecha específica
        Consulta tanto el archivo local como Google Calendar y Sheets
        """
        try:
            fecha = datetime.strptime(fecha_str, '%Y-%m-%d').date()

            if fecha < datetime.now().date():
                return {
                    'fecha': fecha_str,
                    'horarios_disponibles': [],
                    'mensaje': 'No se pueden agendar citas en fechas pasadas'
                }

            todos_horarios = self._generar_horarios_dia()

            # Contar citas por horario
            citas_por_horario = {}
            for cita in self.citas:
                if cita['fecha'] == fecha_str and cita['estado'] == 'confirmada':
                    hora = cita['hora']
                    citas_por_horario[hora] = citas_por_horario.get(hora, 0) + 1

            # Consultar Google Calendar
            try:
                eventos_google = self.google_calendar.obtener_eventos_fecha(fecha_str)
                for evento in eventos_google:
                    hora = evento['hora']
                    citas_por_horario[hora] = citas_por_horario.get(hora, 0) + 1
            except Exception as e:
                logger.warning(f"No se pudieron obtener eventos de Google Calendar: {e}")

            # Consultar Google Sheets
            try:
                citas_sheets = self.google_sheets.obtener_citas_fecha(fecha_str)
                for cita in citas_sheets:
                    hora = cita['hora']
                    citas_por_horario[hora] = citas_por_horario.get(hora, 0) + 1
            except Exception as e:
                logger.warning(f"No se pudieron obtener citas de Google Sheets: {e}")

            # Filtrar horarios disponibles
            horarios_disponibles = []
            for horario in todos_horarios:
                citas_en_horario = citas_por_horario.get(horario, 0)
                if citas_en_horario < self.max_citas_por_hora:
                    horarios_disponibles.append({
                        'hora': horario,
                        'espacios_disponibles': self.max_citas_por_hora - citas_en_horario
                    })

            # Si es hoy, filtrar horarios que ya pasaron
            if fecha == datetime.now().date():
                hora_actual = datetime.now().time()
                horarios_disponibles = [
                    h for h in horarios_disponibles
                    if self._parse_time(h['hora']) > hora_actual
                ]

            return {
                'fecha': fecha_str,
                'dia_semana': settings.DIAS_SEMANA[fecha.weekday()],
                'horarios_disponibles': horarios_disponibles,
                'total_horarios': len(horarios_disponibles)
            }

        except ValueError:
            return {
                'fecha': fecha_str,
                'horarios_disponibles': [],
                'error': 'Formato de fecha inválido. Usa YYYY-MM-DD'
            }

    def validar_disponibilidad(self, fecha_str: str, hora_str: str) -> bool:
        """Valida si hay disponibilidad en una fecha y hora específica"""
        horarios_info = self.obtener_horarios_disponibles(fecha_str)

        if 'error' in horarios_info:
            return False

        for h in horarios_info['horarios_disponibles']:
            if h['hora'] == hora_str and h['espacios_disponibles'] > 0:
                return True

        return False

    def crear_cita(self, datos_cita: Dict) -> Dict:
        """Crea una nueva cita"""
        try:
            # Validar campos requeridos
            campos_requeridos = ['user_id', 'nombre', 'telefono', 'email', 'fecha', 'hora']
            for campo in campos_requeridos:
                if campo not in datos_cita or not datos_cita[campo]:
                    return {
                        'exito': False,
                        'error': f'Campo requerido faltante: {campo}'
                    }

            # Validar disponibilidad
            if not self.validar_disponibilidad(datos_cita['fecha'], datos_cita['hora']):
                return {
                    'exito': False,
                    'error': 'No hay disponibilidad en el horario seleccionado'
                }

            # Validar teléfono
            telefono = datos_cita['telefono'].strip()
            if len(telefono) < 10:
                return {
                    'exito': False,
                    'error': 'Teléfono inválido. Debe tener al menos 10 dígitos'
                }

            # Validar email
            email = datos_cita['email'].strip()
            if not email or '@' not in email or '.' not in email:
                return {
                    'exito': False,
                    'error': 'Email inválido'
                }

            # Crear la cita
            cita = {
                'id': str(uuid.uuid4()),
                'user_id': datos_cita['user_id'],
                'nombre': datos_cita['nombre'].strip(),
                'telefono': telefono,
                'email': email,
                'ubicacion': datos_cita.get('ubicacion', 'Torre de Piedra'),
                'fecha': datos_cita['fecha'],
                'hora': datos_cita['hora'],
                'estado': 'confirmada',
                'fecha_creacion': datetime.now().isoformat()
            }

            # Agregar a la lista
            self.citas.append(cita)

            # Guardar en JSON
            self._guardar_citas()

            # Guardar en Google Sheets
            try:
                self.google_sheets.guardar_cita(cita)
            except Exception as e:
                logger.warning(f"No se pudo guardar en Google Sheets: {e}")

            # Crear evento en Google Calendar
            try:
                event_id = self.google_calendar.crear_evento(cita)
                if event_id:
                    cita['google_calendar_event_id'] = event_id
                    self._guardar_citas()
            except Exception as e:
                logger.warning(f"No se pudo crear evento en Google Calendar: {e}")

            return {
                'exito': True,
                'cita': cita,
                'mensaje': f'Cita agendada exitosamente para el {cita["fecha"]} a las {cita["hora"]}'
            }

        except Exception as e:
            return {
                'exito': False,
                'error': f'Error al crear la cita: {str(e)}'
            }

    def obtener_cita(self, cita_id: str) -> Optional[Dict]:
        """Obtiene una cita por su ID"""
        for cita in self.citas:
            if cita['id'] == cita_id:
                return cita
        return None

    def obtener_citas(self, filtros: Optional[Dict] = None) -> List[Dict]:
        """Obtiene lista de citas con filtros opcionales"""
        resultado = self.citas.copy()

        if filtros:
            if 'fecha' in filtros:
                resultado = [c for c in resultado if c['fecha'] == filtros['fecha']]

            if 'estado' in filtros:
                resultado = [c for c in resultado if c['estado'] == filtros['estado']]

            if 'user_id' in filtros:
                resultado = [c for c in resultado if c['user_id'] == filtros['user_id']]

        resultado.sort(key=lambda x: (x['fecha'], x['hora']), reverse=True)

        return resultado

    def obtener_proximas_citas(self, dias: int = 7) -> List[Dict]:
        """Obtiene las próximas citas en los siguientes N días"""
        fecha_inicio = datetime.now().date()
        fecha_fin = fecha_inicio + timedelta(days=dias)

        proximas = []
        for cita in self.citas:
            if cita['estado'] != 'cancelada':
                fecha_cita = datetime.strptime(cita['fecha'], '%Y-%m-%d').date()
                if fecha_inicio <= fecha_cita <= fecha_fin:
                    proximas.append(cita)

        proximas.sort(key=lambda x: (x['fecha'], x['hora']))

        return proximas
