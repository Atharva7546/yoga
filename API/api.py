from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flexmoney'

mysql = MySQL(app)
CORS(app)

@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data) 
            name = data.get('name')
            email = data.get('email')
            phone = data.get('phone')
            gender = data.get('gender')
            dob = data.get('dob')

            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO userdetails (name, email, phone, gender, dob) VALUES (%s, %s, %s, %s, %s)", (name, email, phone, gender, dob))
            mysql.connection.commit()
            cur.close()
            return jsonify({'message': 'Form data submitted successfully'}), 200

        except Exception as e:
            print(str(e))
            return jsonify({'error': 'Invalid JSON data'}), 400


@app.route('/get_user_id_by_name', methods=['POST'])
def get_user_id_by_name():
    if request.method == 'POST':
        data = request.get_json()
        name = data.get('name')

        cur = mysql.connection.cursor()
        cur.execute("SELECT id FROM userdetails WHERE name = %s", (name,))
        user_id = cur.fetchone()
        cur.close()

        if user_id:
            return jsonify({'user_id': user_id[0]}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

@app.route('/enroll_user', methods=['POST'])
def enroll_user():
    if request.method == 'POST':
        data = request.get_json()
        user_id = data.get('id')  # Fetch 'id' from the JSON data
        batch_timings = data.get('batch_timings')
        status = 'Active'

        if user_id is None or user_id == '':
            return jsonify({'error': 'User ID cannot be null or empty'}), 400

        cur = mysql.connection.cursor()
        try:
            cur.execute("INSERT INTO enrolled (id, batch_timings, status) VALUES (%s, %s, %s)", (user_id, batch_timings, status))
            mysql.connection.commit()
            cur.close()
            return jsonify({'message': 'User enrolled successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)
