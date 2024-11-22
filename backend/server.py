from flask import Flask, request, jsonify
from services import create_kmip_key, fetch_kmip_key, edit_kmip_key, delete_kmip_key

app = Flask(__name__)

@app.route('/create-key', methods=['POST'])
def create_key():
    try:
        key_name = request.json.get('key_name')
        key_type =  'AES'
        key_length = 256
        print(key_name, key_type, key_length)
        key_id = create_kmip_key(key_type, key_length, key_name)
        return jsonify({'message': 'Key created successfully', 'key_id': str(key_id)}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/key-details', methods=['POST'])
def fetch_key():
    try:
        key_id = request.json.get('key_id')
        key_details = fetch_kmip_key(key_id)
        print (type(key_details), key_details)
        
        return jsonify(key_details), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404


@app.route('/delete-key', methods=['POST'])
def delete_key():
    try:
        key_id = request.json.get('key_id')
        delete_kmip_key(key_id)
        
        return jsonify({'message': 'Key deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)