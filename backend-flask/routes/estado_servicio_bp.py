# routes/estado_servicio.py

from flask import Blueprint, jsonify
from models import EstadoServicio

estado_servicio_bp = Blueprint('estado_servicio_bp', __name__)

@estado_servicio_bp.route('/estado-servicio', methods=['GET'])
def listar_estados_servicio():
    estados = EstadoServicio.query.all()
    return jsonify([e.to_dict() for e in estados])
