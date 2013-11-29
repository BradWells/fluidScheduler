from flask.ext.wtf import Form
from wtforms import TextField, PasswordField
from wtforms.validators import Email, EqualTo, Length, Required

class LoginForm(Form):
	username = TextField('Username', 
		validators=[Required(message=u"The 'Username' field is required.")])
	password = PasswordField('Password', 
		validators=[Required(message=u"The 'Password' field is required.")])
	
class RegisterForm(Form):
	email = TextField('Email', 
		validators=[Required(message=u"The 'Email' field is required."), 
		            Email(message=u'A valid email address must be provided.'), 
		            Length(max=128, message=u'An email address can contain no more than 128 characters.')])
	username = TextField('Username', 
		validators=[Required(message=u"The 'Username' field is required."), 
		            Length(min=6, max=64, message=u'Usernames must be 6 to 64 characters long.')])
	password = PasswordField('Password', 
		validators=[Required(message=u"The 'Password' field is required."), 
		            Length(min=6, max=64, message=u'Passwords must be 6 to 64 characters long.'), 
		            EqualTo('confirm_password', message=u'The passwords provided do not match.')])
	confirm_password = PasswordField('Confirm Password', 
		validators=[Required(message=u"The 'Confirm Password' field is required.")])

class ForgotForm(Form):
	email = TextField('Email', 
		validators=[Required(message=u"The 'Email' field is required."), 
		            Email(message=u'A valid email address must be provided.')])

class SettingsForm(Form):
	email = TextField('Email', 
		validators=[Required(message=u"The 'Email' field is required."), 
		Email(message=u'A valid email address must be provided.'), 
		Length(max=128, message=u'An email address can contain no more than 128 characters.')])
	username = TextField('Username', 
		validators=[Required(message=u"The 'Username' field is required."), 
		Length(min=6, max=64, message=u'Usernames must be 6 to 64 characters long.')])
	password = PasswordField('Password', 
		validators=[Required(message=u"The 'Password' field is required."), 
		Length(min=6, max=64, message=u'Passwords must be 6 to 64 characters long.'), 
		EqualTo('confirm_password', message=u'The passwords provided do not match.')])
	confirm_password = PasswordField('Confirm Password', 
		validators=[Required(message=u"The 'Confirm' password field is required.")])
	old_password = PasswordField('Old Password', 
		validators=[Required(message=u'Your current password must be provided to make the desired account changes.')])
