from flask import request, jsonify, Blueprint
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from models.Usuario import Usuario
from db import db
import hashlib

auth_bp = Blueprint('auth', __name__)


def hash(txt):
    hash_obj = hashlib.sha256(txt.encode('utf-8'))
    return hash_obj.hexdigest()


@auth_bp.route('/')
@login_required
def home():
    return jsonify({'message': current_user.nome})


# Rota de Registo de usuario
@auth_bp.route('/registrar_usuario', methods=['POST'])
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
            return jsonify({'message': 'Usuario criado com sucesso.'}), 201 #Created

        
        except Exception as e:
            return jsonify({'message': 'Nome de usuário já existente, tente outro.'}), 409 #Conflict
        
    else:
        return jsonify({'message': 'Credenciais inválidas.'}), 401 #Unauthorized
    
# Rota de Login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    nome = data.get('nome')
    senha = data.get('senha')
    
    user = db.session.query(Usuario).filter_by(nome = nome, senha = hash(senha)).first()
    if not user:
        return jsonify({'message': 'Usuário ou senha incorretos.'}), 400 #Bad Request
    else:
        login_user(user)
        return jsonify({'message': 'Logado com sucesso!'})
    
# Rota de Logout
@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'logout realizado com sucesso!'})
    