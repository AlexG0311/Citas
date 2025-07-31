# db.py
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import os

app = Flask(__name__)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/citasdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Instancia de SQLAlchemy
db = SQLAlchemy(app)
