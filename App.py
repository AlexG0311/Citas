from flask import Flask, render_template, jsonify, request, redirect, url_for, session, flash
import mysql.connector
from datetime import datetime, timedelta

app = Flask(__name__, template_folder='templates')
app.secret_key = 'un_secreto'

def get_db_connection():
    return mysql.connector.connect(
        host='b8gcblrapupqzdgkru1t-mysql.services.clever-cloud.com', 
        user='uh5nyjlpklikywna',
        password='ZUdUUxf6kesk5w8OW3JV',
        database='b8gcblrapupqzdgkru1t'
    )

# Login y logout
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        numero = request.form['numero']
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clientes WHERE numero = %s AND estado=1", (numero,))
        cliente = cursor.fetchone()
        cursor.close()
        conn.close()

        if cliente:
            session['cliente_id'] = cliente['id']
            session['cliente_nombre'] = cliente['nombre']
            flash(f"Bienvenido/a, {cliente['nombre']}", 'success')
            return redirect(url_for('cliente_inicio'))
        else:
            flash('Número de identificación no encontrado', 'danger')
            return redirect(url_for('login'))

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()
    flash('Sesión cerrada', 'info')
    return redirect(url_for('login'))

@app.route('/ClienteInicio')
def cliente_inicio():
    if 'cliente_id' not in session:
        return redirect(url_for('login'))
    nombre_usuario = session.get('cliente_nombre')
    return render_template('ClienteInicio.html', nombre=nombre_usuario)

# Página agendar cita
@app.route('/agendar_cita')
def agendar_cita():
    if 'cliente_id' not in session:
        return redirect(url_for('login'))

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, nombre FROM servicios WHERE estado=1")
    servicios = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('agendar_cita.html', servicios=servicios)

@app.route('/get_modalidades')
def get_modalidades():
    modalidades = [
        {'id': 'presencial', 'nombre': 'Presencial'},
        {'id': 'virtual', 'nombre': 'Teleconsulta'}
    ]
    return jsonify(modalidades)

@app.route('/get_doctores')
def get_doctores():
    servicio_id = request.args.get('servicio_id')
    modalidad = request.args.get('modalidad')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT p.id AS cita_id, p.nombre AS doctor, p.especialidad,
               h.dia_semana AS dia, h.hora_inicio AS hora,
               s.id AS sede_id, s.nombre AS sede
        FROM profesionales p
        JOIN horario h ON p.id = h.profesionales_id
        JOIN sede s ON p.sede_id = s.id
        JOIN servicios_has_profesionales sp ON p.id = sp.profesionales_id
        WHERE sp.servicios_id = %s AND p.estado=1 AND h.estado=1
    """, (servicio_id,))
    doctores = cursor.fetchall()
    cursor.close()
    conn.close()

    for d in doctores:
        if isinstance(d.get('hora'), (str, type(None))):
            continue
        d['hora'] = str(d['hora'])

    return jsonify(doctores)

@app.route('/get_horarios_disponibles')
def get_horarios_disponibles():
    profesional_id = request.args.get('profesional_id')
    servicio_id = request.args.get('servicio_id')
    fecha = request.args.get('fecha')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT duracion FROM servicios WHERE id=%s", (servicio_id,))
    servicio = cursor.fetchone()
    if not servicio:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Servicio no encontrado'}), 400
    duracion = servicio['duracion']

    cursor.execute("""
        SELECT hora_inicio, hora_fin
        FROM horario
        WHERE profesionales_id=%s AND estado=1
    """, (profesional_id,))
    horario = cursor.fetchone()
    if not horario:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Horario no encontrado'}), 400

    todas_franjas = generar_franjas(horario['hora_inicio'], horario['hora_fin'], duracion)

    cursor.execute("""
        SELECT hora_inicio
        FROM cita
        WHERE profesionales_id=%s AND fecha=%s AND estado=1
    """, (profesional_id, fecha))
    ocupadas = [row['hora_inicio'] for row in cursor.fetchall()]

    libres = [f for f in todas_franjas if f['hora_inicio'] not in ocupadas]

    cursor.close()
    conn.close()
    return jsonify(libres)

@app.route('/get_doctores_con_horarios')
def get_doctores_con_horarios():
    servicio_id = request.args.get('servicio_id')
    modalidad = request.args.get('modalidad')
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # duración del servicio
    cursor.execute("SELECT duracion FROM servicios WHERE id=%s", (servicio_id,))
    servicio = cursor.fetchone()
    if not servicio:
        cursor.close()
        conn.close()
        return jsonify([])

    duracion = servicio['duracion']

    # Traer doctores + sede + horario base
    cursor.execute("""
        SELECT p.id as profesional_id, p.nombre as doctor, p.apellido, p.especialidad,
               h.dia_semana, h.hora_inicio as hora_ini, h.hora_fin as hora_fin,
               s.id as sede_id, s.nombre as sede
        FROM Profesionales p
        JOIN Servicios_has_Profesionales sp ON p.id = sp.Profesionales_id
        JOIN Horario h ON p.id = h.Profesionales_id
        JOIN Sede s ON p.Sede_id = s.id
        WHERE sp.Servicios_id=%s AND p.estado=1 AND h.estado=1
    """, (servicio_id,))
    doctores = cursor.fetchall()

    resultado = []

    for doc in doctores:
        # calcular próxima fecha
        fecha = obtener_proxima_fecha(doc['dia_semana'])
        franjas = generar_franjas(doc['hora_ini'], doc['hora_fin'], duracion)

        # filtrar ocupadas
        cursor.execute("""
            SELECT hora_inicio FROM cita
            WHERE profesionales_id=%s AND fecha=%s AND estado=1
        """, (doc['profesional_id'], fecha))
        ocupadas = [row['hora_inicio'] for row in cursor.fetchall()]

        libres = [f for f in franjas if f['hora_inicio'] not in ocupadas]

        for franja in libres:
            resultado.append({
                'doctor': f"{doc['doctor']} {doc['apellido']}",
                'especialidad': doc['especialidad'],
                'dia': doc['dia_semana'],
                'fecha': fecha,
                'hora_inicio': franja['hora_inicio'],
                'hora_fin': franja['hora_fin'],
                'sede': doc['sede'],
                'sede_id': doc['sede_id'],
                'profesional_id': doc['profesional_id'],
                'servicio_id': servicio_id
            })

    cursor.close()
    conn.close()
    return jsonify(resultado)

def obtener_proxima_fecha(dia):
    dias = {'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4,
            'Viernes': 5, 'Sábado': 6, 'Domingo': 0}
    hoy = datetime.now()
    dia_deseado = dias[dia]
    diff = (dia_deseado - hoy.weekday() + 7) % 7 or 7
    proxima = hoy + timedelta(days=diff)
    return proxima.strftime('%Y-%m-%d')


@app.route('/guardar_cita', methods=['POST'])
def guardar_cita():
    if 'cliente_id' not in session:
        return jsonify({'message': 'No has iniciado sesión'}), 401

    data = request.get_json()
    cliente_id = session['cliente_id']
    profesional_id = data['profesional_id']
    servicio_id = data['servicio_id']
    sede_id = data['sede_id']
    fecha = data['fecha']
    hora_inicio = data['hora_inicio']

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT duracion FROM servicios WHERE id=%s", (servicio_id,))
    result = cursor.fetchone()
    if not result:
        cursor.close()
        conn.close()
        return jsonify({'message': 'Servicio no encontrado'}), 400
    duracion = result[0]

    hora_fin_dt = datetime.strptime(hora_inicio, '%H:%M:%S') + timedelta(minutes=duracion)
    hora_fin = hora_fin_dt.time()

    sql = """
        INSERT INTO cita (fecha, estado, hora_inicio, hora_fin, clientes_id,
                          profesionales_id, servicios_id, sede_id)
        VALUES (%s, 1, %s, %s, %s, %s, %s, %s)
    """
    valores = (fecha, hora_inicio, hora_fin, cliente_id, profesional_id, servicio_id, sede_id)
    cursor.execute(sql, valores)
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'message': 'Cita agendada correctamente'})

@app.route('/actualizar_citas_finalizadas')
def actualizar_citas_finalizadas():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE cita
        SET estado = 0
        WHERE estado = 1 AND CONCAT(fecha, ' ', hora_fin) < NOW()
    """)
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Citas finalizadas actualizadas'})



def generar_franjas(inicio, fin, duracion):
    franjas = []
    actual = datetime.strptime(str(inicio), '%H:%M:%S')
    fin_dt = datetime.strptime(str(fin), '%H:%M:%S')

    while actual + timedelta(minutes=duracion) <= fin_dt:
        fin_franja = (actual + timedelta(minutes=duracion)).strftime('%H:%M:%S')
        franjas.append({
            'hora_inicio': actual.strftime('%H:%M:%S'),
            'hora_fin': fin_franja
        })
        actual += timedelta(minutes=duracion)
    return franjas

@app.route('/ver_citas')
def ver_citas():
    if 'cliente_id' not in session:
        flash('Debes iniciar sesión para ver tus citas.', 'danger')
        return redirect(url_for('login'))

    cliente_id = session['cliente_id']

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT c.id, c.fecha, c.hora_inicio, c.hora_fin, c.estado,
               p.nombre AS doctor, p.apellido AS doctor_apellido, 
               s.nombre AS sede, se.nombre AS servicio
        FROM cita c
        JOIN profesionales p ON c.profesionales_id = p.id
        JOIN sede s ON c.sede_id = s.id
        JOIN servicios se ON c.servicios_id = se.id
        WHERE c.clientes_id = %s
        ORDER BY c.fecha DESC, c.hora_inicio ASC
    """, (cliente_id,))

    citas = cursor.fetchall()
    cursor.close()
    conn.close()

    return render_template('ver_citas.html', citas=citas)


# Otras vistas estáticas
@app.route('/')
def index():
    return render_template('login.html')



@app.route('/AdminInicio')
def admin_inicio():
    return render_template('inicioAdmin.html')

@app.route('/Servicios_Ofrecidos')
def servicios_ofrecidos():
    return render_template('servicios_ofrecidos.html')

@app.route('/Registro_personal')
def registro_personal():
    return render_template('registro_personal.html')

@app.route('/Servicio_de_citas')
def servicio_de_citas():
    return render_template('servicio_de_citas.html')

@app.route('/Horario_profesional')
def horario_profesional():
    return render_template('horario_profesional.html')

@app.route('/Sedes')
def sedes():
    return render_template('sedes.html')

@app.route('/Estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

if __name__ == '__main__':
    app.run(debug=True)
