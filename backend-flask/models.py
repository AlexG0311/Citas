from db import db
from datetime import datetime, time, date


class EstadoServicio(db.Model):
    __tablename__ = 'estado_servicio'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre_estado = db.Column(db.String(50), nullable=False)

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

    citas = db.relationship('Cita', backref='servicio', lazy=True)

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


class EstadoProfesional(db.Model):
    __tablename__ = 'estado_profesional'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)

    profesionales = db.relationship('Profesional', backref='estado_profesional', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre
        }


class Sede(db.Model):
    __tablename__ = 'sede'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(45), nullable=False)
    direccion = db.Column(db.String(45), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    ciudad = db.Column(db.String(45), nullable=False)
    estado_id = db.Column(db.Integer, db.ForeignKey('estado_sede.id'), nullable=False)

    profesionales = db.relationship('Profesional', backref='sede', lazy=True)
    citas = db.relationship('Cita', backref='sede', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "direccion": self.direccion,
            "telefono": self.telefono,
            "ciudad": self.ciudad,
            "estado": self.estado_sede.nombre if self.estado_sede else None
        }


class Profesional(db.Model):
    __tablename__ = 'profesionales'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(45), nullable=False)
    apellido = db.Column(db.String(45), nullable=False)
    correo = db.Column(db.String(45), nullable=False, unique=True)
    cedula = db.Column(db.String(45), nullable=False, unique=True)
    telefono = db.Column(db.String(20), nullable=False)
    especialidad = db.Column(db.String(45), nullable=False)
    contraseña = db.Column(db.String(45), nullable=False)
    estado = db.Column(db.Integer, db.ForeignKey('estado_profesional.id'), nullable=False)
    sede_id = db.Column(db.Integer, db.ForeignKey('sede.id'), nullable=False)

    citas = db.relationship('Cita', backref='profesional', lazy=True, passive_deletes=True)


    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "correo": self.correo,
            "cedula": self.cedula,
            "telefono": self.telefono,
            "especialidad": self.especialidad,
            "contraseña": self.contraseña,
            "estado": self.estado,
            "estado_profesional": self.estado_profesional.nombre if self.estado_profesional else None,
            "sede_id": self.sede_id,
            "sede": self.sede.nombre if self.sede else None
        }


# ✅ NUEVO MODELO: Cliente
class Cliente(db.Model):
    __tablename__ = 'clientes'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(45), nullable=False)
    numero = db.Column(db.BigInteger, nullable=False)
    correo = db.Column(db.String(45), nullable=False, unique=True)
    apellido = db.Column(db.String(45), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    contraseña = db.Column(db.String(45), nullable=False)
    estado = db.Column(db.Boolean, nullable=False, default=True)

    citas = db.relationship('Cita', backref='cliente', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "correo": self.correo,
            "numero": self.numero,
            "edad": self.edad,
            "estado": self.estado
        }


# ✅ NUEVO MODELO: Cita
class Cita(db.Model):
    __tablename__ = 'cita'

    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, nullable=False)
    estado = db.Column(db.String(20), nullable=False)  # O puede ser tinyint si usas estado numerado
    hora_inicio = db.Column(db.Time, nullable=False)
    hora_fin = db.Column(db.Time, nullable=False)

    clientes_id = db.Column(db.Integer, db.ForeignKey('clientes.id'), nullable=False)
    profesionales_id = db.Column(db.Integer, db.ForeignKey('profesionales.id', ondelete='CASCADE'), nullable=False)
    servicios_id = db.Column(db.Integer, db.ForeignKey('servicios.id'), nullable=False)
    sede_id = db.Column(db.Integer, db.ForeignKey('sede.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "fecha": self.fecha.isoformat(),
            "estado": self.estado,
            "hora_inicio": self.hora_inicio.strftime('%H:%M:%S'),
            "hora_fin": self.hora_fin.strftime('%H:%M:%S'),
              # Aquí solo retornamos los campos simples
            "cliente": f"{self.cliente.nombre} {self.cliente.apellido}" if self.cliente else None,
            "profesional": self.profesional.nombre if self.profesional else None,
            "servicio": self.servicio.nombre if self.servicio else None,
            "sede": self.sede.nombre if self.sede else None
        }


class EstadoSede(db.Model):
    __tablename__ = 'estado_sede'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)

    sedes = db.relationship('Sede', backref='estado_sede', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre
        }
