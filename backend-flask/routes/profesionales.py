from flask import Blueprint, request, jsonify
from models import  Profesional
from db import db
from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, set_access_cookies
from werkzeug.security import generate_password_hash

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
        contraseña=generate_password_hash(data['contraseña']),
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
def login_profesional():
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type debe ser application/json"}), 400
        
        data = request.get_json()

        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400
            
        correo =  data["correo"]
        contraseña = data["contraseña"]

        if not correo or not contraseña:
            return jsonify({"error": "Correo y contraseña son requeridos"}), 400

        profesional = Profesional.query.filter_by(correo=correo).first()
        
        if not profesional:
            return jsonify({"error": "Credenciales incorrectas"}), 401

        if not profesional.verificar_contrasena(contraseña):
            return jsonify({"error": "Credenciales incorrectas"}), 401

        access_token = create_access_token(identity=str(profesional.id))

# AQUI PUEDES TRAER LOS DATOS QUE QUIERAS DEL PROFESIONAL 

        response = make_response(jsonify({
            "mensaje": "Inicio de sesión exitoso",
            "profesional_id": profesional.id,
            "nombre": profesional.nombre
        }))
        set_access_cookies(response, access_token)

        return response, 200
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Error interno del servidor"}), 500
