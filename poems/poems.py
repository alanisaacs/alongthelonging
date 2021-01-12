from flask import (Blueprint,
                   render_template)

poems_bp = Blueprint(
    'poems_bp', __name__,
    static_folder='static',
    template_folder='templates'
    )

# Display poems page
@poems_bp.route('/poems')
def showPoems():
    """Display poems page"""
    return render_template('poems.html')

# Display den of quills page
@poems_bp.route('/poems/den_of_quills')
def showDenOfQuills():
    """Display den of quills page"""
    return render_template('den_of_quills.html')
