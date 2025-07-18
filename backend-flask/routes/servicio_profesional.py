from flask import Blueprint, request, jsonify
from db import db
from models import Profesional, Servicio

servicio_profesional_bp = Blueprint('servicio_profesional_bp', __name__)

# Asociar un servicio a un profesional
@servicio_profesional_bp.route('/asociar_servicio_profesional', methods=['POST'])
def asociar_servicio_profesional():
    data = request.get_json()
    profesional_id = data.get('profesional_id')
    servicio_id = data.get('servicio_id')

    profesional = Profesional.query.get(profesional_id)
    servicio = Servicio.query.get(servicio_id)

    if not profesional or not servicio:
        return jsonify({"error": "Profesional o servicio no encontrado"}), 404

    if servicio not in profesional.servicios:
        profesional.servicios.append(servicio)
        db.session.commit()

    return jsonify({"message": "Servicio asociado correctamente"}), 200

# Obtener servicios de un profesional
@servicio_profesional_bp.route('/profesionales/<int:id>/servicios', methods=['GET'])
def obtener_servicios_por_profesional(id):
    profesional = Profesional.query.get(id)
    if not profesional:
        return jsonify({"error": "Profesional no encontrado"}), 404

    return jsonify([s.to_dict() for s in profesional.servicios]), 200

# Obtener profesionales de un servicio
@servicio_profesional_bp.route('/servicios/<int:id>/profesionales', methods=['GET'])
def obtener_profesionales_por_servicio(id):
    servicio = Servicio.query.get(id)
    if not servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404

    return jsonify([p.to_dict() for p in servicio.profesionales]), 200
