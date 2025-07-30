from flask import Blueprint, request, jsonify
from models import Profesional, Cita
from db import db  # Asegúrate de tener esto correctamente importado
from flask_cors import cross_origin

# Crear el Blueprint
citas_profesional_bp = Blueprint("citas_profesional", __name__)

# Ruta para obtener las citas del profesional por cédula
@citas_profesional_bp.route("/citas/profesional", methods=["GET"])
@cross_origin()
def get_citas_por_profesional():
    cedula = request.args.get("cedula")

    if not cedula:
        return jsonify({"error": "Falta la cédula del profesional"}), 400

    profesional = Profesional.query.filter_by(cedula=cedula).first()

    if not profesional:
        return jsonify({"error": "Profesional no encontrado"}), 404

    citas = [cita.to_dict() for cita in profesional.citas]
    return jsonify(citas), 200
