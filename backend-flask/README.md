# Citas

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
para no bloquear la solicitud de la db

# Requeriments 
asi se creo el archivo para instalar dependecias  ----> (pip freeze > requirements.txt)
pip install -r requirements.txt

