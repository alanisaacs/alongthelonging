from flask import (Blueprint,
                   render_template)
from markupsafe import Markup
import json
                   
aphorisms_bp = Blueprint(
    'aphorisms_bp', __name__,
    static_folder='static',
    template_folder='templates'
    )

# Display aphorisms page
@aphorisms_bp.route('/aphorisms')
def showAphorisms():
    """Display aphorisms page"""
    # Get pointer to exiting file in read mode
    # TODO: put file path in config so works everywhere
    f = open("/home/whitman/atl/aphorisms/apho_list.json")
    a_json = f.read()
    f.close()
    # Load json into a string variable
    aphos = json.loads(a_json)
    return render_template('aphorisms.html', aphos=aphos)