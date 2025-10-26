from flask import request, jsonify, Blueprint
from flask_login import login_required
from models.Veiculos import Veiculos
from db import db

vehicles_bp = Blueprint('vehicles', __name__)


@vehicles_bp.route('/')
def home():
    return jsonify({'message': 'OK'})