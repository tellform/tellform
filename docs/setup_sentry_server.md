#Installing Sentry Server

### Before You Begin
Make sure you understand what sentry server does. You can view documentation for sentry server [here](https://sentry.readthedocs.org/). This document was written for a server running *Ubuntu 14.04 LTS server* (we used Azure).


### Prerequisites
Make sure you have these installed:
* apt-get
* python2.7
* vim



### Installation Steps
1. Add non-root user. 
	```
	sudo adduser sentry
	sudo adduser sentry sudo
	```

2. Update all apt-get packages
	```
	sudo apt-get update
	sudo apt-get dist-upgrade
	sudo apt-get autoremove
	sudo apt-get install libxml2-dev libxslt1-dev libffi-dev libpq-dev python-dev
	sudo reboot
	```

3. Install easy_install and pip
	```
	wget https://bootstrap.pypa.io/ez_setup.py -O - | sudo python
	sudo easy_install pip
	```

4. Install virtualenv and lmxl 
	```
	sudo pip install virtualenv
	sudo pip install lxml
	```

5. Install Sentry and Setup
	```
	# make server directory
	mkdir ~/SentryServer; cd ~/SentryServer;
	# make virtualenv
	virtualenv ./
	#activate virtualenv
	source ./bin/activate
	
	# install sentry and its postgresql dependencies
	pip install -U sentry[postgres]
	```

6. Install postgresql
	```
	# install postgres
	sudo apt-get install postgresql postgresql-contrib libpq-dev
	
	# install postgres adminpack
	sudo -u postgres psql
	CREATE EXTENSION "adminpack";
	\q
	```

7. Setup postgresql DB
	```
	# change postgres password & create database
	sudo passwd postgres
	sudo su - postgres
	psql -d template1 -c "ALTER USER postgres WITH PASSWORD 'changeme';"
	createdb sentry
	createuser sentry_user --pwprompt
	psql -d template1 -U postgres
	GRANT ALL PRIVILEGES ON DATABASE sentry to sentry_user;
	\q
	exit
	```

8. Setup Sentry Configuration
	```
	# initialize conf file
	sentry init
	
	#edit sentry configuration
	vim ~/.sentry/sentry.conf.py
	```

	The following are the contents of my sentry.conf.py file (replace name, user and password with your that of your DB)
	
	```
	DATABASES = {
	    'default': {
	        'ENGINE': 'django.db.backends.postgresql_psycopg2',
	        'NAME': 'sentry',
	        'USER': 'sentry_user',
	        'PASSWORD': 'your_password',
	        'HOST': 'localhost',
	    }
	}
	# No trailing slash!
	SENTRY_URL_PREFIX = 'http://sentry.example.com'
	
	SENTRY_WEB_HOST = '0.0.0.0'
	SENTRY_WEB_PORT = 9000
	SENTRY_WEB_OPTIONS = {
	    'workers': 3,  # the number of gunicorn workers
	    'secure_scheme_headers': {'X-FORWARDED-PROTO': 'https'},  # detect HTTPS mode from X-Forwarded-Proto header
	}
	
	#CONFIGURE REDIS
	SENTRY_REDIS_OPTIONS = {
	    'hosts': {
	        0: {
	            'host': '127.0.0.1',
	            'port': 6379,
	            'timeout': 3,
	            #'password': 'redis auth password'
	        }
	    }
	}
	
	#CONFIGURE OUTGOING MAIL
	EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' 
	EMAIL_USE_TLS = True 
	EMAIL_HOST = 'smtp.gmail.com' 
	EMAIL_PORT = 587 
	EMAIL_HOST_USER = 'your_gmail_username@gmail.com' 
	EMAIL_HOST_PASSWORD = 'your_gmail_password' 
	DEFAULT_FROM_EMAIL = 'testing@testing.com
	```

9. Setup Database and Start Sentry
	```
	#install and run redis-server
	wget http://download.redis.io/releases/redis-stable.tar.gz
	tar xzf redis-stable.tar.gz
	cd redis-stable
	make
	make test
	sudo make install
	cd utils
	sudo ./install_server.sh
	
	#Go back to app directory
	cd ~/SentryServer
	sudo service redis_6379 start
	
	# set up databse
	sentry upgrade
	
	# let's try it out!
	sentry start
	```

10. Install nginx

	```
	# install nginx
	sudo apt-get install nginx
	
	# remove the default symbolic link
	sudo rm /etc/nginx/sites-enabled/default
	
	# create a new blank config, and make a symlink to it
	sudo touch /etc/nginx/sites-available/sentry
	cd /etc/nginx/sites-enabled
	sudo ln -s ../sites-available/sentry
	
	# edit the nginx configuration file
	sudo vim /etc/nginx/sites-available/sentry
	```
	*Here are the contents of my nginx file:*
	```
	server {
	    # listen on port 80
	    listen 80;
	
	    # for requests to these domains
	    server_name yourdomain.com www.yourdomain.com;
	
	    # keep logs in these files
	    access_log /var/log/nginx/sentry.access.log;
	    error_log /var/log/nginx/sentry.error.log;
	
	    # You need this to allow users to upload large files
	    # See http://wiki.nginx.org/HttpCoreModule#client_max_body_size
	    # I'm not sure where it goes, so I put it in twice. It works.
	    client_max_body_size 0;
	
	    location / {
	        proxy_pass http://localhost:9000;
	        proxy_redirect off;
	
	        proxy_read_timeout 5m;
	
	        # make sure these HTTP headers are set properly
	        proxy_set_header Host            $host;
	        proxy_set_header X-Real-IP       $remote_addr;
	        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	    }
	}
	```

11. Start the worker processes
	```
	# restart nginx
	sudo nginx -t
	sudo service nginx reload
	
	#start sentry
	sentry celery worker -B
	```

12. Install and Configure supervisord
	```
	pip install supervisord
	sudo echo_supervisord_conf > ~/SentryServer/etc/supervisord.conf
	
	#Edit yuour supervisord Config
	vim /etc/supervisord.conf
	```

	Configuration file should look like this
	```
	[program:sentry-web]
	directory=~/SentryServer/
	command=~/SentryServer/bin/sentry start
	autostart=true
	autorestart=true
	redirect_stderr=true
	stdout_logfile=syslog
	stderr_logfile=syslog
	
	[program:sentry-worker]
	directory=~/SentryServer/
	command=~/SentryServer/bin/sentry celery worker -B
	autostart=true
	autorestart=true
	redirect_stderr=true
	stdout_logfile=syslog
	stderr_logfile=syslog
	```

13. Run Server (with supervisord) 
	```
	supervisord
	```
