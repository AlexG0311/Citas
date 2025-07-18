# routes/modalidad.py
from flask import Blueprint, request, jsonify
from models import Modalidad
from db import db

modalidad_bp = Blueprint('modalidad_bp', __name__)

# Obtener todas las modalidades
@modalidad_bp.route('/modalidad', methods=['GET'])
def get_modalidades():
    modalidades = Modalidad.query.all()
    return jsonify([m.to_dict() for m in modalidades])

# Obtener una modalidad por ID
@modalidad_bp.route('/modalidad/<int:id>', methods=['GET'])
def get_modalidad(id):
    modalidad = Modalidad.query.get_or_404(id)
    return jsonify(modalidad.to_dict())

# Crear una nueva modalidad
@modalidad_bp.route('/modalidad', methods=['POST'])
def create_modalidad():
    data = request.get_json()
    nueva_modalidad = Modalidad(
        nombre=data['nombre'],
        estado_id=data['estado_id']
    )
    db.session.add(nueva_modalidad)
    db.session.commit()
    return jsonify(nueva_modalidad.to_dict()), 201

# Actualizar una modalidad
@modalidad_bp.route('/modalidad/<int:id>', methods=['PUT'])
def update_modalidad(id):
    modalidad = Modalidad.query.get_or_404(id)
    data = request.get_json()
    modalidad.nombre = data.get('nombre', modalidad.nombre)
    modalidad.estado_id = data.get('estado_id', modalidad.estado_id)
    db.session.commit()
    return jsonify(modalidad.to_dict())

# Eliminar una modalidad
@modalidad_bp.route('/modalidad/<int:id>', methods=['DELETE'])
def delete_modalidad(id):
    modalidad = Modalidad.query.get_or_404(id)
    db.session.delete(modalidad)
    db.session.commit()
    return jsonify({'mensaje': 'Modalidad eliminada'})
