from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies
from datetime import timedelta
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Cliente

login_cliente_bp = Blueprint('login_cliente', __name__)

@login_cliente_bp.route('/cliente/login', methods=['POST'])
def login_cliente():
    try:
        data = request.get_json()

        if not data or 'cedula' not in data:
            return jsonify({"error": "La cédula es requerida"}), 400

        cedula = data['cedula']

        cliente = Cliente.query.filter_by(cedula=cedula, estado=True).first()

        if cliente:
            # Crea un token válido por 1 día (ajústalo si quieres)
            access_token = create_access_token(identity=str(cliente.id))


            response = jsonify({
                "message": f"Bienvenido/a {cliente.nombre}",
                "cliente": {
                    "id": cliente.id,
                    "nombre": cliente.nombre,
                    "token": access_token,
                    "cedula": cliente.cedula 
                }
            })
            set_access_cookies(response, access_token)
            return response, 200

        else:
            return jsonify({"error": "Cédula no válida o usuario inactivo"}), 401

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "details": str(e)}), 500




