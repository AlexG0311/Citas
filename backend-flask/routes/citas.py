from flask import Blueprint, request, jsonify
from models import Cita
from db import db
from datetime import datetime, time

citas_bp = Blueprint("citas", __name__)

@citas_bp.route("/citas", methods=["GET"])
def get_citas():
    citas = Cita.query.all()
    return jsonify([cita.to_dict() for cita in citas])

@citas_bp.route("/citas/<int:id>", methods=["GET"])
def get_cita(id):
    cita = Cita.query.get_or_404(id)
    return jsonify(cita.to_dict())

@citas_bp.route("/citas", methods=["POST"])
def create_cita():
    data = request.json
    cita = Cita(
        fecha=datetime.strptime(data["fecha"], "%Y-%m-%d").date(),
        estado=data["estado"],
        hora_inicio=datetime.strptime(data["hora_inicio"], "%H:%M").time(),
        hora_fin=datetime.strptime(data["hora_fin"], "%H:%M").time(),
        clientes_id=data["clientes_id"],
        profesionales_id=data["profesionales_id"],
        servicios_id=data["servicios_id"],
        sede_id=data["sede_id"]
    )
    db.session.add(cita)
    db.session.commit()
    return jsonify(cita.to_dict()), 201

@citas_bp.route("/citas/<int:id>", methods=["PUT"])
def update_cita(id):
    cita = Cita.query.get_or_404(id)
    data = request.json

    if "fecha" in data:
        cita.fecha = datetime.strptime(data["fecha"], "%Y-%m-%d").date()
    if "estado" in data:
        cita.estado = data["estado"]
    if "hora_inicio" in data:
        cita.hora_inicio = datetime.strptime(data["hora_inicio"], "%H:%M").time()
    if "hora_fin" in data:
        cita.hora_fin = datetime.strptime(data["hora_fin"], "%H:%M").time()
    if "clientes_id" in data:
        cita.clientes_id = data["clientes_id"]
    if "profesionales_id" in data:
        cita.profesionales_id = data["profesionales_id"]
    if "servicios_id" in data:
        cita.servicios_id = data["servicios_id"]
    if "sede_id" in data:
        cita.sede_id = data["sede_id"]

    db.session.commit()
    return jsonify(cita.to_dict())

@citas_bp.route("/citas/<int:id>", methods=["DELETE"])
def delete_cita(id):
    cita = Cita.query.get_or_404(id)
    db.session.delete(cita)
    db.session.commit()
    return jsonify({"message": "Cita eliminada"})
