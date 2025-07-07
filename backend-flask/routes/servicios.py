from flask import Blueprint, request, jsonify
from models import Servicio
from db import db

servicios_bp = Blueprint('servicios', __name__)

@servicios_bp.route('/servicios', methods=['GET'])
def listar_servicios():
    return jsonify([s.to_dict() for s in Servicio.query.all()])

@servicios_bp.route('/servicios/<int:id>', methods=['GET'])
def obtener_servicio(id):
    s = Servicio.query.get_or_404(id)
    return jsonify(s.to_dict())

@servicios_bp.route('/servicios', methods=['POST'])
def crear_servicio():
    data = request.json
    nuevo = Servicio(
        nombre=data['nombre'],
        duracion=data['duracion'],
        estado=data.get('estado', True),
        id_estado=data['id_estado']
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify(nuevo.to_dict()), 201

@servicios_bp.route('/servicios/<int:id>', methods=['PUT'])
def actualizar_servicio(id):
    s = Servicio.query.get_or_404(id)
    data = request.json
    s.nombre = data.get('nombre', s.nombre)
    s.duracion = data.get('duracion', s.duracion)
    s.estado = data.get('estado', s.estado)
    s.id_estado = data.get('id_estado', s.id_estado)
    db.session.commit()
    return jsonify(s.to_dict())

@servicios_bp.route('/servicios/<int:id>', methods=['DELETE'])
def eliminar_servicio(id):
    s = Servicio.query.get_or_404(id)
    db.session.delete(s)
    db.session.commit()
    return jsonify({"mensaje": "Servicio eliminado"}), 200
