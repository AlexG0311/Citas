from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models import Cita
from db import db

profesional = Blueprint("profesional1", __name__)

@profesional.route("/profesional/citas/<int:cita_id>/completar", methods=["PUT"])
@jwt_required()
def completar_cita(cita_id):
    cita = Cita.query.get(cita_id)
    if not cita:
        return jsonify({"error": "Cita no encontrada"}), 404

    cita.estado = "completado"
    db.session.commit()

    return jsonify({"message": "Cita completada correctamente"}), 200
