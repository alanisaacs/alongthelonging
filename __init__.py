#!/usr/bin/env python3

"""Initialize Flask application framework for Along the Longing"""
import os

from flask import Flask

from home import home_bp
from aphorisms.aphorisms import aphorisms_bp
from engine.engine import engine_bp
from manifesto.manifesto import manifesto_bp
from poems.poems import poems_bp

# Create Flask app
app = Flask(__name__)

# Register Blueprints
app.register_blueprint(home_bp)
app.register_blueprint(aphorisms_bp)
app.register_blueprint(engine_bp)
app.register_blueprint(manifesto_bp)
app.register_blueprint(poems_bp)

# Set Flask app configs from environment variables
# TODO: Make sure to make new variables for this site
app.env = os.environ.get('FLASK_ENV')
app.secret_key = os.environ.get('FLASK_SECRET_KEY')

# Run the app
if __name__ == '__main__':
    app.run()
