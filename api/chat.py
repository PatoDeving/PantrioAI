"""
Endpoint: /api/chat
Procesamiento de mensajes con el agente IA
"""
from http.server import BaseHTTPRequestHandler
import json
import logging
from datetime import datetime
from lib.agente import AgenteInmobiliario

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Procesa mensajes del chat"""
        try:
            # Leer body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))

            # Validar datos
            mensaje = data.get('mensaje', '').strip()
            user_id = data.get('user_id', 'anonymous')

            if not mensaje:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'error': 'El mensaje no puede estar vacío'
                }).encode())
                return

            # Procesar mensaje con el agente
            agente = AgenteInmobiliario()
            resultado = agente.procesar_mensaje(user_id, mensaje)

            # Responder
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'user_id': resultado['user_id'],
                'respuesta': resultado['respuesta'],
                'requiere_agendar': resultado['requiere_agendar'],
                'prototipo_recomendado': resultado.get('prototipo_recomendado'),
                'ai_provider': resultado.get('ai_provider'),
                'timestamp': datetime.now().isoformat()
            }, ensure_ascii=False).encode('utf-8'))

        except json.JSONDecodeError:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': 'JSON inválido'
            }).encode())

        except Exception as e:
            logger.error(f"Error en /api/chat: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': f'Error procesando mensaje: {str(e)}'
            }).encode())

    def do_OPTIONS(self):
        """Manejo de preflight CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
