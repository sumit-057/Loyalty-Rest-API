from flask import Blueprint, request, jsonify
from .. import db
from ..models import Member, Coupon
from ..utils.auth import jwt_required_member
from ..utils.helpers import REDEEM_TABLE, generate_coupon_code

coupons_bp = Blueprint("coupons", __name__)

@coupons_bp.post("/redeem")
@jwt_required_member
def redeem():
    data = request.get_json(silent=True) or {}
    member_id = data.get("member_id")
    points_to_spend = data.get("points")

    if not isinstance(member_id, int) or not isinstance(points_to_spend, int):
        return jsonify(msg="member_id and points (int) required"), 400

    if points_to_spend not in REDEEM_TABLE:
        return jsonify(msg=f"invalid redeem points. Allowed: {list(REDEEM_TABLE.keys())}"), 400

    member = Member.query.get(member_id)
    if not member:
        return jsonify(msg="member not found"), 404

    if member.points < points_to_spend:
        return jsonify(msg="insufficient points"), 400

    coupon_value = REDEEM_TABLE[points_to_spend]
    member.points -= points_to_spend

    coupon = Coupon(member_id=member.id, code=generate_coupon_code(),
                    value_rupees=coupon_value, points_spent=points_to_spend)
    db.session.add(coupon)
    db.session.commit()

    return jsonify(coupon_code=coupon.code, value=coupon.value_rupees,
                   points_spent=coupon.points_spent, current_points=member.points), 201

@coupons_bp.get("/<int:member_id>")
@jwt_required_member
def get_coupons(member_id: int):
    member = Member.query.get(member_id)
    if not member:
        return jsonify(msg="member not found"), 404

    member_coupons = Coupon.query.filter_by(member_id=member_id).all()

    return jsonify([
        {"code": c.code, "value_rupees": c.value_rupees, "points_spent": c.points_spent}
        for c in member_coupons
    ]), 200