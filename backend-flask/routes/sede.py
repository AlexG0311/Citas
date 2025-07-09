from flask import Blueprint, request, jsonify
from models import Sede
from db import db

sede_bp = Blueprint('sede_bp', __name__)

@sede_bp.route('/sedes', methods=['GET'])
def get_sedes():
    sedes = Sede.query.all()
    return jsonify([{
        "id": s.id,
        "nombre": s.nombre,
        "direccion": s.direccion,
        "telefono": s.telefono,
        "ciudad": s.ciudad,
        "estado_id": s.estado_id,
        "estado": s.estado_sede.nombre if s.estado_sede else None  # ✅ CORREGIDO
    } for s in sedes])

@sede_bp.route('/sedes', methods=['POST'])
def create_sede():
    data = request.json
    nueva = Sede(
        nombre=data['nombre'],
        direccion=data['direccion'],
        telefono=data['telefono'],
        ciudad=data['ciudad'],
        estado_id=data['estado_id']  # ✅ CORRECTO
    )
    db.session.add(nueva)
    db.session.commit()
    return jsonify({"message": "Sede creada correctamente", "id": nueva.id}), 201
