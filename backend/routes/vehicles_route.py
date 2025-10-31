from flask import request, jsonify, Blueprint
from flask_login import login_required
from models.Veiculos import Veiculos
from db import db
import pytz
from datetime import datetime

vehicles_bp = Blueprint('vehicles', __name__)

@vehicles_bp.route('/registrar_veiculo', methods=['POST'])
def registrar_veiculo():
    data = request.json
    nome_motorista = data.get('nome_motorista')
    transportadora = data.get('transportadora')
    placa = data.get('placa')
    observacoes = data.get('observacoes')
    tipo = data.get('tipo') 
    status = 'Em Patio'

    try:
        # Se for inbound, incluir volumes e peças
        if tipo == "Inbound":
            nf = data.get('nf')
            caixas = data.get('volumes')
            pecas = data.get('pecas')

            registro_veiculo = Veiculos(
                nome_motorista=nome_motorista,
                transportadora=transportadora,
                placa=placa,
                observacoes=observacoes,
                status=status,
                tipo=tipo,
                volumes=caixas,
                pecas=pecas,
                nf=nf
            )
        else:
            registro_veiculo = Veiculos(
                nome_motorista=nome_motorista,
                transportadora=transportadora,
                placa=placa,
                observacoes=observacoes,
                status=status,
                tipo=tipo
            )

        db.session.add(registro_veiculo)
        db.session.commit()

        return jsonify({'message': f'{tipo} registrado com sucesso.'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Erro ao registrar veículo: {str(e)}'}), 400

    

@vehicles_bp.route('/listar_veiculos', methods = ['GET'])
def listar_veiculos():
    veiculos = Veiculos.query.all()
    resultado = []
    
    for v in veiculos:
        resultado.append({
            "id": v.id,
            "nome_motorista": v.nome_motorista,
            "transportadora": v.transportadora,
            "placa": v.placa,
            "observacoes": v.observacoes,
            "status": v.status,
            "tipo": v.tipo if hasattr(v, 'tipo') else None,
            "nf": v.nf if hasattr(v, 'nf') else None,
            "volumes": v.volumes if hasattr(v, 'volumes') else None,
            "pecas": v.pecas if hasattr(v, 'pecas') else None,
            "dt_entrada": v.dt_entrada.strftime("%d/%m/%Y %H:%M:%S") if v.dt_entrada else None,
            "dt_saida": v.dt_saida.strftime("%d/%m/%Y %H:%M:%S") if v.dt_saida else None
        })
    return jsonify(resultado), 200

@vehicles_bp.route('/despachar_veiculo/<int:id>', methods = ['PUT'])
def despachar_veiculo(id):
    veiculo = Veiculos.query.get(id)
    
    if veiculo.status != 'Em Patio':
        return jsonify({'message': 'O veiculo já foi despachado.'}), 409
    
    novo_status = 'Despachado'
    dt_saida = datetime.now(pytz.timezone("America/Sao_Paulo"))
    
    
    if not veiculo:
        return jsonify({'message': 'Veículo não encontrado.'}), 404
    
    
    veiculo.status = novo_status
    veiculo.dt_saida = dt_saida
    

@vehicles_bp.route('/despachar_veiculoexp/<int:id>', methods = ['PUT'])
def despachar_veiculoexp(id):
    veiculo = Veiculos.query.get(id)
    data = request.json
    nf = data.get('nf')
    caixas = data.get('volumes')
    pecas = data.get('pecas')
    

    
    if veiculo.status != 'Em Patio':
        return jsonify({'message': 'O veiculo já foi despachado.'}), 409
    
    novo_status = 'Despachado'
    dt_saida = datetime.now(pytz.timezone("America/Sao_Paulo"))

    
    
    if not veiculo:
        return jsonify({'message': 'Veículo não encontrado.'}), 404
    
    
    veiculo.status = novo_status
    veiculo.dt_saida = dt_saida
    veiculo.nf = nf
    veiculo.volumes = caixas
    veiculo.pecas = pecas
    
    db.session.commit()
    
    return jsonify({
        "mensagem": f"Veículo {veiculo.id} ({veiculo.placa}) despachado com sucesso.",
        "motorista": veiculo.nome_motorista,
        "transportadora": veiculo.transportadora,
        "status_atual": veiculo.status,
        "dt_saida": veiculo.dt_saida.strftime("%d/%m/%Y %H:%M:%S")
    }), 200


@vehicles_bp.route('deletar_veiculo/<int:id>', methods = ['DELETE'])
def deletar_veiculo(id):
    veiculo = Veiculos.query.get(id)
    
    if not veiculo:
        return jsonify({'message': 'Veículo não encontrado.'}), 404
    
    db.session.delete(veiculo)
    db.session.commit()
    return jsonify({'message': 'Veículo deletado com sucesso.'})
    