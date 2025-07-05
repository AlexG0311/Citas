from flask import Flask, render_template, jsonify, request

app = Flask(__name__, template_folder='templates')

# Variable global para el contador
counter = 0

@app.route('/')
def index():
    return render_template('index.html', counter=counter)

@app.route('/increment', methods=['POST'])
def increment():
    global counter
    counter += 1
    return jsonify({'counter': counter})

@app.route('/ClienteInicio')
def cliente_inicio():
    return render_template('ClienteInicio.html')


@app.route('/Admin')
def admin_inicio():
    return render_template('inicioAdmin.html')

@app.route('/Servicios_Ofrecidos')
def servicios_ofrecidos():
    return render_template('servicios_ofrecidos.html')

@app.route('/Registro_ personal')
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