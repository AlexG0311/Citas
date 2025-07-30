from db import app, db
from flask_cors import CORS
from routes.servicios import servicios_bp
from routes.estados import estados_bp
from routes.estado_profesional import estado_bp
from routes.horario import horario_bp
from routes.modalidad import modalidad_bp
from routes.login_admin import admin_bp
from routes.sede import sede_bp
from routes.estado_servicio_bp import estado_servicio_bp
from routes.login_cliente import login_cliente_bp
from routes.cliente_perfil import cliente_perfil_bp;
from routes.clientes import clientes_bp
from routes.citas import citas_bp
from routes.login_profesional import profesional_bp
from routes.profesional_routes import citas_profesional_bp
from routes.profesional import profesional




from routes.servicio_profesional import servicio_profesional_bp
from flask_jwt_extended import JWTManager
from sqlalchemy import text
from datetime import timedelta
from flask_cors import CORS

from sqlalchemy.exc import OperationalError

# ✅ Configurar CORS correctamente (una sola vez)
CORS(app, 
     origins=['http://localhost:5173'], 
     supports_credentials=True)

# ✅ Configurar JWT con cookies
app.config['JWT_SECRET_KEY'] = 'tu-clave-secreta-muy-segura'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_SECURE'] = False  
app.config['JWT_COOKIE_HTTPONLY'] = True
app.config['JWT_COOKIE_SAMESITE'] = 'Lax'  
app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # Solo para desarrollo


# ✅ Único decorador JWT
jwt = JWTManager(app)

@jwt.user_identity_loader
def user_identity_lookup(admin_id):
    return str(admin_id)


# ✅ Registrar rutas

app.register_blueprint(servicios_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(estados_bp)
app.register_blueprint(horario_bp)
app.register_blueprint(modalidad_bp)
app.register_blueprint(estado_bp)
app.register_blueprint(sede_bp)
app.register_blueprint(estado_servicio_bp)
app.register_blueprint(servicio_profesional_bp)
app.register_blueprint(clientes_bp)
app.register_blueprint(citas_bp)

# RUTAS CLIENTE

app.register_blueprint(login_cliente_bp)
app.register_blueprint(cliente_perfil_bp)

# ✅ RUTAS DEL DOCtor
app.register_blueprint(profesional_bp)
app.register_blueprint(citas_profesional_bp, url_prefix="/profesional")
app.register_blueprint(profesional)






# ✅ Verificar conexión y crear tablas
with app.app_context():
    try:
        db.session.execute(text('SELECT 1'))
        print("✅ Conexión a la base de datos establecida correctamente.")
        db.create_all()
    except OperationalError as e:
        print("❌ Error al conectar a la base de datos:")
        print(e)


if __name__ == "__main__":
    app.run(debug=True)

