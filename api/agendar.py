"""
Endpoint: /api/agendar
Creación de citas
"""
from http.server import BaseHTTPRequestHandler
import json
import logging
from lib.citas import SistemaCitas

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Crea una nueva cita"""
        try:
            # Leer body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))

            # Validar datos requeridos
            campos_requeridos = ['user_id', 'nombre', 'telefono', 'email', 'fecha', 'hora']
            for campo in campos_requeridos:
                if campo not in data or not data[campo]:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'error': f'Campo requerido faltante: {campo}'
                    }).encode())
                    return

            # Crear cita
            sistema_citas = SistemaCitas()
            resultado = sistema_citas.crear_cita(data)

            if resultado['exito']:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'exito': True,
                    'mensaje': resultado['mensaje'],
                    'cita': resultado['cita']
                }, ensure_ascii=False).encode('utf-8'))
            else:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'exito': False,
                    'error': resultado.get('error', 'Error al crear la cita')
                }).encode())

        except json.JSONDecodeError:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': 'JSON inválido'
            }).encode())

        except Exception as e:
            logger.error(f"Error en /api/agendar: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': f'Error al agendar cita: {str(e)}'
            }).encode())

    def do_OPTIONS(self):
        """Manejo de preflight CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
