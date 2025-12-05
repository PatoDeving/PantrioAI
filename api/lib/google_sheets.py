"""
Integración con Google Sheets - Torre de Piedra Zarú
Adaptado para Vercel Serverless Functions
"""
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
import logging
from typing import Dict
from .config import settings

logger = logging.getLogger(__name__)

class GoogleSheetsService:
    """Servicio para guardar citas en Google Sheets"""

    def __init__(self):
        """Inicializa el servicio de Google Sheets"""
        self.sheet_id = settings.GOOGLE_SHEET_ID
        self.client = None
        self.sheet = None
        self.enabled = False

        if self.sheet_id:
            self._initialize()

    def _initialize(self):
        """Inicializa la conexión con Google Sheets"""
        try:
            # Obtener credenciales desde variables de entorno
            creds_dict = settings.get_google_credentials_dict()
            if not creds_dict:
                logger.warning("Credenciales de Google no configuradas")
                return

            # Scopes necesarios
            SCOPES = [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive.file'
            ]

            # Crear credenciales desde dict
            credentials = Credentials.from_service_account_info(
                creds_dict,
                scopes=SCOPES
            )

            # Crear cliente
            self.client = gspread.authorize(credentials)

            # Abrir la hoja de cálculo
            self.sheet = self.client.open_by_key(self.sheet_id).sheet1

            self.enabled = True
            logger.info("✓ Google Sheets inicializado correctamente")

        except Exception as e:
            logger.error(f"Error inicializando Google Sheets: {e}")
            self.enabled = False

    def _normalizar_hora(self, hora_str: str) -> str:
        """Normaliza diferentes formatos de hora a HH:MM"""
        if not hora_str:
            return ''

        hora_str = hora_str.strip().upper()

        if not hora_str:
            return ''

        try:
            if ':' in hora_str:
                hora_str = hora_str.replace(' AM', '').replace(' PM', '').replace('AM', '').replace('PM', '')
                hora_str = hora_str.strip()

                partes = hora_str.split(':')
                hora = int(partes[0])

                if len(partes) > 1 and partes[1]:
                    minutos_str = partes[1].strip()
                    minuto = int(minutos_str) if minutos_str else 0
                else:
                    minuto = 0

                return f"{hora:02d}:{minuto:02d}"

            else:
                hora_str = ''.join(c for c in hora_str if c.isdigit())
                if hora_str:
                    hora = int(hora_str)
                    return f"{hora:02d}:00"
                else:
                    return ''

        except (ValueError, IndexError) as e:
            logger.warning(f"No se pudo normalizar la hora: '{hora_str}' - Error: {e}")
            return ''

    def guardar_cita(self, cita: Dict) -> bool:
        """Guarda una cita en Google Sheets"""
        if not self.enabled:
            logger.warning("Google Sheets no está habilitado")
            return False

        try:
            fecha_registro = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            row = [
                fecha_registro,
                cita.get('nombre', ''),
                cita.get('telefono', ''),
                cita.get('email', ''),
                cita.get('ubicacion', 'Torre de Piedra'),
                cita.get('fecha', ''),
                cita.get('hora', ''),
                cita.get('estado', 'confirmada')
            ]

            # Obtener la siguiente fila disponible
            all_values = self.sheet.get_all_values()
            next_row = len(all_values) + 1

            # Escribir en el rango
            self.sheet.update(f'A{next_row}:H{next_row}', [row], value_input_option='USER_ENTERED')

            logger.info(f"✓ Cita guardada en Google Sheets: {cita.get('nombre')}")
            return True

        except Exception as e:
            logger.error(f"Error guardando cita en Google Sheets: {e}")
            return False

    def obtener_citas_fecha(self, fecha_str: str) -> list:
        """Obtiene todas las citas de una fecha específica"""
        if not self.enabled:
            return []

        try:
            all_values = self.sheet.get_all_values()

            if len(all_values) <= 1:
                return []

            citas_fecha = []
            for row in all_values[1:]:
                if len(row) >= 8:
                    fecha_cita = row[5].strip() if len(row) > 5 else ''
                    hora_cita_raw = row[6].strip() if len(row) > 6 else ''
                    estado = row[7].strip() if len(row) > 7 else 'confirmada'
                    nombre = row[1].strip() if len(row) > 1 else ''

                    if fecha_cita == fecha_str:
                        hora_cita = self._normalizar_hora(hora_cita_raw)

                        if estado.lower() == 'confirmada' and hora_cita:
                            citas_fecha.append({
                                'nombre': nombre,
                                'telefono': row[2] if len(row) > 2 else '',
                                'email': row[3] if len(row) > 3 else '',
                                'fecha': fecha_cita,
                                'hora': hora_cita,
                                'estado': estado
                            })

            return citas_fecha

        except Exception as e:
            logger.error(f"Error obteniendo citas de Google Sheets: {e}")
            return []
