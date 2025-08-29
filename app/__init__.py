import os
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from .config import Config

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__, static_folder="static", template_folder="static")
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    
    from . import models  

    from .routes.member import member_bp
    from .routes.points import points_bp
    from .routes.coupons import coupons_bp

    app.register_blueprint(member_bp, url_prefix="/api/member")
    app.register_blueprint(points_bp, url_prefix="/api/points")
    app.register_blueprint(coupons_bp, url_prefix="/api/coupons")

    @app.route("/")
    def index():
        return render_template("index.html")

    @app.get("/health")
    def health():
        return jsonify(status="ok"), 200

    return app
