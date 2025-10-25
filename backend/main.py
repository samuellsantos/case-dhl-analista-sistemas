from flask import Flask, request, redirect, jsonify
from models.db import db
from models.Usuario import Usuario

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
db.init_app(app)


@app.route('/registrar_usuario', methods=['POST'])
def registrar():
    data = request.json
    nome = data.get('nome')
    senha = data.get('senha')
    
    if nome and senha:
        try:
            db.session.add(Usuario(nome = nome, senha = senha))
            db.session.commit()
            return jsonify({'message': 'Usuario criado com sucesso.'})

        
        except Exception as e:
            return jsonify({'message': 'Nome de usuário já existente, tente outro.'})
        
    else:
        return jsonify({'message': 'Credenciais inválidas.'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)