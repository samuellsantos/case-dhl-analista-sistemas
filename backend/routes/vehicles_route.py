from flask import request, jsonify, Blueprint
from flask_login import login_required
from models.Veiculos import Veiculos
from db import db

vehicles_bp = Blueprint('vehicles', __name__)


@vehicles_bp.route('/registrar_veiculo', methods = ['POST'])
@login_required
def registrar_veiculo():
    data = request.json
    nome_motorista = data.get('nome_motorista')
    transportadora = data.get('transportadora')
    placa = data.get('placa')
    observacoes = data.get('observacoes')
    status = 'Em Patio'
    
    try:
        registro_veiculo = Veiculos(
            nome_motorista = nome_motorista,
            transportadora = transportadora,
            placa = placa,
            observacoes = observacoes,
            status = status
        )
        
        db.session.add(registro_veiculo)
        db.session.commit()
        
        return jsonify({'message': 'Veiculo registrado com sucesso.'}), 201
    except Exception as e:
        return jsonify({'message': f'Não foi possível registrar o veiculo. {e}'}), 401
    