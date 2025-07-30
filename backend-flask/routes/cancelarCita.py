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
            horario.estado = "disponible"

        db.session.commit()
        return jsonify({"mensaje": "Cita cancelada correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
