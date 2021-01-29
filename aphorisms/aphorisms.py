from flask import (Blueprint,
                   render_template)
from markupsafe import Markup
import json
import os
                   
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
    path_to_aphos = os.getcwd() + "/aphorisms/apho_list.json"
    f = open(path_to_aphos)
    a_json = f.read()
    f.close()
    # Load json into a string variable
    aphos = json.loads(a_json)
    return render_template('aphorisms.html', aphos=aphos)