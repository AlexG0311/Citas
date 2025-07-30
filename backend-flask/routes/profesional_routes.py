from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Cita
from db import db  

citas_profesional_bp = Blueprint('citas_profesional', __name__)

@citas_profesional_bp.route('/citas/pendientes', methods=['GET'])
@jwt_required()
def obtener_citas_pendientes():
    profesional_id = get_jwt_identity()

    citas = Cita.query.filter_by(profesionales_id=profesional_id, estado='pendiente').all()
    
    return jsonify([cita.to_dict() for cita in citas]), 200
