import logging
logging.basicConfig(level=logging.DEBUG)

from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, set_access_cookies
from models import Admin


admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/login", methods=["POST"])
def login_admin():
    print(f"Request headers: {request.headers}")
    print(f"Request data: {request.get_data()}")
    print(f"Request JSON: {request.get_json()}")
    
    try:
        if not request.is_json:
            print("❌ Error: No es JSON")
            return jsonify({"error": "Content-Type debe ser application/json"}), 400
        
        data = request.get_json()
        print(f"✅ Datos recibidos: {data}")
        
        if not data:
            print("❌ Error: No hay datos")
            return jsonify({"error": "No se recibieron datos"}), 400
            
        email = data.get("email")
        contrasena = data.get("contrasena")
        print(f"✅ Email: {email}")
        print(f"✅ Contraseña: {contrasena}")

        if not email or not contrasena:
            print("❌ Error: Faltan email o contraseña")
            return jsonify({"error": "Email y contraseña son requeridos"}), 400

        # 🔍 DEBUGGING DE BASE DE DATOS
        print(f"🔍 Buscando admin con email: {email}")
        admin = Admin.query.filter_by(email=email).first()
        print(f"🔍 Admin encontrado: {admin}")
        
        if not admin:
            print("❌ Error: Admin no encontrado")
            return jsonify({"error": "Credenciales incorrectas"}), 401
            
        # 🔍 DEBUGGING DE CONTRASEÑA
        print(f"🔍 Verificando contraseña...")
        password_check = admin.verificar_contrasena(contrasena)
        print(f"🔍 Contraseña válida: {password_check}")
        
        if not password_check:
            print("❌ Error: Contraseña incorrecta")
            return jsonify({"error": "Credenciales incorrectas"}), 401

        print("✅ Creando token JWT...")
        access_token = create_access_token(identity=admin.id)
        print(f"✅ Token creado: {access_token[:50]}...")

        response = make_response(jsonify({
            "mensaje": "Inicio de sesión exitoso",
            "admin_id": admin.id
        }))
        set_access_cookies(response, access_token)
        print("✅ Login exitoso")

        return response, 200
        
    except Exception as e:
        print(f"💥 ERROR EXCEPCIÓN: {str(e)}")
        print(f"💥 TIPO ERROR: {type(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Error interno del servidor"}), 500


# ✅ Ruta protegida de prueba
from flask_jwt_extended import jwt_required, get_jwt_identity

@admin_bp.route("/admin", methods=["GET"])
@jwt_required()
def panel_admin():
    admin_id = get_jwt_identity()
    return jsonify({"mensaje": f"Bienvenido, admin con ID {admin_id}"}), 200


# ✅ Logout
from flask_jwt_extended import unset_jwt_cookies

@admin_bp.route("/admin/logout", methods=["POST"])
def logout_admin():
    response = make_response(jsonify({"mensaje": "Sesión cerrada"}))
    unset_jwt_cookies(response)
    return response



import logging
logging.basicConfig(level=logging.DEBUG)








