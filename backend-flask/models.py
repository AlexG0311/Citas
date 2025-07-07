# models.py
from db import db
from datetime import datetime

class EstadoServicio(db.Model):
    __tablename__ = 'estado_servicio'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre_estado = db.Column(db.String(50), nullable=False)

    # Relación con Servicio (uno a muchos)
    servicios = db.relationship('Servicio', backref='estado_servicio', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre_estado": self.nombre_estado
        }


class Servicio(db.Model):
    __tablename__ = 'servicios'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(45), nullable=False)
    duracion = db.Column(db.Integer, nullable=False)
    estado = db.Column(db.Boolean, nullable=False, default=True)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)
    id_estado = db.Column(db.Integer, db.ForeignKey('estado_servicio.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "duracion": self.duracion,
            "estado": self.estado,
            "fecha": self.fecha.isoformat(),
            "id_estado": self.id_estado,
            "estado_servicio": self.estado_servicio.nombre_estado if self.estado_servicio else None
        }
