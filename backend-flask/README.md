# Estructura de paquetes 

app/
├── models/
│   └── models.py
├── routes/
│   └── profesionales.py
│   └── sede.py
│   └── estado_profesional.py
├── __init__.py
└── app.py


# Configuración paso a paso
# 1. Crear una nueva carpeta de proyecto
Abrir código VS.
Ir a Archivo > Abrir carpeta y crea una nueva carpeta (por ejemplo, CitasVSC) o seleccione uno existente.
Abra la terminal en VS Code (Terminal > Nueva Terminal).
# 2. Configurar un entorno virtual
En la terminal, crea un entorno virtual:
# python -m venv .venv
Activalo:
# Windows: .venv\Scripts\activate
# macOS/Linux: fuente .venv/bin/activate
Deberías verlo (.venv) en el indicador del terminal, indicando que el entorno virtual está activo.
# 3. Instalar Flask
Con el entorno virtual activo, instale Flask:
# pip install flask


# Paquetes para la db
pip install flask flask-sqlalchemy pymysql


# CORS 
para no bloquear la solicitud de la api

# Requeriments 
asi se creo el archivo para instalar dependecias  ----> (pip freeze > requirements.txt)
Solo ejecutar ------->   pip install -r requirements.txt


PASOS 

FALTANTES 


1.1 GESTION DE CITAS
1.2 MOSTRAR CITAS EN LA TABLA
1.3 MOSTRAR EL MODAL CON LOS DATOS DE LA CITA 
1.4 HACER FILTRO DE PROFESIONALES CON EL NUMERO DE CEDULA  
1.5 HACER UN FILTRO DE PROFESIONALES CON EL NUMERO DE CEDULA
1.6 TRAER LOS SERVICIOS DISPONIBLES 
1.7 TRAER LAS SEDES DISPONIBLES 