from flask import (Blueprint,
                   render_template,
                   request)

from sqlalchemy import (asc,
                        desc)

from models import (Mani,
                    open_db_session)                        

manifesto_bp = Blueprint(
    'manifesto_bp', __name__,
    static_folder='static',
    template_folder='templates'
    )

@manifesto_bp.route('/manifesto')
def show_manifesto():
    """Display manifesto page"""
    DBSession = open_db_session()
    manis = DBSession.query(Mani).order_by('id').all()
    DBSession.close()
    return render_template('manifesto.html', manis=manis)

@manifesto_bp.route('/saveEdits', methods=['POST'])
def save_edits():
    """Save user edits in the database"""
    new_data = request.json
    print("new_data: ", new_data)
    mani_id = new_data['id']
    col_head = new_data['colName']
    new_text = new_data['newText']
    DBSession = open_db_session()
    record_to_update = DBSession.query(Mani).\
        get(mani_id)
    setattr(record_to_update, col_head, new_text)
    DBSession.commit()
    DBSession.close()
    return {'status': 'ok'}


