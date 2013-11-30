from app import app, db, lm, mail
from config import ADMINS
from decorators import async
from flask import flash, g, get_flashed_messages, redirect, render_template, request, url_for
from flask.ext.login import current_user, login_required, login_user, logout_user
from flask.ext.mail import Message
from forms import ForgotForm, LoginForm, RegisterForm, SettingsForm
from models import User
from threading import Thread

@app.route('/')
@app.route('/index')
def index():
	return redirect(url_for('login'))

@app.before_request
def before_request():
	g.user = current_user

@lm.user_loader
def load_user(id):
	return User.query.get(int(id))

@app.route('/login', methods=['GET', 'POST'])
def login():
	message_box = ""
	login_form = LoginForm(prefix="login")
	register_form = RegisterForm(prefix="register")

	#Only validate forms if the user pressed one of the submit buttons
	if 'submit_button' in request.form:
		if request.form['submit_button'] == 'Login':
			if login_form.validate_on_submit():
				user = User.query.filter_by(username = request.form['login-username'].strip()).first()
				if user == None or user.password != request.form['login-password'].strip():
					message_box = message_box_html('Username / Password combination is invalid.', error=True)
				else:
					login_user(user)
					return redirect(url_for('workspace'))
			else:
				message_box = get_form_error(login_form)
		elif request.form['submit_button'] == 'Register':
			if register_form.validate_on_submit():
				if User.query.filter_by(username = request.form['register-username'].strip()).first() != None:
					message_box = message_box_html('Username already in use.', error=True)
				elif User.query.filter_by(email = request.form['register-email'].strip()).first():
					message_box = message_box_html('Email address already in use.', error=True)
				else:
					new_user = User()
					new_user.username = request.form['register-username'].strip()
					new_user.password = request.form['register-password'].strip()
					new_user.email = request.form['register-email'].strip()
					db.session.add(new_user)
					db.session.commit()
					message_box = message_box_html('Your account has been created.')
			else:	#Set error message to the first validation error.
				message_box = get_form_error(register_form)
	
	return render_template('login.html', login_form=login_form, register_form=register_form, message_box=message_box)

@app.route('/logout')
def logout():
	logout_user()
	return redirect(url_for('login'))

@app.route('/settings', methods=['GET', 'POST'])
@login_required
def settings():
	message_box = ""
	settings_form = SettingsForm()

	#Only validate forms if the user pressed the submit button
	if 'submit_button' in request.form and request.form['submit_button'] == 'Update':
		if settings_form.validate_on_submit():
			if request.form['old_password'].strip() != current_user.password:
				message_box = message_box_html('The old password provided is incorrect.', error=True)
			else:
				current_user.email = request.form['email'].strip()
				current_user.username = request.form['username'].strip()
				current_user.password = request.form['password'].strip()
				db.session.commit()
				message_box = message_box_html('Your account settings have been changed.')
		else:	#Set error message to the first validation error.
			message_box = get_form_error(settings_form)

	return render_template('settings.html', settings_form=settings_form, message_box=message_box)

@async
def send_async_email(msg):
	with app.app_context():
		mail.send(msg)

@app.route('/forgot', methods=['GET', 'POST'])
def forgot():
	message_box = ""
	forgot_form = ForgotForm()

	#Only validate forms if the user pressed the submit button
	if 'submit_button' in request.form and request.form['submit_button'].strip() == 'Send Email':
		if forgot_form.validate_on_submit():
			user = User.query.filter_by(email = request.form['email'].strip()).first()
			if user == None:
				message_box = message_box_html('The provided email address is not associated with an account.', error=True)
			else:
				msg = Message("Your password for ISU Event Planner", sender=ADMINS[0], recipients=[user.email])
				msg.body = "Your password for ISU Event Planner is: " + user.password
				msg.html = "<html>Your password for ISU Event Planner is: " + user.password + "</html>"
				send_async_email(msg)
				message_box = message_box_html('Password reminder sent.')
		else:	#Set error message to the first validation error.
			message_box = get_form_error(forgot_form)

	return render_template('forgot.html', forgot_form=forgot_form, message_box=message_box)

@app.route('/workspace')
@login_required
def workspace():
	return render_template('workspace.html', public_events=[], attending_events=[], created_events=[], created_contacts=[])

@app.route('/event')
@login_required
def event():
	return render_template('event.html')




def get_form_error(form):
	for field in form.errors:
		if form.errors[field]:
			return message_box_html(form.errors[field][0], error=True)

def message_box_html(message, error=False):
	span = ""
	if error:
		error_text = " error_text"
		error_box = " error_box"
	else:
		error_text = ""
		error_box = ""
	if type(message) is list:
		for m in message:
			span += '<span class="message%s">%s</span>' % (error_text, m)
	else:
		span = '<span class="message%s">%s</span>' % (error_text, message)

	return '<div class="box_spacer"></div>                                     \
	<div class="message_box%s">                                                \
	    <a href="javascript:;" class="cancel_message_button%s">x</a>           \
		%s                                                                     \
	</div>' % (error_box, error_text, span)
