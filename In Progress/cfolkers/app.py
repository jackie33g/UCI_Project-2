from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask import Flask, jsonify

app = Flask(__name__)



app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/Chocolate_DB"
db = SQLAlchemy(app)

class dependency(db.Model):
    __tablename__ = 'dependency_chart'
    ID = db.Column(db.Integer, primary_key=True)
    company_location = db.Column(db.String())
    country_of_bean_origin = db.Column(db.String())

@app.route('/')
def index():
    return {"hello": "world"}


@app.route('/info', methods = ['GET'])
def retrieve():
    information = dependency.query.all()
    results = [
        {
            "ID": info.ID,
            "company_location": info.company_location,
            "country_of_bean_origin": info.country_of_bean_origin
        } for info in information]
    return {"results": results}

    
if __name__ == '__main__':
    app.run(debug=True)