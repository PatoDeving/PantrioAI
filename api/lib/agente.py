"""
Agente Inmobiliario IA - Torre de Piedra Zarú
Adaptado para Vercel Serverless Functions con Google Gemini AI
"""
import json
from typing import List, Dict, Optional, Tuple
from datetime import datetime
from .config import settings, DESARROLLO_INFO
import logging
import google.generativeai as genai

logger = logging.getLogger(__name__)

class AgenteInmobiliario:
    """Agente conversacional para Torre de Piedra Zarú con Gemini AI"""

    def __init__(self):
        self.prototipos = self._cargar_prototipos()
        self.conversaciones = self._cargar_conversaciones()
        self.system_prompt = self._generar_system_prompt()
        self._initialize_gemini()

    def _initialize_gemini(self):
        """Inicializa Gemini AI"""
        try:
            if not settings.GEMINI_API_KEY:
                raise ValueError("GEMINI_API_KEY no configurada")

            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(model_name=settings.GEMINI_MODEL)
            logger.info(f"✓ Gemini AI inicializado: {settings.GEMINI_MODEL}")
        except Exception as e:
            logger.error(f"Error inicializando Gemini: {e}")
            raise

    def _cargar_prototipos(self) -> List[Dict]:
        """Carga los prototipos desde el archivo JSON"""
        try:
            with open(settings.PROTOTIPOS_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get('prototipos', [])
        except Exception as e:
            logger.error(f"Error cargando prototipos: {e}")
            return []

    def _cargar_conversaciones(self) -> Dict:
        """Carga el historial de conversaciones"""
        try:
            if settings.CONVERSACIONES_FILE.exists():
                with open(settings.CONVERSACIONES_FILE, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    return data.get('conversaciones', {})
            return {}
        except Exception as e:
            logger.error(f"Error cargando conversaciones: {e}")
            return {}

    def _guardar_conversaciones(self):
        """Guarda el historial de conversaciones en /tmp"""
        try:
            settings.CONVERSACIONES_FILE.parent.mkdir(parents=True, exist_ok=True)
            with open(settings.CONVERSACIONES_FILE, 'w', encoding='utf-8') as f:
                json.dump({'conversaciones': self.conversaciones}, f, ensure_ascii=False, indent=2)
        except Exception as e:
            logger.error(f"Error guardando conversaciones: {e}")

    def _generar_system_prompt(self) -> str:
        """Genera el prompt del sistema con toda la información del desarrollo"""

        # Formatear amenidades
        amenidades_text = "\n".join([f"- {a}" for a in DESARROLLO_INFO['amenidades_torre']])

        # Formatear cercanías
        cercanias_text = "\n".join([f"- {lugar}: {tiempo}" for lugar, tiempo in DESARROLLO_INFO['cercanias'].items()])

        # Formatear prototipos
        prototipos_text = ""
        for p in self.prototipos:
            prototipos_text += f"\n\n{p['nombre'].upper()} - {p['tipo']}\n"
            prototipos_text += f"{p.get('construccion_m2', p.get('construccion_m2_total', 'N/A'))} m²\n"
            prototipos_text += f"{p['recamaras']} recámaras\n"
            prototipos_text += f"{p['banos_completos']} baños completos"
            if p.get('medios_banos', 0) > 0:
                prototipos_text += f" + {p['medios_banos']} medio baño"
            prototipos_text += f"\nEstacionamiento: {p.get('estacionamiento', p.get('estacionamiento_pb_pm', 'N/A'))} cajones"

            # Descripción si existe
            if p.get('descripcion'):
                prototipos_text += f"\n{p['descripcion']}"

        prompt = f"""Eres un asistente digital profesional y amigable creado por Pantrio.dev. Tu función principal es brindar información detallada sobre el desarrollo inmobiliario "Torre de Piedra Zarú" de Vialli.

## SALUDO INICIAL:
Cuando un usuario te saluda por primera vez, preséntate así:
"¡Hola! Soy el asistente digital de Pantrio.dev, diseñado para brindarte información sobre Torre de Piedra Zarú de Vialli. ¿En qué puedo ayudarte hoy?"

## INFORMACIÓN DEL DESARROLLO:

### SOBRE VIALLI:
Vialli es una empresa inmobiliaria con más de {DESARROLLO_INFO['vialli_stats']['anos_mercado']} años de experiencia en Querétaro y el Bajío. Cuenta con {DESARROLLO_INFO['vialli_stats']['familias_satisfechas']} familias satisfechas, {DESARROLLO_INFO['vialli_stats']['proyectos_entregados']} proyectos entregados, {DESARROLLO_INFO['vialli_stats']['proyectos_construccion']} proyectos en construcción y {DESARROLLO_INFO['vialli_stats']['nuevos_residenciales']} residenciales nuevos.

### UBICACIÓN:
Torre de Piedra Zarú está ubicado en {DESARROLLO_INFO['ubicacion']}, con acceso rápido a:
{cercanias_text}

### AMENIDADES DE LA TORRE:
{amenidades_text}

### PROTOTIPOS DISPONIBLES:
{prototipos_text}

## CÓMO RESPONDER:

1. **Responde preguntas directamente**
   - Si preguntan por prototipos, describe los prototipos
   - Si preguntan por amenidades, lista las amenidades
   - Si preguntan por ubicación, describe la ubicación y cercanías
   - Si preguntan por Vialli, habla de la empresa

2. **Sobre precios y disponibilidad**
   - NO inventes información
   - Responde: "Para información actualizada sobre precios y disponibilidad, te recomiendo contactar directamente con nuestros asesores."

3. **Tono de comunicación**
   - Profesional pero amigable
   - Respuestas claras y concisas
   - Conversacional y natural
   - No uses lenguaje robótico

4. **IMPORTANTE - Sobre agendar citas**
   - El widget ya tiene un botón "Agendar Cita" visible
   - NO menciones el botón en tus respuestas
   - NO ofrezcas agendar citas proactivamente
   - Solo si el usuario EXPLÍCITAMENTE dice "quiero agendar", "agendar cita", entonces pide los datos

5. **Proceso de agendamiento** (solo si el usuario lo solicita)
   Pide todos los datos en un solo mensaje:
   "Para agendar tu cita necesito:
   - Nombre completo
   - Teléfono
   - Email
   - Día preferido
   - Hora (9:00-18:00)"

## CONTACTO:
Teléfono: {settings.TELEFONO_VENTAS}
Instagram: {settings.INSTAGRAM}
Website: {settings.WEBSITE}
"""
        return prompt

    def obtener_historial(self, user_id: str) -> List[Dict]:
        """Obtiene el historial de conversación de un usuario"""
        if user_id not in self.conversaciones:
            self.conversaciones[user_id] = []
        return self.conversaciones[user_id]

    def agregar_mensaje(self, user_id: str, rol: str, contenido: str):
        """Agrega un mensaje al historial"""
        if user_id not in self.conversaciones:
            self.conversaciones[user_id] = []

        self.conversaciones[user_id].append({
            "role": rol,
            "content": contenido,
            "timestamp": datetime.now().isoformat()
        })

        # Mantener solo los últimos 20 mensajes
        if len(self.conversaciones[user_id]) > 20:
            self.conversaciones[user_id] = self.conversaciones[user_id][-20:]

        self._guardar_conversaciones()

    def _analizar_intencion(self, mensaje: str, respuesta_agente: str) -> Tuple[bool, Optional[str]]:
        """
        Analiza si el usuario quiere agendar una cita y qué prototipo le interesa
        Returns: (requiere_agendar, prototipo_recomendado)
        """
        mensaje_lower = mensaje.lower()
        respuesta_lower = respuesta_agente.lower()

        # Señales de intención de agendar
        palabras_agendar = [
            'agendar', 'agendar cita', 'quiero agendar',
            'agendar visita', 'reservar', 'apartar'
        ]

        requiere_agendar = any(palabra in mensaje_lower for palabra in palabras_agendar)

        # Detectar prototipo de interés
        prototipo_recomendado = None
        for prototipo in self.prototipos:
            nombre_lower = prototipo['nombre'].lower()
            if nombre_lower in mensaje_lower or nombre_lower in respuesta_lower:
                prototipo_recomendado = prototipo['nombre']
                break

        return requiere_agendar, prototipo_recomendado

    def procesar_mensaje(self, user_id: str, mensaje: str) -> Dict:
        """
        Procesa un mensaje del usuario y genera una respuesta usando Gemini
        """
        try:
            # Agregar mensaje del usuario al historial
            self.agregar_mensaje(user_id, "user", mensaje)

            # Obtener historial
            historial = self.obtener_historial(user_id)

            # Convertir historial a formato Gemini
            history_for_gemini = [
                {"role": "user", "parts": [self.system_prompt]},
                {"role": "model", "parts": ["Entendido. Soy el asistente de Torre de Piedra Zarú y estoy listo para ayudar con información profesional."]}
            ]

            # Agregar historial real (excepto el último mensaje)
            for msg in historial[:-1]:
                role = "user" if msg["role"] == "user" else "model"
                history_for_gemini.append({
                    "role": role,
                    "parts": [msg["content"]]
                })

            chat = self.model.start_chat(history=history_for_gemini)

            # Enviar el último mensaje
            ultimo_mensaje = historial[-1]["content"]
            response = chat.send_message(ultimo_mensaje)
            respuesta_agente = response.text

            # Agregar respuesta al historial
            self.agregar_mensaje(user_id, "assistant", respuesta_agente)

            # Analizar intención
            requiere_agendar, prototipo_recomendado = self._analizar_intencion(
                mensaje, respuesta_agente
            )

            return {
                'respuesta': respuesta_agente,
                'requiere_agendar': requiere_agendar,
                'prototipo_recomendado': prototipo_recomendado,
                'user_id': user_id,
                'ai_provider': 'gemini'
            }

        except Exception as e:
            logger.error(f"Error procesando mensaje: {e}")
            return {
                'respuesta': "Disculpa, tuve un problema al procesar tu mensaje. ¿Podrías intentarlo de nuevo? Si el problema persiste, puedes contactarnos directamente al 442 161 2000.",
                'requiere_agendar': False,
                'prototipo_recomendado': None,
                'user_id': user_id,
                'error': str(e)
            }

    def limpiar_historial(self, user_id: str):
        """Limpia el historial de un usuario"""
        if user_id in self.conversaciones:
            del self.conversaciones[user_id]
            self._guardar_conversaciones()

    def obtener_prototipos(self) -> List[Dict]:
        """Retorna la lista de prototipos disponibles"""
        return self.prototipos

    def obtener_prototipo_por_id(self, prototipo_id: str) -> Optional[Dict]:
        """Obtiene un prototipo específico por su ID"""
        for p in self.prototipos:
            if p['id'] == prototipo_id.lower():
                return p
        return None
