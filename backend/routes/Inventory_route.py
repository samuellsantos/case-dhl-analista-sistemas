from flask import Blueprint, request, jsonify
from db import db
from models.Inventario import Produto

inventory_bp = Blueprint('inventory', __name__)

@inventory_bp.route('/adicionar_inventario', methods=['POST'])
def adicionar_produto():
    data = request.get_json()
    nome = data.get("nome")
    sku = data.get("sku")
    quantidade = data.get("quantidade", 0)
    posicao = data.get("posicao")

    if not all([nome, sku, posicao]):
        return jsonify({"error": "Campos obrigatórios: nome, sku, posicao"}), 400

    novo_produto = Produto(nome=nome, sku=sku, quantidade=quantidade, posicao=posicao)
    db.session.add(novo_produto)
    db.session.commit()

    return jsonify({"message": "Produto adicionado com sucesso"}), 201


@inventory_bp.route('/listar_inventario', methods=['GET'])
def listar_produtos():
    produtos = Produto.query.all()
    return jsonify([p.to_dict() for p in produtos])

@inventory_bp.route("/quantidade/<int:id>", methods=["PUT"])
def atualizar_quantidade(id):
    data = request.get_json()
    delta = data.get("delta", 0)
    produto = Produto.query.get(id)
    if not produto:
        return jsonify({"error": "Produto não encontrado"}), 404

    produto.quantidade = max(0, produto.quantidade + delta)
    db.session.commit()
    return jsonify({"mensagem": "Quantidade atualizada com sucesso"})


@inventory_bp.route('/aumentar/<int:id>', methods=['PUT'])
def aumentar_quantidade(id):
    data = request.get_json()
    adicionar = data.get("quantidade")

    if adicionar is None:
        return jsonify({"error": "Informe a quantidade a adicionar"}), 400

    produto = Produto.query.get(id)
    if not produto:
        return jsonify({"error": "Produto não encontrado"}), 404

    produto.quantidade += adicionar
    db.session.commit()

    return jsonify({"message": "Quantidade atualizada com sucesso"}), 200


@inventory_bp.route('/mover/<int:id>', methods=['PUT'])
def mover_produto(id):
    data = request.get_json()
    nova_posicao = data.get("posicao")

    if not nova_posicao:
        return jsonify({"error": "Informe a nova posição"}), 400

    produto = Produto.query.get(id)
    if not produto:
        return jsonify({"error": "Produto não encontrado"}), 404

    produto.posicao = nova_posicao
    db.session.commit()

    return jsonify({"message": "Produto movido com sucesso"}), 200


@inventory_bp.route('/deletar/<int:id>', methods=['DELETE'])
def deletar_produto(id):
    produto = Produto.query.get(id)
    if not produto:
        return jsonify({"error": "Produto não encontrado"}), 404

    db.session.delete(produto)
    db.session.commit()
    return jsonify({"message": "Produto removido"}), 200
