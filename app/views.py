from flask import render_template, redirect, url_for, g, request
from app import app
from forms import LoginForm, RegisterForm
from models import User
from flask.ext.login import login_user, logout_user, current_user, login_required

@app.route('/')
@app.route('/index')
def index():	
	loginform = LoginForm()
	registerform = RegisterForm()
	return render_template('index.html', loginform = loginform, registerform = registerform)

@app.before_request
def before_request():
	g.user = current_user

@app.route('/login', methods=['GET','POST'])
def login():
	return request.form['username']
