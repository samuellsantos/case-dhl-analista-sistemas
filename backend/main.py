from flask import Flask, request, jsonify
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from db import db
from models.Usuario import Usuario
import hashlib
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
    app.secret_key = 'secret-key'
    
    #lm.init_app(app)
    db.init_app(app)
    lm = LoginManager(app)
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
    from routes.auth_routes import auth_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')

    # Usuario logado
    @lm.user_loader
    def load_user(id):
        return db.session.query(Usuario).filter_by(id = id).first()
    
    return app


# @app.route('/')
# @login_required
# def home():
#     return jsonify({'message': current_user.nome})


# # Rota de Registo de usuario
# @app.route('/registrar_usuario', methods=['POST'])
# def registrar():
#     data = request.json
#     nome = data.get('nome')
#     senha = data.get('senha')
    
#     if nome and senha:
#         try:
#             novoUsuario = Usuario(nome = nome, senha = hash(senha))
#             db.session.add(novoUsuario)
#             db.session.commit()
            
#             login_user(novoUsuario)
#             return jsonify({'message': 'Usuario criado com sucesso.'}), 201 #Created

        
#         except Exception as e:
#             return jsonify({'message': 'Nome de usuário já existente, tente outro.'}), 409 #Conflict
        
#     else:
#         return jsonify({'message': 'Credenciais inválidas.'}), 401 #Unauthorized
    
# # Rota de Login
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     nome = data.get('nome')
#     senha = data.get('senha')
    
#     user = db.session.query(Usuario).filter_by(nome = nome, senha = hash(senha)).first()
#     if not user:
#         return jsonify({'message': 'Nome ou senha incorretas.'}), 400 #Bad Request
#     else:
#         login_user(user)
#         return jsonify({'message': 'Logado com sucesso!'})
    
# # Rota de Logout
# @app.route('/logout')
# @login_required
# def logout():
#     logout_user()
#     return jsonify({'message': 'logout realizado com sucesso!'})
    

# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
#     app.run(debug=True)