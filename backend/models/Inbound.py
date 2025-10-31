from db import db
from datetime import datetime
import pytz

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
    dt_entrada = db.Column(db.DateTime, default=lambda: datetime.now(pytz.timezone("America/Sao_Paulo")))
    dt_saida = db.Column(db.DateTime)
    