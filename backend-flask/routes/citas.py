from flask import Blueprint, request, jsonify
from models import Cita, Cliente, Horario
from db import db
from datetime import datetime

citas_bp = Blueprint("citas", __name__)


@citas_bp.route("/citas", methods=["POST"])
def create_cita():
    data = request.json

    cita = Cita(
        fecha=datetime.strptime(data["fecha"], "%Y-%m-%d").date(),
        estado=data.get("estado", 1),
        hora_inicio=datetime.strptime(data["hora_inicio"], "%H:%M:%S").time(),
        hora_fin=datetime.strptime(data["hora_fin"], "%H:%M:%S").time(),
        clientes_id=data["Clientes_id"],
        profesionales_id=data["Profesionales_id"],
        servicios_id=data["Servicios_id"],
        sede_id=data["sede_id"]
    )

    db.session.add(cita)

    # ✅ Buscar el horario y actualizar su estado a 'ocupado'
    horario = Horario.query.filter_by(
        fecha=data["fecha"],
        hora_inicio=datetime.strptime(data["hora_inicio"], "%H:%M:%S").time(),
        hora_fin=datetime.strptime(data["hora_fin"], "%H:%M:%S").time(),
        profesionales_id=data["Profesionales_id"]
    ).first()

    if horario:
        horario.estado = "ocupado"

    db.session.commit()
    return jsonify(cita.to_dict()), 201



# Obtener todos los horarios
@citas_bp.route('/citas', methods=['GET'])
def citas_listar():
    return jsonify([s.to_dict() for s in Cita.query.all()])
