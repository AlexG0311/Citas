from flask import Blueprint, request, jsonify
from models import Horario, Profesional, Servicio
from db import db
from datetime import datetime, timedelta
from datetime import datetime

horario_bp = Blueprint('horario_bp', __name__)

# Obtener todos los horarios
@horario_bp.route('/horario', methods=['GET'])
def listar_horario():
    return jsonify([s.to_dict() for s in Horario.query.all()])


# Crear un nuevo horario para un profesional
@horario_bp.route('/horario', methods=['POST'])
def crear_horario():
    data = request.json
    fecha = data['fecha']
    hora_inicio = data['hora_inicio']
    hora_fin = data['hora_fin']
    profesionales_id = data['profesionales_id']
    modalidad_id = data['modalidad_id']
    sede_id = data['sede_id']

    # Convertir a objetos datetime
    dt_fecha = datetime.strptime(fecha, "%Y-%m-%d")
    dt_inicio = datetime.strptime(f"{fecha} {hora_inicio}", "%Y-%m-%d %H:%M")
    dt_fin = datetime.strptime(f"{fecha} {hora_fin}", "%Y-%m-%d %H:%M")

    if dt_inicio >= dt_fin:
        return jsonify({'error': 'La hora de inicio debe ser menor a la de fin'}), 400

    bloques_creados = []

    while dt_inicio + timedelta(minutes=30) <= dt_fin:
            hora_i = dt_inicio.time()
            hora_f = (dt_inicio + timedelta(minutes=30)).time()

            # Verificar si ya existe ese bloque para ese profesional
            existente = Horario.query.filter_by(
                fecha=fecha,
                hora_inicio=hora_i,
                profesionales_id=profesionales_id
            ).first()

            if existente:
                dt_inicio += timedelta(minutes=30)
                continue  # Saltar si ya existe ese bloque

            nuevo_horario = Horario(
                estado='libre',
                fecha=fecha,
                hora_inicio=hora_i,
                hora_fin=hora_f,
                profesionales_id=profesionales_id,
                modalidad_id=modalidad_id,
                sede_id=sede_id
            )

            db.session.add(nuevo_horario)
            bloques_creados.append(nuevo_horario.to_dict())

            dt_inicio += timedelta(minutes=30)

    db.session.commit()
    return jsonify({"mensaje": "Bloques creados", "bloques": bloques_creados}), 201


# Actualizar el estado de un horario
@horario_bp.route('/horario/<int:id>/estado', methods=['PUT'])
def actualizar_estado_horario(id):
    data = request.json
    horario = Horario.query.get(id)
    if not horario:
        return jsonify({"error": "Horario no encontrado"}), 404

    horario.estado = data['estado']  # libre, ocupado, en_espera
    db.session.commit()
    return jsonify(horario.to_dict())


# Filtrar horarios disponibles
@horario_bp.route('/horarios-disponibles', methods=['GET'])
def horarios_disponibles():
    servicio_id = request.args.get('servicio_id')
    modalidad_id = request.args.get('modalidad_id')
    fecha = request.args.get('fecha')  # Puede venir vacía
    profesional_id = request.args.get('profesional_id')

    if not servicio_id or not modalidad_id:
        return jsonify({"error": "Faltan parámetros obligatorios"}), 400

    servicio = Servicio.query.get(servicio_id)
    if not servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404

    profesionales_ids = [p.id for p in servicio.profesionales]

    if profesional_id:
        try:
            profesional_id = int(profesional_id)
        except ValueError:
            return jsonify({"error": "ID de profesional inválido"}), 400

        if profesional_id not in profesionales_ids:
            return jsonify({"error": "El profesional no está asociado a ese servicio"}), 400

        profesionales_ids = [profesional_id]

    query = Horario.query.filter(
        Horario.estado == 'libre',
        Horario.modalidad_id == modalidad_id,
        Horario.profesionales_id.in_(profesionales_ids)
    )

    if fecha:
        query = query.filter(Horario.fecha == fecha)

    horarios = query.all()
    return jsonify([h.to_dict() for h in horarios])
