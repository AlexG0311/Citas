from db import app, db
from routes.servicios import servicios_bp
from routes.estados import estados_bp
from routes.estado_profesional import estado_bp
from routes.profesionales import profesional_bp
from routes.horario  import horario_bp
from routes.modalidad import modalidad_bp
from routes.sede import sede_bp
from routes.estado_servicio_bp import estado_servicio_bp

app.register_blueprint(estado_servicio_bp)

from routes.clientes import clientes_bp
from routes.citas import citas_bp
from routes.servicio_profesional import servicio_profesional_bp

app.register_blueprint(servicio_profesional_bp)



from sqlalchemy import text
from flask_cors import CORS
from sqlalchemy.exc import OperationalError


CORS(app)   
# Registrar rutas
app.register_blueprint(servicios_bp)
app.register_blueprint(estados_bp)
app.register_blueprint(horario_bp)
app.register_blueprint(modalidad_bp)
app.register_blueprint(estado_bp)
app.register_blueprint(sede_bp)
app.register_blueprint(profesional_bp)

app.register_blueprint(clientes_bp)
app.register_blueprint(citas_bp)


with app.app_context():
    try:
        # Verificar conexión con text()
        db.session.execute(text('SELECT 1'))
        print("✅ Conexión a la base de datos establecida correctamente.")

        # Crear tablas si no existen
        db.create_all()
    except OperationalError as e:
        print("❌ Error al conectar a la base de datos:")
        print(e)

if __name__ == "__main__":
    app.run(debug=True)
