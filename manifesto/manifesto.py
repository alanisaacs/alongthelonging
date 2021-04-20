from flask import (Blueprint,
                   render_template)

from sqlalchemy import (asc,
                        desc)

from models import (Mani,
                    open_db_session)                        

manifesto_bp = Blueprint(
    'manifesto_bp', __name__,
    static_folder='static',
    template_folder='templates'
    )

# Display manifesto page
@manifesto_bp.route('/manifesto')
def showManifesto():
    """Display manifesto page"""
    DBSession = open_db_session()
    manis = DBSession.query(Mani).all()
    DBSession.close()
    return render_template('manifesto.html', manis=manis)

