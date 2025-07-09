from flask import Blueprint, request, jsonify
from models import  Profesional
from db import db

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
