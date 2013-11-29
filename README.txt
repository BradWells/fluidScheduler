
**SETUP INSTRUCTIONS**

	These instructions are for setting up the server locally using the command line.


	Some of these instructions will require administrative access.  On windows, the console must be started with administrative privilages.  On osx/linux, the command must be prefixed by 'sudo'.


	First Time Setup
		1. Install the latest version of Python.
			http://www.python.org/getit/

		2. Install the latest version of pip.
			http://www.pip-installer.org/en/latest/installing.html

		3. Install virtual environments using pip.
			OSX / LINUX
				pip install virtualenv
			WINDOWS
				pip install virtualenv

		4. Create your virtual environment in some dirrectory which you will remember.  These instructions will use the name "cs319" for your virtual environment and store it in "~/virtualenvs".
			OSX / LINUX
				cd ~
				mkdir virtualenvs
				cd virtualenvs
				virtualenv cs319
			WIDNOWS
				cd ~
				mkdir virtualenvs
				cd virtualenvs
				virtualenv cs319


	Preparing to Start the Server
		5. Navigate to your virtual environments directory (where you created the virtual environment) and activate it.  To deactivate it, you can just use the "deactivate" command, although you should not run the server without your virtual environment activated.
			OSX / LINUX
				cd ~/virtualenvs
				source cs319/bin/activate
			WINDOWS
				cd ~\virtualenvs
				cs319\bin\activate

		6. Navigate to your local project.  
			OSX / LINUX
				cd <project_path>
			WINDOWS
				cd <project_path>

		7. Update your python packages
			OSX / LINUX
				pip install -r requirements.txt
			WINDOWS
				pip install -r requirements.txt


	Running the Server
		8. (optional) Reset the server databases.
			OSX / LINUX
				source clean.sh
			WINDOWS
				bash clean.bash

		9. Start the server.
			OSX / LINUX
				python run.py
			WINDOWS
				python run.py

		10. Open the page in your web browser.
			127.0.0.1:5000