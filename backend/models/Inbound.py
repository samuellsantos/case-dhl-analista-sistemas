from db import db
from flask_login import UserMixin

class Inbound(db.Model):
    __tablename__ = 'inbound'
    
    id = db.Column(db.Integer, primary_key = True)
    
    nf = db.Column(db.Integer, unique= True)
    placa = db.Column(db.String(20))
    transportadora = db.Column(db.String(20))
    motorista = db.Column(db.String())
    observacoes = db.Column(db.String(30))
    caixas = db.Column(db.Integer)
    pecas = db.Column(db.Integer)
    status = db.Column(db.String(30))
    