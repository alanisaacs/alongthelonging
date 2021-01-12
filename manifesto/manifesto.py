from flask import (Blueprint,
                   render_template)

manifesto_bp = Blueprint(
    'manifesto_bp', __name__,
    static_folder='static',
    template_folder='templates'
    )

# Display manifesto page
@manifesto_bp.route('/manifesto')
def showManifesto():
    """Display manifesto page"""
    return render_template('manifesto.html')
