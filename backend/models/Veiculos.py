from datetime import datetime
import pytz
from db import db

class Veiculos(db.Model):
    __tablename__ = 'veiculos'
    
    id = db.Column(db.Integer, primary_key=True)
    nome_motorista = db.Column(db.String(30), nullable=False)
    transportadora = db.Column(db.String(30), nullable=False)
    placa = db.Column(db.String(30), nullable=False)
    observacoes = db.Column(db.String(50))
    status = db.Column(db.String(30), nullable=False)
    dt_entrada = db.Column(db.DateTime, default=lambda: datetime.now(pytz.timezone("America/Sao_Paulo")))
    dt_saida = db.Column(db.DateTime)
    tipo = db.Column(db.String(30))
    volumes = db.Column(db.Integer)
    pecas = db.Column(db.Integer)
    nf = db.Column(db.String(15))
    
