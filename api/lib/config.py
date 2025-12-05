"""
Configuración del Sistema - Torre de Piedra Zarú
Adaptado para Vercel Serverless Functions
"""
import os
import json
from pathlib import Path
from typing import Optional

# Directorio base del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"

class Settings:
    """Configuración de la aplicación con variables de entorno"""

    # Google Gemini AI (REQUERIDO)
    GEMINI_API_KEY: str = os.getenv('GEMINI_API_KEY', '')
    GEMINI_MODEL: str = os.getenv('GEMINI_MODEL', 'gemini-2.0-flash-exp')

    # Google APIs - Service Account JSON parseado desde variables de entorno
    GOOGLE_CREDENTIALS_JSON: Optional[str] = os.getenv('GOOGLE_CREDENTIALS_JSON')
    GOOGLE_SHEET_ID: Optional[str] = os.getenv('GOOGLE_SHEET_ID')
    GOOGLE_CALENDAR_ID: Optional[str] = os.getenv('GOOGLE_CALENDAR_ID')
    GOOGLE_CALENDAR_TIMEZONE: str = os.getenv('GOOGLE_CALENDAR_TIMEZONE', 'America/Mexico_City')

    # Archivos de datos (se usan en /tmp en Vercel)
    CITAS_FILE: Path = Path('/tmp/citas.json')
    CONVERSACIONES_FILE: Path = Path('/tmp/conversaciones.json')
    PROTOTIPOS_FILE: Path = DATA_DIR / "prototipos.json"

    # Configuración de citas
    HORARIO_INICIO: str = "09:00"
    HORARIO_FIN: str = "18:00"
    MAX_CITAS_POR_HORA: int = 1
    DIAS_SEMANA: list = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]

    # Información de contacto
    TELEFONO_VENTAS: str = "442 161 2000"
    INSTAGRAM: str = "@torredepiedra"
    WEBSITE: str = "vialli.mx"
    EMAIL_CONTACTO: str = "contacto@vialli.mx"

    @staticmethod
    def get_google_credentials_dict():
        """Parsea el JSON de credenciales de Google desde variable de entorno"""
        if Settings.GOOGLE_CREDENTIALS_JSON:
            return json.loads(Settings.GOOGLE_CREDENTIALS_JSON)
        return None

# Instancia global de configuración
settings = Settings()

# Información del desarrollo (constantes)
DESARROLLO_INFO = {
    "nombre": "TORRE DE PIEDRA ZARÚ",
    "desarrollador": "Vialli Grupo Inmobiliario",
    "arquitectos": "Artigas Arquitectos",
    "anos_experiencia_arquitectos": "80+",
    "ubicacion": "Desarrollo Zarú, Querétaro, México",
    "telefono_ventas": settings.TELEFONO_VENTAS,
    "instagram": settings.INSTAGRAM,
    "website": settings.WEBSITE,

    "cercanias": {
        "Paseo Querétaro": "8 minutos",
        "Universidad Anáhuac": "10 minutos",
        "Blvd. Bernardo Quintana": "12 minutos",
        "Juriquilla Antea / La Loma centro deportivo": "15 minutos",
        "Centro Histórico": "20 minutos",
        "Aeropuerto Internacional de Querétaro": "25 minutos"
    },

    "amenidades_zaru": [
        "Lago artificial",
        "Pista de patinaje",
        "Áreas de descanso",
        "Andadores peatonales",
        "Vigilancia 24/7",
        "Explanadas verdes",
        "Arroyo artificial",
        "Juegos infantiles",
        "Parque canino",
        "Áreas arboladas",
        "Multicanchas deportivas",
        "Kioskos comerciales",
        "Cancha de pádel",
        "Anfiteatro",
        "Ciclovía"
    ],

    "amenidades_torre": [
        "Acceso controlado",
        "Alberca y chapoteadero",
        "Casa Club",
        "Gimnasio equipado",
        "Terraza",
        "Áreas verdes privadas",
        "Juegos infantiles",
        "Piñatero",
        "Asoleadero"
    ],

    "vialli_stats": {
        "anos_mercado": "14+",
        "familias_satisfechas": 2663,
        "proyectos_entregados": 20,
        "proyectos_construccion": 12,
        "nuevos_residenciales": 5
    }
}
