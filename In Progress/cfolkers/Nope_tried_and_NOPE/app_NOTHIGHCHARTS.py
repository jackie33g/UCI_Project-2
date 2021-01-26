from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/Chocolate_DB"
db = SQLAlchemy(app)

# https://stackabuse.com/using-sqlalchemy-with-flask-and-postgresql/ 
class dependency(db.Model):
    __tablename__ = 'dependency_num'
    id_num = db.Column(db.Integer, primary_key=True)
    company_location = db.Column(db.String())
    country_of_bean_origin = db.Column(db.String())
    sum_num = db.Column(db.Integer)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/dependency_chart', methods = ['GET'])
def retrieve():
    information = dependency.query.all()
    results = [
        {
            "origin": info.country_of_bean_origin,
            "destination": info.company_location,
            "count": info.sum_num

        } for info in information]
    return {"results": results} # ----> puts resutls in json in flask
 
    
if __name__ == '__main__':
    app.run(debug=True)