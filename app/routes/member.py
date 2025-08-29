from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
from .. import db
from ..models import Member, Otp

member_bp = Blueprint("member", __name__)

@member_bp.post("/register")
def register():
    data = request.get_json(silent=True) or {}
    mobile = (data.get("mobile") or "").strip()
    name = (data.get("name") or "").strip() or None

    if not mobile:
        return jsonify(msg="mobile is required"), 400

    member = Member.query.filter_by(mobile=mobile).first()
    if not member:
        member = Member(mobile=mobile, name=name)
        db.session.add(member)
        db.session.flush()
    else:
        if name and not member.name:
           member.name = name

    otp_code = current_app.config.get("DUMMY_OTP", "123456")
    otp = Otp(member_id=member.id, code=otp_code)
    db.session.add(otp)
    db.session.commit()

    return jsonify(member_id=member.id, mobile=mobile, msg="OTP generated (dummy)"), 201

@member_bp.post("/verify")
def verify():
    data = request.get_json(silent=True) or {}
    mobile = (data.get("mobile") or "").strip()
    code = (data.get("otp") or "").strip()

    if not mobile or not code:
        return jsonify(msg="mobile and otp are required"), 400

    member = Member.query.filter_by(mobile=mobile).first()
    if not member:
        return jsonify(msg="member not found"), 404

    otp = Otp.query.filter_by(member_id=member.id, code=code, is_used=False).order_by(Otp.created_at.desc()).first()
    if not otp:
        return jsonify(msg="invalid or already used otp"), 400

    otp.is_used = True
    member.is_verified = True
    db.session.commit()

    token = create_access_token(identity=str(member.id))
    return jsonify(access_token=token, member_id=member.id, msg="verified"), 200