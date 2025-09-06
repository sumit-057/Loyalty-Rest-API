# app/__init__.py

import os
from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    # Application instance banaye
    app = Flask(__name__, static_folder='static')
    
    # Config file se settings load kare
    app.config.from_object(Config)
    
    # Extensions (db, jwt) ko initialize kare
    db.init_app(app)
    jwt.init_app(app)

    # Blueprints ko import aur register kare
    from .routes.member import member_bp
    from .routes.points import points_bp
    from .routes.coupons import coupons_bp

    app.register_blueprint(member_bp, url_prefix='/api/member')
    app.register_blueprint(points_bp, url_prefix='/api/points')
    app.register_blueprint(coupons_bp, url_prefix='/api/coupons')
    
    # Root URL ('/') ke liye route
    @app.route('/')
    def serve_frontend():
        return send_from_directory(app.static_folder, 'index.html')

    # CSS aur JS files ko serve karne ke liye routes
    @app.route('/css/<path:filename>')
    def serve_css(filename):
        return send_from_directory(os.path.join(app.static_folder, 'css'), filename)

    @app.route('/js/<path:filename>')
    def serve_js(filename):
        return send_from_directory(os.path.join(app.static_folder, 'js'), filename)

    # Database tables banaye (agar existing nahi hai to)
    with app.app_context():
        db.create_all()

    return app

