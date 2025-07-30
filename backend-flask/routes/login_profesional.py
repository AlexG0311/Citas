import logging
from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, set_access_cookies
from models import Profesional

# Configuración de logging
logging.basicConfig(level=logging.DEBUG)

# Definir Blueprint
profesional_bp = Blueprint("profesional", __name__)

@profesional_bp.route("/login/profesional", methods=["POST"])
def login_profesional():
    print(f"Request headers: {request.headers}")
    print(f"Request JSON: {request.get_json()}")

    try:
        # Validar si el cuerpo de la petición es JSON
        if not request.is_json:
            return jsonify({"error": "Content-Type debe ser application/json"}), 400

        data = request.get_json()
        email = data.get("email")
        contrasena = data.get("contrasena")

        if not email or not contrasena:
            return jsonify({"error": "Email y contraseña requeridos"}), 400

        # Buscar al profesional por correo
        profesional = Profesional.query.filter_by(correo=email).first()
        if not profesional:
            return jsonify({"error": "Credenciales incorrectas"}), 401

        # Verificar contraseña
        if not profesional.verificar_contrasena(contrasena):
            return jsonify({"error": "Credenciales incorrectas"}), 401

        # Crear token de acceso
        access_token = create_access_token(identity=profesional.id)

        # Respuesta con información del profesional
        response = make_response(jsonify({
            "mensaje": "Inicio de sesión exitoso",
            "profesional": {
                "id": profesional.id,
                "nombre": profesional.nombre,
                "apellido": profesional.apellido,
                "correo": profesional.correo
            }
        }))

        # Adjuntar token como cookie segura
        set_access_cookies(response, access_token)
        return response, 200

    except Exception as e:
        logging.error("Error en login_profesional", exc_info=True)
        return jsonify({"error": "Error interno del servidor"}), 500
