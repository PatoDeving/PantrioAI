"""
Endpoint: /api/horarios
Obtención de horarios disponibles
"""
from http.server import BaseHTTPRequestHandler
import json
import logging
from urllib.parse import urlparse, parse_qs
from lib.citas import SistemaCitas

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Obtiene horarios disponibles para una fecha"""
        try:
            # Parsear query params
            parsed_url = urlparse(self.path)
            query_params = parse_qs(parsed_url.query)

            fecha = query_params.get('fecha', [None])[0]

            if not fecha:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'error': 'Parámetro "fecha" requerido (formato: YYYY-MM-DD)'
                }).encode())
                return

            # Obtener horarios
            sistema_citas = SistemaCitas()
            horarios = sistema_citas.obtener_horarios_disponibles(fecha)

            if 'error' in horarios:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(horarios).encode())
                return

            # Responder
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(horarios, ensure_ascii=False).encode('utf-8'))

        except Exception as e:
            logger.error(f"Error en /api/horarios: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': f'Error obteniendo horarios: {str(e)}'
            }).encode())

    def do_OPTIONS(self):
        """Manejo de preflight CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
