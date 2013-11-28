from flask.ext.wtf import Form
from wtforms import TextField, PasswordField
from wtforms.validators import Required, AnyOf, NumberRange, EqualTo, Email

alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'

class LoginForm(Form):
	username = TextField(
		'Username',
		validators=[Required()])
	password = PasswordField(
		'Password',
		validators=[Required()])

class RegisterForm(Form):
	email = TextField(
		'Email',
		validators=[Required(), 
		            Email()])
	username = TextField(
		'Username',
		validators=[Required(), 
		            AnyOf(values=alphanumeric), 
		            NumberRange(min=5, max=64)])
	password = PasswordField(
		'Password',
		validators=[Required(),
		            AnyOf(values=alphanumeric), 
		            NumberRange(min=7, max=64), 
		            EqualTo(fieldname='password')])
	confirm_password = PasswordField(
		'Confirm Password',
		validators=[Required(), 
		            AnyOf(values=alphanumeric), 
		            NumberRange(min=7, max=64)])

class ForgotForm(Form):
	email = TextField(
		'Email', 
		validators=[Required()])

class SettingsForm(Form):
	email = TextField(
		'Email', 
		validators=[])
	username = TextField(
		'Username', 
		validators=[AnyOf(values=alphanumeric), 
		            NumberRange(min=5, max=64)])
	password = PasswordField(
		'Password', 
		validators=[AnyOf(values=alphanumeric), 
		            NumberRange(min=7, max=64), 
		            EqualTo(fieldname='password')])
	confirm_password = PasswordField(
		'Confirm Password',
		validators=[Required(), 
		            AnyOf(values=alphanumeric), 
		            NumberRange(min=7, max=64)])
	old_password = PasswordField(
		'Old Password', 
		validators=[Required()])
