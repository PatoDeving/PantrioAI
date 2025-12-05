"""
Endpoint: /api/disponibilidad
Obtención de disponibilidad para las próximas 2 semanas
"""
from http.server import BaseHTTPRequestHandler
import json
import logging
from datetime import datetime, timedelta
from lib.citas import SistemaCitas

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Obtiene disponibilidad de las próximas 2 semanas"""
        try:
            sistema_citas = SistemaCitas()
            disponibilidad = {}
            hoy = datetime.now().date()

            # Obtener disponibilidad para los próximos 14 días
            for i in range(14):
                fecha = hoy + timedelta(days=i)
                fecha_str = fecha.strftime('%Y-%m-%d')

                horarios_info = sistema_citas.obtener_horarios_disponibles(fecha_str)

                # Crear lista de horarios ocupados
                todos_horarios = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
                horarios_disponibles_set = {h['hora'] for h in horarios_info.get('horarios_disponibles', [])}
                horarios_ocupados = [h for h in todos_horarios if h not in horarios_disponibles_set]

                disponibilidad[fecha_str] = {
                    'fecha': fecha_str,
                    'dia_semana': horarios_info.get('dia_semana', ''),
                    'horarios_ocupados': horarios_ocupados,
                    'horarios_disponibles': list(horarios_disponibles_set)
                }

            # Responder
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'desde': hoy.strftime('%Y-%m-%d'),
                'hasta': (hoy + timedelta(days=13)).strftime('%Y-%m-%d'),
                'disponibilidad': disponibilidad
            }, ensure_ascii=False).encode('utf-8'))

        except Exception as e:
            logger.error(f"Error en /api/disponibilidad: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'error': f'Error obteniendo disponibilidad: {str(e)}'
            }).encode())

    def do_OPTIONS(self):
        """Manejo de preflight CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
