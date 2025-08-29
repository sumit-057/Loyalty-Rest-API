from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from .. import db
from ..models import Member, PointsTransaction
from ..utils.auth import jwt_required_member
from ..utils.helpers import calculate_points

points_bp = Blueprint("points", __name__)

@points_bp.post("/add")
@jwt_required_member
def add_points():
    data = request.get_json(silent=True) or {}
    member_id = data.get("member_id")
    rupees = data.get("rupees")

    if not isinstance(member_id, int) or not isinstance(rupees, int):
        return jsonify(msg="member_id and rupees (int) required"), 400

    member = Member.query.get(member_id)
    if not member:
        return jsonify(msg="member not found"), 404

    pts = calculate_points(rupees)
    if pts <= 0:
        return jsonify(msg="nothing to add", points_added=0), 200

    member.points += pts

    txn = PointsTransaction(member_id=member.id, rupees=rupees, points_added=pts)
    db.session.add(txn)
    db.session.commit()

    return jsonify(member_id=member.id, rupees=rupees, points_added=pts, total_points=member.points), 200

@points_bp.get("/<int:member_id>")
@jwt_required_member
def get_points(member_id: int):
    member = Member.query.get(member_id)
    if not member:
        return jsonify(msg="member not found"), 404
    return jsonify(member_id=member.id, total_points=member.points), 200