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



@citas_bp.route('/citas/buscar', methods=['GET'])
def buscar_citas_por_cedula():
    cedula = request.args.get('cedula')

    if not cedula:
        return jsonify({"error": "Cédula no proporcionada"}), 400

    cliente = Cliente.query.filter_by(cedula=cedula).first()

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    citas = Cita.query.filter_by(clientes_id=cliente.id).all()

    return jsonify([cita.to_dict() for cita in citas]), 200

