from flask import Blueprint, request, jsonify
from models import Admin

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/admin/login", methods=["POST"])
def login_admin():
    data = request.json
    email = data.get("email")
    contrasena = data.get("contrasena")

    if not email or not contrasena:
        return jsonify({"error": "Email y contraseña son requeridos"}), 400

    admin = Admin.query.filter_by(email=email).first()

    if not admin or not admin.verificar_contrasena(contrasena):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    return jsonify({
        "mensaje": "Inicio de sesión exitoso",
        "admin": admin.to_dict()
    }), 200
