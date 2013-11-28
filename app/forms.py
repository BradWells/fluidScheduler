from flask.ext.wtf import Form
from wtforms import TextField, PasswordField
from wtforms.validators import Required, AnyOf, NumberRange, EqualTo, Email

alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'

class LoginForm(Form):
	username = TextField(
		'Login Username',
		validators=[Required(message="Username field is required.")])
	password = PasswordField(
		'Login Password',
		validators=[Required(message="Password field is required.")])

class RegisterForm(Form):
	email = TextField(
		'Register Email',
		validators=[Required(message="Email field is required."), 
		            Email(message="Email must be in a valid email format.")])
	username = TextField(
		'Register Username',
		validators=[Required(message="Username field is required."), 
		            AnyOf(values=alphanumeric, message="Username can only contain alphanumeric characters and underscores."), 
		            NumberRange(min=5, max=64, message="Username must be between 5 and 64 characters.")])
	password = PasswordField(
		'Register Password',
		validators=[Required(message="Password field is required."),
		            AnyOf(values=alphanumeric, message="Password can only contain alphanumeric characters and underscores."), 
		            NumberRange(min=7, max=64, message="Password must be between 7 and 64 characters."), 
		            EqualTo(fieldname='password', message="Password and Confirm Password must match.")])
	confirm_password = PasswordField(
		'Register Confirm Password',
		validators=[])

class ForgotForm(Form):
	email = TextField(
		'Forgot Email', 
		validators=[Required(message="Email field is required."),
		            Email(message="Email must be in a valid email format.")])

class SettingsForm(Form):
	email = TextField(
		'Settings Email', 
		validators=[Required(message="Email field is required."),
		            Email(message="Email must be in a valid email format.")])
	username = TextField(
		'Settings Username', 
		validators=[Required(message="Username field is required."),
		            AnyOf(values=alphanumeric, message="Username can only contain alphanumeric characters and underscores."), 
		            NumberRange(min=5, max=64, message="Username must be between 5 and 64 characters.")])
	password = PasswordField(
		'Settings Password', 
		validators=[Required(message="Password field is required."),
		            AnyOf(values=alphanumeric, message="Password can only contain alphanumeric characters and underscores."), 
		            NumberRange(min=7, max=64, message="Password must be between 7 and 64 characters."), 
		            EqualTo(fieldname='password', message="Password and Confirm Password must match.")])
	confirm_password = PasswordField(
		'Settings Confirm Password',
		validators=[])
	old_password = PasswordField(
		'Settings Old Password', 
		validators=[Required(message="Old Password field is required.")])
