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

if __name__ == '__main__':
    app.run(debug=True)