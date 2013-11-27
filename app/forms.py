from flask.ext.wtf import Form
from wtforms import TextField, PasswordField
from wtforms.validators import Required

class LoginForm(Form):
	username = TextField('Username', validators = [Required()])
	password = PasswordField('Password', validators = [Required()])

class RegisterForm(Form):
	email = TextField('Email', validators = [Required()])
	username = TextField('Username', validators = [Required()])
	password = PasswordField('Password', validators = [Required()])
	confirmpassword = PasswordField('Confirm Password', validators = [Required()])
