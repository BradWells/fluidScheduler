from flask.ext.wtf import Form
from wtforms import TextField, PasswordField
from wtforms.validators import Required

class LoginForm(Form):
	username = TextField('Username', validators=[Required()])
	password = PasswordField('Password', validators=[Required()])

class RegisterForm(Form):
	email = TextField('Email', validators=[Required()])
	username = TextField('Username', validators=[Required()])
	password = PasswordField('Password', validators=[Required()])
	confirm_password = PasswordField('Confirm Password', validators=[Required()])

class ForgotForm(Form):
	email = TextField('Email', validators=[Required()])

class SettingsForm(Form):
	email = TextField('Email', validators=[])
	username = TextField('Username', validators=[])
	password = PasswordField('Password', validators=[])
	old_password = PasswordField('Old Password', validators=[Required()])
