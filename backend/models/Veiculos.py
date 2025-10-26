from db import db
from datetime import datetime
from zoneinfo import ZoneInfo

class Veiculos(db.Model):
    __tablename__ = 'veiculos'
    
    id = db.Column(db.Integer, primary_key = True)
    nome_motorista = db.Column(db.String(30), nullable = False)
    transportadora = db.Column(db.String(30), nullable = False)
    placa = db.Column(db.String(30), nullable = False)
    observacoes = db.Column(db.String(50))
    status = db.Column(db.String(30), nullable = False)
    dt_entrada = db.Column(db.DateTime, default=lambda: datetime.now(ZoneInfo("America/Sao_Paulo")))
    dt_saida = db.Column(db.DateTime)