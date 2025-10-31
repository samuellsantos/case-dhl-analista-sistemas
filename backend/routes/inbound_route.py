from flask import request, jsonify, Blueprint
from models.Inbound import Inbound
from db import db
import pytz
from datetime import datetime

inbound_bp = Blueprint('inbound', __name__)

@inbound_bp.route('/registrar_inbound', methods=['POST'])
def registrar_inbound():
    data = request.json
    nf = data.get('nf')
    placa = data.get('placa')
    transportadora = data.get('transportadora')
    observacoes = data.get('observacoes')
    motorista = data.get('motorista')
    caixas = data.get('caixas')
    pecas = data.get('pecas')
    
    try:
        registro_inbound = Inbound(
            nf=nf,
            placa=placa,
            transportadora=transportadora,
            observacoes=observacoes,
            motorista=motorista,
            caixas=caixas,
            pecas=pecas,
            status="Em Patio"
        )
        
        db.session.add(registro_inbound)
        db.session.commit()
        
        return jsonify({'message': 'Inbound registrado com sucesso.'}), 201
    except Exception as e:
        return jsonify({'message': f'Não foi possível registrar o inbound. {e}'}), 401


@inbound_bp.route('/listar_inbounds', methods=['GET'])
def listar_inbounds():
    try:
        inbounds = Inbound.query.all()
        result = []
        for i in inbounds:
            result.append({
                'id': i.id,
                'nf': i.nf,
                'placa': i.placa,
                'transportadora': i.transportadora,
                'motorista': i.motorista,
                'observacoes': i.observacoes,
                'caixas': i.caixas,
                'pecas': i.pecas,
                'status': i.status
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'message': f'Erro ao listar inbounds. {e}'}), 500


@inbound_bp.route('/deletar_inbound/<int:id>', methods=['DELETE'])
def deletar_inbound(id):
    try:
        inbound = Inbound.query.get(id)
        if not inbound:
            return jsonify({'message': 'Inbound não encontrado.'}), 404
        
        db.session.delete(inbound)
        db.session.commit()
        return jsonify({'message': 'Inbound deletado com sucesso.'}), 200
    except Exception as e:
        return jsonify({'message': f'Erro ao deletar inbound. {e}'}), 500


@inbound_bp.route('/despachar_inbound/<int:id>', methods=['PUT'])
def despachar_inbound(id):
    try:
        inbound = Inbound.query.get(id)
        if not inbound:
            return jsonify({'message': 'Inbound não encontrado.'}), 404
        
        inbound.status = "Despachado"
        db.session.commit()
        return jsonify({'message': 'Inbound despachado com sucesso.'}), 200
    except Exception as e:
        return jsonify({'message': f'Erro ao despachar inbound. {e}'}), 500
