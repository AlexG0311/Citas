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

@citas_bp.route('/citas/<int:id>', methods=['DELETE'])
def cancelar_cita(id):
    cita = Cita.query.get(id)
    if not cita:
        return jsonify({"error": "Cita no encontrada"}), 404

    try:
        # Aquí puedes eliminar la cita o cambiar su estado a cancelada
        cita.estado = "cancelada"
        
        # Si quieres liberar el horario asociado, búscalo y cambia estado
        horario = Horario.query.filter_by(
            fecha=cita.fecha.isoformat(),
            hora_inicio=cita.hora_inicio,
            hora_fin=cita.hora_fin,
            profesionales_id=cita.profesionales_id
        ).first()
        if horario:
            horario.estado = "libre"

        db.session.commit()
        return jsonify({"mensaje": "Cita cancelada correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
