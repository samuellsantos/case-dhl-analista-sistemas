from flask import Flask, request, redirect, jsonify
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from models.db import db
from models.Usuario import Usuario
import hashlib

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.secret_key = 'secret-key'
db.init_app(app)
lm = LoginManager(app)

def hash(txt):
    hash_obj = hashlib.sha256(txt.encode('utf-8'))
    return hash_obj.hexdigest()


@lm.user_loader
def user_loader(id):
    usuario = db.session.query(Usuario).filter_by(id = id).first()
    return usuario


@app.route('/')
@login_required
def home():
    return jsonify({'message': current_user.nome})

@app.route('/registrar_usuario', methods=['POST'])
def registrar():
    data = request.json
    nome = data.get('nome')
    senha = data.get('senha')
    
    if nome and senha:
        try:
            novoUsuario = Usuario(nome = nome, senha = hash(senha))
            db.session.add(novoUsuario)
            db.session.commit()
            
            login_user(novoUsuario)
            return jsonify({'message': 'Usuario criado com sucesso.'}), 201

        
        except Exception as e:
            return jsonify({'message': 'Nome de usuário já existente, tente outro.'}), 402
        
    else:
        return jsonify({'message': 'Credenciais inválidas.'}), 401
    

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    nome = data.get('nome')
    senha = data.get('senha')
    
    user = db.session.query(Usuario).filter_by(nome = nome, senha = hash(senha)).first()
    if not user:
        return jsonify({'message': 'Nome ou senha incorretas.'}), 401
    else:
        login_user(user)
        return jsonify({'message': 'Logado com sucesso!'})
    
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'logout realizado com sucesso!'})
    

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)