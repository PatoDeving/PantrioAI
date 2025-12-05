"""
Integración con Google Calendar - Torre de Piedra Zarú
Adaptado para Vercel Serverless Functions
"""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from datetime import datetime, timedelta
import logging
from typing import Optional, Dict
import pytz
from .config import settings

logger = logging.getLogger(__name__)

class GoogleCalendarService:
    """Servicio para crear eventos en Google Calendar"""

    def __init__(self):
        """Inicializa el servicio de Google Calendar"""
        self.calendar_id = settings.GOOGLE_CALENDAR_ID or 'primary'
        self.timezone = settings.GOOGLE_CALENDAR_TIMEZONE
        self.service = None
        self.enabled = False

        self._initialize()

    def _initialize(self):
        """Inicializa la conexión con Google Calendar"""
        try:
            # Obtener credenciales desde variables de entorno
            creds_dict = settings.get_google_credentials_dict()
            if not creds_dict:
                logger.warning("Credenciales de Google no configuradas")
                return

            # Scopes necesarios
            SCOPES = [
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/calendar.events'
            ]

            # Crear credenciales desde dict
            credentials = Credentials.from_service_account_info(
                creds_dict,
                scopes=SCOPES
            )

            # Crear servicio
            self.service = build('calendar', 'v3', credentials=credentials)
            self.enabled = True
            logger.info("✓ Google Calendar inicializado correctamente")

        except Exception as e:
            logger.error(f"Error inicializando Google Calendar: {e}")
            self.enabled = False

    def crear_evento(self, cita: Dict) -> Optional[str]:
        """
        Crea un evento en Google Calendar
        """
        if not self.enabled:
            logger.warning("Google Calendar no está habilitado")
            return None

        try:
            # Parsear fecha y hora
            fecha_str = cita.get('fecha')
            hora_str = cita.get('hora')

            year, month, day = map(int, fecha_str.split('-'))
            hour, minute = map(int, hora_str.split(':'))

            # Crear datetime naive
            fecha_hora_naive = datetime(year, month, day, hour, minute, 0)

            # Convertir a zona horaria
            tz = pytz.timezone(self.timezone)
            fecha_hora = tz.localize(fecha_hora_naive)

            # Calcular fin (2 horas después)
            fecha_hora_fin = fecha_hora + timedelta(hours=2)

            # Preparar descripción
            descripcion = self._generar_descripcion(cita)

            # Crear evento
            event = {
                'summary': f"Cita - {cita.get('nombre', 'Cliente')} - Torre de Piedra",
                'location': cita.get('ubicacion', 'Torre de Piedra'),
                'description': descripcion,
                'start': {
                    'dateTime': fecha_hora.isoformat(),
                    'timeZone': self.timezone,
                },
                'end': {
                    'dateTime': fecha_hora_fin.isoformat(),
                    'timeZone': self.timezone,
                },
                'reminders': {
                    'useDefault': False,
                    'overrides': [
                        {'method': 'popup', 'minutes': 60},
                    ],
                },
            }

            # Crear el evento
            created_event = self.service.events().insert(
                calendarId=self.calendar_id,
                body=event,
                sendUpdates='none'
            ).execute()

            event_id = created_event.get('id')
            logger.info(f"✓ Evento creado en Google Calendar: {event_id}")

            return event_id

        except Exception as e:
            logger.error(f"Error creando evento en Google Calendar: {e}")
            return None

    def _generar_descripcion(self, cita: Dict) -> str:
        """Genera la descripción del evento"""
        descripcion = f"""CITA - TORRE DE PIEDRA ZARÚ

📋 INFORMACIÓN DEL CLIENTE:
Nombre: {cita.get('nombre', 'N/A')}
Teléfono: {cita.get('telefono', 'N/A')}
Email: {cita.get('email', 'N/A')}

📍 UBICACIÓN:
{cita.get('ubicacion', 'Torre de Piedra')}

---
Pantrio AI - Asistente de Agendamiento Inteligente
"""
        return descripcion

    def obtener_eventos_fecha(self, fecha_str: str) -> list:
        """
        Obtiene todos los eventos de una fecha específica
        """
        if not self.enabled:
            return []

        try:
            fecha = datetime.strptime(fecha_str, '%Y-%m-%d')

            time_min = fecha.replace(hour=0, minute=0, second=0).isoformat() + 'Z'
            time_max = fecha.replace(hour=23, minute=59, second=59).isoformat() + 'Z'

            events_result = self.service.events().list(
                calendarId=self.calendar_id,
                timeMin=time_min,
                timeMax=time_max,
                singleEvents=True,
                orderBy='startTime'
            ).execute()

            events = events_result.get('items', [])

            eventos_procesados = []
            for event in events:
                summary = event.get('summary', 'Sin título')
                start = event.get('start', {})
                start_datetime_str = start.get('dateTime', start.get('date'))

                if start_datetime_str and 'T' in start_datetime_str:
                    try:
                        if 'Z' in start_datetime_str:
                            start_datetime = datetime.fromisoformat(start_datetime_str.replace('Z', '+00:00'))
                        else:
                            start_datetime = datetime.fromisoformat(start_datetime_str)

                        tz_mexico = pytz.timezone(self.timezone)

                        if start_datetime.tzinfo is not None:
                            start_datetime_mexico = start_datetime.astimezone(tz_mexico)
                        else:
                            start_datetime_mexico = tz_mexico.localize(start_datetime)

                        hora = start_datetime_mexico.strftime('%H:%M')

                        eventos_procesados.append({
                            'id': event.get('id'),
                            'summary': summary,
                            'hora': hora,
                            'fecha': fecha_str
                        })
                    except Exception as e:
                        logger.warning(f"No se pudo parsear evento: {e}")

            return eventos_procesados

        except Exception as e:
            logger.error(f"Error obteniendo eventos de Google Calendar: {e}")
            return []
