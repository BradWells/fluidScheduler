from flask import render_template, redirect, url_for, g, request
from app import app
from forms import LoginForm, RegisterForm, ForgotForm, SettingsForm
from models import User
from flask.ext.login import login_user, logout_user, current_user, login_required

@app.route('/')
@app.route('/index')
def index():	
	login_form = LoginForm()
	register_form = RegisterForm()
	return render_template('index.html', title="Login", login_form=login_form, register_form=register_form)

@app.before_request
def before_request():
	g.user = current_user

@app.route('/login', methods=['GET','POST'])
def login():
	return redirect(url_for('workspace'))

@app.route('/logout')
def logout():
	return redirect(url_for('index'))

@app.route('/workspace')
def workspace():
	return render_template('workspace.html', title="Workspace")

@app.route('/event')
def event():
	return render_template('event.html')

@app.route('/forgot')
def forgot():
	forgot_form = ForgotForm()
	return render_template('forgot.html', title="Forgot Password", forgot_form=forgot_form)

@app.route('/settings')
def settings():
	settings_form = SettingsForm()
	return render_template('settings.html', title="Account Settings", settings_form=settings_form)