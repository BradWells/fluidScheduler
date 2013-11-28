from app import app, db, lm
from flask import flash, g, get_flashed_messages, redirect, render_template, request, url_for
from flask.ext.login import current_user, login_required, login_user, logout_user
from forms import ForgotForm, LoginForm, RegisterForm, SettingsForm
from models import User

@app.route('/')
@app.route('/index')
def index():
	return redirect(url_for('login'))

@app.before_request
def before_request():
	g.user = current_user

@app.route('/login', methods=['GET', 'POST'])
def login():
	message_box = ""
	login_form = LoginForm(prefix="login")
	register_form = RegisterForm(prefix="register")
	if login_form.validate_on_submit():
		user = User.query.filter_by(username = request.form['login-username']).first()
		if user == None or user.password != request.form['login-password']:
			message_box = message_box_html("Bad credentials.", error=True)
		else:
			login_user(user)
			return redirect(url_for('workspace'))
	if register_form.validate_on_submit():
		user = User.query.filter_by(username = request.form['username']).first()
		if user != None:
			message_box = message_box_html("Credentials are not available.", error=True)
		else:
			new_user = User()
			new_user.username = request.form['register-username']
			new_user.password = request.form['register-password']
			new_user.email = request.form['register-email']
			db.session.add(new_user)
			db.session.commit()
			message_box = message_box_html("Account successfully created.")
	if not message_box:
		message_box = get_message_box([login_form, register_form])
	clear_errors([login_form, register_form])
	return render_template(
		'login.html', 
		message_box=message_box,
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

@app.route('/forgot', methods=['GET', 'POST'])
def forgot():
	forgot_form = ForgotForm()
	if forgot_form.validate_on_submit():
		print "herpderp"
		return redirect(url_for('login'))
	message_box = get_message_box([forgot_form])
	clear_errors([forgot_form])
	return render_template(
		'forgot.html', 
		message_box=message_box,
		title="Forgot Password", 
		forgot_form=forgot_form)

@app.route('/settings', methods=['GET', 'POST'])
def settings():
	settings_form = SettingsForm()
	if settings_form.validate_on_submit():
		print "herpderp"
		return redirect(url_for('workspace'))
	message_box = get_message_box([settings_form])
	clear_errors([settings_form])
	return render_template(
		'settings.html', 
		message_box=message_box,
		title="Account Settings", 
		settings_form=settings_form)

def get_message_box(forms):
	flashed_messages = get_flashed_messages()
	if flashed_messages:
		return message_box_html(flashed_message[0])
	else:
		err = ""
		for form in forms:
		# 	err += str(form.errors)	
		# return message_box_html(err, error=True)
			for field in form.errors:
				if form.errors[field]:
					return message_box_html(form.errors[field], error=True)
	return ""

def message_box_html(message, error=False):
	span = ""
	if error:
		if type(message) is list:
			for m in message:
				span += '<span class="message error_text">%s</span>' % m
		else:
			span = '<span class="message error_text">%s</span>' % message
	else:
		if type(message) is list:
			for m in message:
				span += '<span class="message">%s</span>' % m
		else:
			span = '<span class="message">%s</span>' % message


	if error:
		return '<div class="box_spacer"></div>                                 \
		<div class="message_box error_box">                                    \
		<a href="javascript:;" class="cancel_message_button error_text">x</a>  \
			%s                                                                 \
		</div>' % span
	else:
		return '<div class="box_spacer"></div>                                 \
		<div class="message_box">                                              \
		<a href="javascript:;" class="cancel_message_button">x</a>             \
			%s                                                                 \
		</div>' % span

def clear_errors(forms):
	for form in forms:
		for field in form.errors:
			form.errors[field] = None
