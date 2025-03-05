# python.exe -m venv .venv
# cd .venv/Scripts
# activate.bat
# py -m ensurepip --upgrade
# pip install -r requirements.txt

from flask import Flask

from flask import render_template
from flask import request
from flask import jsonify, make_response

import mysql.connector

import datetime
import pytz

from flask_cors import CORS, cross_origin

con = mysql.connector.connect(
    host="185.232.14.52",
    database="u760464709_23005353_bd",
    user="u760464709_23005353_usr",
    password="O0h=DgE/"
)

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    if not con.is_connected():
        con.reconnect()

    con.close()

    return render_template("index.html")

@app.route("/app")
def app2():
    if not con.is_connected():
        con.reconnect()

    con.close()

    return "<h5>Hola, soy la view app</h5>";

@app.route("/postres")
def postres():
    if not con.is_connected():
        con.reconnect()

    cursor = con.cursor(dictionary=True)
    sql    = """
    SELECT *

    FROM postres

    LIMIT 10 
    """

    cursor.execute(sql)
    registros = cursor.fetchall()

    return render_template("postres.html", postres=registros)

@app.route("/ingredientes")
def ingredientes():
    if not con.is_connected():
        con.reconnect()

    cursor = con.cursor(dictionary=True)
    sql    = """
    SELECT idIngrediente,
           nombreIngrediente,
           existencias

    FROM ingredientes

    LIMIT 10 OFFSET 0
    """

    cursor.execute(sql)
    registros = cursor.fetchall()

    return render_template("ingredientes.html", ingredientes=registros)

@app.route("/postresingredientes")
def postresingredientes():
    if not con.is_connected():
        con.reconnect()

    cursor = con.cursor(dictionary=True)
    sql    = """
    SELECT postresingredientes.*, postres.nombrePostre, ingredientes.nombreIngrediente 
    FROM postresingredientes
    INNER JOIN postres ON postres.idPostre = postresingredientes.idPostre
    INNER JOIN ingredientes ON ingredientes.idIngrediente = postresingredientes.idIngrediente

    LIMIT 10 OFFSET 0
    """

    cursor.execute(sql)
    registros = cursor.fetchall()

    return render_template("postresingredientes.html", postresingredientes=registros)
