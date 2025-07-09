from flask import Blueprint, request, jsonify
from models import  EstadoProfesional
from db import db

estado_bp = Blueprint('estado_bp', __name__)

@estado_bp.route('/estado_profesional', methods=['GET'])
def get_estados():
    estados = EstadoProfesional.query.all()
    return jsonify([{"id": e.id, "nombre": e.nombre} for e in estados])

@estado_bp.route('/estado_profesional', methods=['POST'])
def create_estado():
    data = request.json
    nuevo = EstadoProfesional(nombre=data['nombre'])
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({"message": "Estado creado correctamente", "id": nuevo.id}), 201
