from models import Admin
from db import db
from App import app  
from werkzeug.security import generate_password_hash

with app.app_context():
    nuevo_admin = Admin(
        nombre='Admin Principal',
        email='admin@gmail.com',
        contrasena_hash=generate_password_hash('admin123')  
        
    )
    db.session.add(nuevo_admin)
    db.session.commit()
    print("✅ Admin creado con éxito.")
