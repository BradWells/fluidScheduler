from flask import render_template, redirect, url_for, g, request, flash, get_flashed_messages
from app import app
from forms import LoginForm, RegisterForm, ForgotForm, SettingsForm
from models import User
from flask.ext.login import login_user, logout_user, current_user, login_required

@app.route('/')
@app.route('/index')
def index():
	return redirect(url_for('login'))

@app.before_request
def before_request():
	g.user = current_user

@app.route('/login', methods=['GET', 'POST'])
def login():
	login_form = LoginForm(prefix="login")
	register_form = RegisterForm(prefix="register")
	if login_form.validate_on_submit():
		print "boop"
		return redirect(url_for('workspace'))
	if register_form.validate_on_submit():
		print "yoloswag"
		return redirect(url_for('workspace'))
	return render_template(
		'index.html', 
		message_box=get_message_box([login_form, register_form]),
		title="Login", 
		login_form=login_form, 
		register_form=register_form)

@app.route('/logout')
def logout():
	return redirect(url_for('login'))

@app.route('/workspace')
def workspace():
	return render_template(
		'workspace.html', 
		title="Workspace")

@app.route('/event')
def event():
	return render_template('event.html')

@app.route('/forgot')
def forgot():
	forgot_form = ForgotForm()
	return render_template(
		'forgot.html', 
		title="Forgot Password", 
		forgot_form=forgot_form)

@app.route('/settings')
def settings():
	settings_form = SettingsForm()
	return render_template(
		'settings.html', 
		title="Account Settings", 
		settings_form=settings_form)

def get_message_box(forms):
	flashed_messages = get_flashed_messages()
	if flashed_messages:
		return '<div class="box_spacer"></div>                                           \
			<div class="message_box">                                                    \
				<a href="javascript:;" class="cancel_message_button">x</a>               \
				<span class="message">%s</span>                                          \
			</div>' % flashed_message[0]
	else:
		for form in forms:
			print form
			for field in form.errors:
				print form.errors[field]
				if form.errors[field]:
					return '<div class="box_spacer"></div>                               \
						<div class="message_box error_box">                              \
							<a href="javascript:;" class="cancel_message_button error_text">x</a> \
							<span class="message error_text">%s</span>                   \
						</div>' % form.errors[field][0]
	return ""
