from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Halo, Server Smart Pest Trap AIoT sudah menyala!"

if __name__ == '__main__':
    app.run(debug=True)