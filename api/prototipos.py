"""
Endpoint: /api/prototipos
Obtención de información de prototipos
"""
from http.server import BaseHTTPRequestHandler
import json
import logging
from lib.agente import AgenteInmobiliario

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Obtiene lista de prototipos disponibles"""
        try:
            # Obtener prototipos
            agente = AgenteInmobiliario()
            prototipos = agente.obtener_prototipos()

            # Responder
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'total': len(prototipos),
                'prototipos': prototipos
            }, ensure_ascii=False).encode('utf-8'))

        except Exception as e:
            logger.error(f"Error en /api/prototipos: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': f'Error obteniendo prototipos: {str(e)}'
            }).encode())

    def do_OPTIONS(self):
        """Manejo de preflight CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
