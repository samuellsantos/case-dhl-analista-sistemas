from flask import request, jsonify, Blueprint
from models.Inbound import Inbound
from db import db
import pytz
from datetime import datetime


inbound_bp = Blueprint('inbound', __name__)
@inbound_bp.route('/registrar_inbound', methods = ['POST'])
def registrar_inbound():
    data = request.json
    nf = data.get('nf')
    placa = data.get('placa')
    transportadora = data.get('transportadora')
    observacoes = data.get('observacoes')
    motorista = data.get('motorista')
    caixas = data.get('caixas')
    pecas = data.get('pecas')
    status = data.get('status')
    
    try:
        registro_inbound = Inbound(
            nf = nf,
            placa = placa,
            transportadora = transportadora,
            observacoes = observacoes,
            motorista = motorista,
            caixas = caixas,
            pecas = pecas,
            status = "Em Patio"
        )
        
        db.session.add(registro_inbound)
        db.session.commit()
        
        return jsonify({'message': 'Inbound registrado com sucesso.'}), 201
    except Exception as e:
        return jsonify({'message': f'Não foi possível registrar o inbound. {e}'}), 401