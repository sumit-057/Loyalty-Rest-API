from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from functools import wraps


def jwt_required_member(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        identity = get_jwt_identity()
        # identity is member_id
        if not identity:
            return jsonify(msg="Unauthorized"), 401
        return fn(*args, **kwargs)
    return wrapper