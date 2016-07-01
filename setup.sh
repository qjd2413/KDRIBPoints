#!/bin/bash

echo "Initial setup for the KDRIB Points Site"
echo "---------------------------------------"

# google config
google() {
  echo "--------Setting up Google OAuth--------"
  echo "Enter Client ID:"
  read -r CLIENTID
  CLIENTID=$(echo $CLIENTID | sed 's/\\/\\\\/g')
  echo "Enter Client Secret:"
  read -r CLIENTSEC
  CLIENTSEC=$(echo $CLIENTSEC | sed 's/\\/\\\\/g')

  GOOGLE="var external_config = require('./config');\nvar config = {"
  GOOGLE="$GOOGLE\n\tclient_id: '$CLIENTID',\n\tclient_secret: '$CLIENTSEC'"
  GOOGLE="$GOOGLE\n\tcallback: external_config.uri + '/user/google_callback'\n};"
  GOOGLE="$GOOGLE\nmodule.exports = config;"
  echo -e $GOOGLE > config/google_config.js
}

if [ ! -f "config/google_config.js" ]; then
  google
else 
  echo "ERR: google_config already exists. Do you want to overwrite it? (yN)"
  read -n1 CONF
  echo
  if [ "$CONF" == "y" ] || [ "$CONF" == "Y" ]; then
    google
  fi
fi

# session config
session() {
  echo "-------Setting up Session Config-------"
  echo "Enter Session Secret:"
  read -r SESSIONSEC
  SESSIONSEC=$(echo $SESSIONSEC | sed 's/\\/\\\\/g')

  SESSION="var config = {\n\tsecret: '$SESSIONSEC'\n};\nmodule.exports = config;"
  echo -e $SESSION > config/session_config.js
}

if [ ! -f "config/session_config.js" ]; then
  session
else
  echo "ERR: session_config already exists. Do you want to overwrite it? (yN)"
  read -n1 CONF
  echo
  if [ "$CONF" == "y" ] || [ "$CONF" == "Y" ]; then
    session
  fi
fi

# mysql config/init
mysql() {
  echo "--------Setting up MySQL Config--------"
  echo "You can either create a new user, or use root"
  echo "(this will not create a user for you)"
  echo "Enter username:"
  read -r MYSQLUSER
  MYSQLUSER=$(echo $MYSQLUSER | sed 's/\\/\\\\/g')
  echo "Enter password:"
  read -r MYSQLPASS
  MYSQLPASS=$(echo $MYSQLPASS | sed 's/\\/\\\\/g')

  MYSQL="var config= {\n\tdatabase: 'kdrpoints',\n\tuser: '$MYSQLUSER',"
  MYSQL="$MYSQL\n\tpass: '$MYSQLPASS'\n};\nmodule.exports = config;"
  echo -e MYSQL > config/mysql_config.js

  echo "------Initializing MySQL Database------"
  echo "CREATE DATABASE kdrpoints; exit;" | mysql -u $MYSQLUSER -p$MYSQLPASS
}

if [ ! -f "config/mysql_config.js" ]; then
  mysql
else
  echo "ERR: mysql_config already exists. Do you want to overwrite it? (yN)"
  read -n1 CONF
  echo
  if [ "$CONF" == "y" ] || [ "$CONF" == "Y" ]; then
    mysql
  fi
fi

# npm install
echo "------Installing NPM Dependencies------"
npm install

# bower install
echo "-----Installing Bower Dependencies-----"
bower install

# install gulp globally
echo "--------Installing Gulp Globally-------"
echo "If you have to sudo this, something's wrong"
npm install -g gulp


