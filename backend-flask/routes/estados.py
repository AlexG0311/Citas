from flask import Blueprint, request, jsonify
from models import EstadoServicio
from db import db

estados_bp = Blueprint('estados', __name__)

@estados_bp.route('/estados', methods=['GET'])
def listar_estados():
    return jsonify([e.to_dict() for e in EstadoServicio.query.all()])

@estados_bp.route('/estados/<int:id>', methods=['GET'])
def obtener_estado(id):
    e = EstadoServicio.query.get_or_404(id)
    return jsonify(e.to_dict())

@estados_bp.route('/estados', methods=['POST'])
def crear_estado():
    data = request.json
    nuevo = EstadoServicio(nombre_estado=data['nombre_estado'])
    db.session.add(nuevo)
    db.session.commit()
    return jsonify(nuevo.to_dict()), 201

@estados_bp.route('/estados/<int:id>', methods=['PUT'])
def actualizar_estado(id):
    e = EstadoServicio.query.get_or_404(id)
    data = request.json
    e.nombre_estado = data.get('nombre_estado', e.nombre_estado)
    db.session.commit()
    return jsonify(e.to_dict())

@estados_bp.route('/estados/<int:id>', methods=['DELETE'])
def eliminar_estado(id):
    e = EstadoServicio.query.get_or_404(id)
    db.session.delete(e)
    db.session.commit()
    return jsonify({"mensaje": "Estado eliminado"}), 200
