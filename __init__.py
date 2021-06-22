#!/usr/bin/env python3

"""Initialize Flask application framework for Along the Longing"""
import os

from flask import Flask
from flask_login import LoginManager

from auth.routes import auth_bp
from home import home_bp
from aphorisms.aphorisms import aphorisms_bp
from engine.engine import engine_bp
from manifesto.manifesto import manifesto_bp
from models import (open_db_session,
                    User)
from poems.poems import poems_bp

# Create Flask app
app = Flask(__name__)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(home_bp)
app.register_blueprint(aphorisms_bp)
app.register_blueprint(engine_bp)
app.register_blueprint(manifesto_bp)
app.register_blueprint(poems_bp)

# Set Flask app configs from environment variables
# TODO: Make sure to make new variables for this site
app.env = os.environ.get('FLASK_ENV')
app.secret_key = os.environ.get('FLASK_SECRET_KEY')

# Initialize LoginManager
login_manager = LoginManager()
login_manager.login_view = '/login'
login_manager.login_message = 'Access requires logging in'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    DBSession = open_db_session()
    user = DBSession.query(User).get(int(user_id))
    DBSession.close()
    return user

# Run the app
if __name__ == '__main__':
    app.run()
