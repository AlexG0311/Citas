from flask import Blueprint, request, jsonify
from models import  Profesional
from db import db
from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, set_access_cookies

profesional_bp = Blueprint('profesional_bp', __name__)

@profesional_bp.route('/profesionales', methods=['GET'])
def listar_profesionales():
    return jsonify([s.to_dict() for s in Profesional.query.all()])

@profesional_bp.route('/profesionales', methods=['POST'])
def create_profesional():
    data = request.json
    nuevo = Profesional(
        nombre=data['nombre'],
        apellido=data['apellido'],
        correo=data['correo'],
        cedula=data['cedula'],
        telefono=data['telefono'],
        especialidad=data['especialidad'],
        contraseña=data['contraseña'],
        estado=data['estado'],
        sede_id=data['sede_id']
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({"message": "Profesional creado correctamente", "id": nuevo.id}), 201

@profesional_bp.route('/profesionales/<int:id>', methods=['PUT'])
def actualizar_profesional(id):
    data = request.json
    profesional = Profesional.query.get_or_404(id)

    profesional.nombre = data.get('nombre', profesional.nombre)
    profesional.apellido = data.get('apellido', profesional.apellido)
    profesional.correo = data.get('correo', profesional.correo)
    profesional.cedula = data.get('cedula', profesional.correo)
    profesional.telefono = data.get('telefono', profesional.telefono)
    profesional.especialidad = data.get('especialidad', profesional.especialidad)
    profesional.contraseña = data.get('contraseña', profesional.contraseña)
    profesional.estado = data.get('estado', profesional.estado)
    profesional.sede_id = data.get('sede_id', profesional.sede_id)

    db.session.commit()
    return jsonify({"message": "Profesional actualizado correctamente"})


@profesional_bp.route('/profesionales/<int:id>', methods=['DELETE'])
def eliminar_profesional(id):
    profesional = Profesional.query.get_or_404(id)
    db.session.delete(profesional)
    db.session.commit()
    return jsonify({"message": "Profesional eliminado correctamente"})



@profesional_bp.route("/login/profesional", methods=["POST"])
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
        profesional = Profesional.query.filter_by(email=email).first()
        print(f"🔍 Admin encontrado: {profesional}")
        
        if not profesional:
            print("❌ Error: Admin no encontrado")
            return jsonify({"error": "Credenciales incorrectas"}), 401
            
        # 🔍 DEBUGGING DE CONTRASEÑA
        print(f"🔍 Verificando contraseña...")
        password_check = profesional.verificar_contrasena(contrasena)
        print(f"🔍 Contraseña válida: {password_check}")
        
        if not password_check:
            print("❌ Error: Contraseña incorrecta")
            return jsonify({"error": "Credenciales incorrectas"}), 401

        print("✅ Creando token JWT...")
        access_token = create_access_token(identity=profesional.id)
        print(f"✅ Token creado: {access_token[:50]}...")

        response = make_response(jsonify({
            "mensaje": "Inicio de sesión exitoso",
            "profesional_id": profesional.id
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