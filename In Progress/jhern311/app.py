from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from flask_migrate import Migrate
# from flask import Flask, jsonify

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/Chocolate_DB"
db = SQLAlchemy(app)

# https://stackabuse.com/using-sqlalchemy-with-flask-and-postgresql/ 
class donut(db.Model):
    __tablename__ = 'donut_top10'
    id_num = db.Column(db.Integer, primary_key=True)
    company_location = db.Column(db.String())
    cocoa_percent = db.Column(db.Integer())
    rating = db.Column(db.Float)

@app.route('/')
def index():
    # return {"hello": "world"}
    webpage = render_template("index.html")
    return webpage


@app.route('/donut_top10', methods = ['GET'])
# @cross_origin(origin='localhost', headers=['Content - Type', 'Authorization'])
def retrieve():
    information = donut.query.all()
    results = [
        {
            "ID": info.id_num,
            "company_location": info.company_location,
            "cocoa_percent": info.cocoa_percent,
            "rating" : info.rating
        } for info in information]
    # results.headers.add('Access-Control-Allow-Origin', '*')
    return {"results": results} # ----> puts resutls in json in flask
    # return render_template('index.html', results=results)
    # https://stackoverflow.com/questions/42499535/passing-a-json-object-from-flask-to-javascript
    
    
if __name__ == '__main__':
    app.run(debug=True)