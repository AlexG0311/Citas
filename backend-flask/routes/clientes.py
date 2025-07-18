from flask import Blueprint, request, jsonify
from models import Cliente
from db import db

clientes_bp = Blueprint("clientes", __name__)

@clientes_bp.route("/clientes", methods=["GET"])
def get_clientes():
    clientes = Cliente.query.all()
    return jsonify([cliente.to_dict() for cliente in clientes])




@clientes_bp.route("/clientes/<int:id>", methods=["GET"])
def get_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    return jsonify(cliente.to_dict())

@clientes_bp.route("/clientes", methods=["POST"])
def create_cliente():
    data = request.json
    cliente = Cliente(
        nombre=data["nombre"],
        apellido=data["apellido"],
        correo=data["correo"],
        numero=data["numero"],
        edad=data["edad"],
        contraseña=data["contraseña"],
        estado=data.get("estado", True)
        
    )
    db.session.add(cliente)
    db.session.commit()
    return jsonify(cliente.to_dict()), 201

@clientes_bp.route("/clientes/<int:id>", methods=["PUT"])
def update_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    data = request.json

    cliente.nombre = data.get("nombre", cliente.nombre)
    cliente.apellido = data.get("apellido", cliente.apellido)
    cliente.correo = data.get("correo", cliente.correo)
    cliente.numero = data.get("numero", cliente.numero)
    cliente.edad = data.get("edad", cliente.edad)
    cliente.contraseña = data.get("contraseña", cliente.contraseña)
    cliente.estado = data.get("estado", cliente.estado)

    db.session.commit()
    return jsonify(cliente.to_dict())

@clientes_bp.route("/clientes/<int:id>", methods=["DELETE"])
def delete_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    db.session.delete(cliente)
    db.session.commit()
    return jsonify({"message": "Cliente eliminado"})


@clientes_bp.route('/clientes/cedula/<cedula>', methods=['GET'])
def obtener_cliente_por_cedula(cedula):
    cliente = Cliente.query.filter_by(cedula=cedula).first()
    if cliente:
        return jsonify(cliente.to_dict())
    return jsonify({'error': 'Cliente no encontrado'}), 404