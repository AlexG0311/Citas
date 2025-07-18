from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import mysql.connector
from datetime import datetime, timedelta

app = Flask(__name__)
app.secret_key = 'un_secreto'

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='root',
        database='mydbmaria'
    )

# ---------------- LOGIN ----------------

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
            flash(f"Bienvenido/a {cliente['nombre']}", 'success')
            return redirect(url_for('cliente_inicio'))
        else:
            flash('Número no válido', 'danger')
            return redirect(url_for('login'))

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()
    flash('Sesión cerrada', 'info')
    return redirect(url_for('login'))

# ---------------- CLIENTE INICIO ----------------

@app.route('/ClienteInicio')
def cliente_inicio():
    if 'cliente_id' not in session:
        return redirect(url_for('login'))
    return render_template('ClienteInicio.html', nombre=session['cliente_nombre'])


# ---------------- AGENDAR CITA ----------------

@app.route('/agendar_cita')
def agendar_cita():
    if 'cliente_id' not in session:
        return redirect(url_for('login'))

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT id, nombre FROM servicios WHERE estado=1")
    servicios = cursor.fetchall()

    cursor.execute("SELECT id, nombre FROM modalidad WHERE estado=1")
    modalidades = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template('agendar_cita.html', servicios=servicios, modalidades=modalidades)




def timedelta_to_str(td):
    if isinstance(td, timedelta):
        total_seconds = int(td.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        return f"{hours:02d}:{minutes:02d}:00"
    return td  # ya es string




# ---------------- DOCTORES Y HORARIOS ----------------

@app.route('/get_doctores_con_horarios')
def get_doctores_con_horarios():
    servicio_id = request.args.get('servicio_id')
    modalidad_id = request.args.get('modalidad')

    if not servicio_id or not modalidad_id:
        return jsonify({'message': 'Servicio y modalidad son requeridos'}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    resultado = []

    try:
        # Obtener duración del servicio
        cursor.execute("SELECT duracion FROM servicios WHERE id=%s", (servicio_id,))
        servicio = cursor.fetchone()
        if not servicio:
            return jsonify([])

        duracion = servicio['duracion']

        # Obtener doctores con horarios para ese servicio y modalidad
        cursor.execute("""
                            SELECT
                                h.id AS horario_id,
                                h.fecha,
                                p.id AS profesional_id,
                                p.nombre AS doctor,
                                p.apellido,
                                p.especialidad,
                                h.hora_inicio AS hora_ini,
                                h.hora_fin AS hora_fin,
                                h.intervalo_min,
                                s.id AS sede_id,
                                s.nombre AS sede,
                                m.id AS modalidad_id,
                                m.nombre AS modalidad,
                                sv.nombre AS servicio
                            FROM horario h
                            JOIN profesionales p ON h.Profesionales_id = p.id
                            JOIN sede s ON p.sede_id = s.id
                            JOIN modalidad m ON h.modalidad_id = m.id
                            JOIN servicios sv ON h.Servicios_id = sv.id
                            WHERE h.Servicios_id=%s AND h.modalidad_id=%s AND h.estado=0 AND h.fecha >= CURDATE()
                        """, (servicio_id, modalidad_id))

        doctores = cursor.fetchall()

        for doc in doctores:
            doc['hora_ini'] = timedelta_to_str(doc.pop('hora_ini'))
            doc['hora_fin'] = timedelta_to_str(doc.pop('hora_fin'))

            resultado.append({
                                'doctor': f"{doc['doctor']} {doc['apellido']}",
                                'servicio': doc['servicio'],
                                'fecha': doc['fecha'].strftime('%Y-%m-%d'),
                                'hora_inicio': doc['hora_ini'],
                                'hora_fin': doc['hora_fin'],
                                'sede': doc['sede'],
                                'sede_id': doc['sede_id'],
                                'profesional_id': doc['profesional_id'],
                                'servicio_id': servicio_id,
                                'modalidad': doc['modalidad'],
                                'modalidad_id': doc['modalidad_id']
                            })
        return jsonify(resultado)

    except Exception as e:
        app.logger.error(f"Error en get_doctores_con_horarios: {e}")
        return jsonify({'message': 'Ocurrió un error al obtener los horarios'}), 500

    finally:
        cursor.close()
        conn.close()
        print(f"Resultado devuelto: {resultado}")



#-------------- GUARDAR CITA ----------------

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
    modalidad_id = data.get('modalidad_id')

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # obtener duración del servicio
        cursor.execute("SELECT duracion FROM servicios WHERE id = %s", (servicio_id,))
        result = cursor.fetchone()
        if not result:
            return jsonify({'message': 'Servicio no encontrado'}), 400

        duracion = result[0]

        hora_fin_dt = datetime.strptime(hora_inicio, '%H:%M:%S') + timedelta(minutes=duracion)
        hora_fin = hora_fin_dt.time()

        # verificar si ya hay una cita ocupando esa franja
        cursor.execute("""
            SELECT id FROM cita
            WHERE profesionales_id=%s AND fecha=%s AND hora_inicio=%s AND estado=1
        """, (profesional_id, fecha, hora_inicio))
        existe = cursor.fetchone()

        if existe:
            return jsonify({'message': 'Esta franja horaria ya está ocupada'}), 400

        # insertar la cita
        cursor.execute("""
            INSERT INTO cita (fecha, estado, hora_inicio, hora_fin, clientes_id,
                              profesionales_id, servicios_id, sede_id, modalidad_id)
            VALUES (%s, 1, %s, %s, %s, %s, %s, %s, %s)
        """, (fecha, hora_inicio, hora_fin, cliente_id, profesional_id, servicio_id, sede_id, modalidad_id))

        # 🆕 aquí actualizamos el horario a estado = 1
        cursor.execute("""
            UPDATE horario
            SET estado = 1
            WHERE Profesionales_id = %s AND Servicios_id = %s AND modalidad_id = %s
              AND hora_inicio = %s
        """, (profesional_id, servicio_id, modalidad_id, hora_inicio))

        conn.commit()

        return jsonify({'message': 'Cita agendada correctamente y horario marcado como ocupado'})

    except Exception as e:
        print(f"Error al guardar la cita: {e}")
        return jsonify({'message': 'Error al agendar la cita'}), 500

    finally:
        if cursor:
            try:
                cursor.fetchall()
            except:
                pass
            cursor.close()
        if conn:
            conn.close()

# ---------------- UTILS ----------------

def obtener_proxima_fecha(dia):
    dias = {'Lunes': 0, 'Martes': 1, 'Miércoles': 2, 'Jueves': 3,
            'Viernes': 4, 'Sábado': 5, 'Domingo': 6}
    hoy = datetime.now()
    dia_deseado = dias[dia]
    diff = (dia_deseado - hoy.weekday() + 7) % 7 or 7
    proxima = hoy + timedelta(days=diff)
    return proxima.strftime('%Y-%m-%d')

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


# Otras vistas estáticas
@app.route('/')
def index():
    return render_template('login.html')








@app.route('/ver_citas')
def ver_citas():
    if 'cliente_id' not in session:
        flash('Debes iniciar sesión', 'warning')
        return redirect(url_for('login'))

    cliente_id = session['cliente_id']
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT c.id, c.fecha, c.hora_inicio, c.hora_fin,
               CONCAT(p.nombre, ' ', p.apellido) AS doctor,
               s.nombre AS servicio, sede.nombre AS sede
        FROM cita c
        JOIN profesionales p ON c.profesionales_id = p.id
        JOIN servicios s ON c.servicios_id = s.id
        JOIN sede sede ON c.sede_id = sede.id
        WHERE c.clientes_id = %s AND c.estado = 1
        ORDER BY c.fecha, c.hora_inicio
    """, (cliente_id,))
    citas = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template('ver_citas.html', citas=citas)


@app.route('/cancelar_cita/<int:cita_id>', methods=['POST'])
def cancelar_cita(cita_id):
    if 'cliente_id' not in session:
        return jsonify({'error': 'No autorizado'}), 401

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # obtener los datos de la cita
        cursor.execute("""
            SELECT profesionales_id, servicios_id, modalidad_id, hora_inicio
            FROM cita
            WHERE id = %s AND clientes_id = %s
        """, (cita_id, session['cliente_id']))
        cita = cursor.fetchone()

        if not cita:
            return jsonify({'error': 'Cita no encontrada'}), 404

        # cancelar la cita
        cursor.execute("""
            UPDATE cita
            SET estado = 0
            WHERE id = %s AND clientes_id = %s
        """, (cita_id, session['cliente_id']))

        # liberar el horario
        cursor.execute("""
            UPDATE horario
            SET estado = 0
            WHERE Profesionales_id = %s AND Servicios_id = %s 
              AND modalidad_id = %s AND hora_inicio = %s
        """, (
            cita['profesionales_id'],
            cita['servicios_id'],
            cita['modalidad_id'],
            cita['hora_inicio']
        ))

        conn.commit()

        return jsonify({'message': 'Cita cancelada y horario liberado correctamente'})

    except Exception as e:
        print(f"Error al cancelar la cita: {e}")
        return jsonify({'error': 'Error al cancelar la cita'}), 500

    finally:
        cursor.close()
        conn.close()



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













#_____________________________________________-Profecional__________________________________________________


@app.route('/login_profesional', methods=['GET', 'POST'])
def login_profesional():
    if request.method == 'POST':    
        correo = request.form['correo']
        contraseña = request.form['contraseña']

        print(f"correo recibido: {correo}")
        print(f"contraseña recibida: {contraseña}")

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT * FROM profesionales 
            WHERE correo = %s AND contraseña = %s AND estado = 1
        """, (correo, contraseña))
        profesional = cursor.fetchone()

        print(f"profesional encontrado: {profesional}")

        cursor.close()
        conn.close()

        if profesional:
            session['profesional_id'] = profesional['id']
            session['profesional_nombre'] = profesional['nombre']
            return redirect(url_for('profesional_inicio'))
        else:
            return render_template('doctor/login.html', error='Credenciales incorrectas')

    return render_template('doctor/login.html')

# ---------------- INICIO PROFESIONAL ----------------

@app.route('/profesional_inicio')
def profesional_inicio():
    if 'profesional_id' not in session:
        return redirect(url_for('login_profesional'))

    nombre = session.get('profesional_nombre', 'Profesional')
    return render_template('doctor/inicio.html', nombre=nombre)


@app.route('/citas_profesional')
def citas_profesional():
    if 'profesional_id' not in session:
        return redirect(url_for('login_profesional'))

    profesional_id = session['profesional_id']

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    hoy_str = datetime.now().strftime('%Y-%m-%d')

    # Citas de hoy
    cursor.execute("""
        SELECT c.id, c.fecha, c.hora_inicio, c.hora_fin, 
               CONCAT(cl.nombre, ' ', cl.apellido) AS paciente,
               cl.numero AS cedula, s.nombre AS servicio,
               sede.nombre AS sede, c.estado
        FROM cita c
        JOIN clientes cl ON c.clientes_id = cl.id
        JOIN servicios s ON c.servicios_id = s.id
        JOIN sede sede ON c.sede_id = sede.id
        WHERE c.profesionales_id = %s AND c.fecha = %s
        ORDER BY c.hora_inicio
    """, (profesional_id, hoy_str))
    citas_hoy = cursor.fetchall()

    # Todas las citas
    cursor.execute("""
        SELECT c.id, c.fecha, c.hora_inicio, c.hora_fin, 
               CONCAT(cl.nombre, ' ', cl.apellido) AS paciente,
               cl.numero AS cedula, s.nombre AS servicio,
               sede.nombre AS sede, c.estado
        FROM cita c
        JOIN clientes cl ON c.clientes_id = cl.id
        JOIN servicios s ON c.servicios_id = s.id
        JOIN sede sede ON c.sede_id = sede.id
        WHERE c.profesionales_id = %s
        ORDER BY c.fecha DESC, c.hora_inicio
    """, (profesional_id,))
    citas_historico = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template('doctor/citas.html',citas_hoy=citas_hoy,citas_historico=citas_historico)




@app.route('/finalizar_cita/<int:cita_id>', methods=['POST'])
def finalizar_cita(cita_id):
    if 'profesional_id' not in session:
        return jsonify({'error': 'No autorizado'}), 401

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Actualiza la cita a estado=0 (finalizada)
        cursor.execute("""
            UPDATE cita
            SET estado = 0
            WHERE id = %s AND profesionales_id = %s
        """, (cita_id, session['profesional_id']))

        if cursor.rowcount == 0:
            return jsonify({'error': 'Cita no encontrada o no autorizada'}), 404

        conn.commit()
        return jsonify({'message': 'Cita finalizada correctamente'})

    except Exception as e:
        print(f"Error al finalizar la cita: {e}")
        return jsonify({'error': 'Error al finalizar la cita'}), 500

    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)
