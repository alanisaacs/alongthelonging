from flask import (Blueprint,
                   render_template)

engine_bp = Blueprint(
    'engine_bp', __name__,
    static_folder='static',
    template_folder='templates'
    )

# Display engine page
@engine_bp.route('/engine')
def showEngine():
    """Display engine page"""
    return render_template('engine.html')

# Display aphidism page
@engine_bp.route('/engine/aphidism')
def showAphidism():
    """Display aphidism page"""
    return render_template('aphidism.html')

# Display gib page
@engine_bp.route('/engine/gib')
def showGib():
    """Display gib page"""
    return render_template('cut_your_gibberish.html')