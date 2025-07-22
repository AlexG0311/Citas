from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint, jsonify
from models import Cliente

cliente_perfil_bp = Blueprint('cliente_perfil_bp', __name__)

@cliente_perfil_bp.route("/cliente/perfil", methods=["GET"])
@jwt_required()
def cliente_perfil():
    cliente_id = get_jwt_identity()
    cliente = Cliente.query.get(cliente_id)
    
    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    return jsonify({
        "id": cliente.id,
        "nombre": cliente.nombre,
        "cedula": cliente.cedula
        
    }), 200
