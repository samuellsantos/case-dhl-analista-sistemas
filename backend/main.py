from flask import Flask, request, jsonify
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from db import db
from models.Usuario import Usuario
from models.Veiculos import Veiculos
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
    from routes.vehicles_route import vehicles_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(vehicles_bp, url_prefix='/vehicles')

    # Usuario logado
    @lm.user_loader
    def load_user(id):
        return db.session.query(Usuario).filter_by(id = id).first()
    
    return app
