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
    # WWW_PATH is an env var to the folder containing all sites
    path_to_aphos = os.getenv('WWW_PATH') + \
        "atl/aphorisms/apho_list.json"
    f = open(path_to_aphos)
    # Read json file into a string
    aphos_json = f.read()
    f.close()
    # Load json into a dictionary
    # Format is {'aphorisms': [{'id': 1, ...}, {'id': 2, ..}, ...]}
    aphos_dict = json.loads(aphos_json)

    # Sort the list by id
    # Pull out the original list of dictionaries (unsorted)
    a_list_orig = aphos_dict['aphorisms']
    # Pull out the id's of each dictionary into a list
    ids = []
    for a in a_list_orig:
        ids.append(a['id'])
    # Sort the list of id's
    ids.sort()
    # Create a list of dictionaries to be sorted by id
    a_list_sorted = []
    # For each id in the sorted list
    for i in ids:
        # Page through the aphorism list
        for a in a_list_orig:
            # And when you hit the right id
            # Add its dictionary to the sorted list
            if i == a['id']:
                a_list_sorted.append(a)
                break

    # Replace the original list with the sorted one
    aphos_dict['aphorisms'] = a_list_sorted

    # Load json into a dictionary and pass to template
    #aphos = json.loads(a_json)
    return render_template('aphorisms.html', aphos=aphos_dict)
