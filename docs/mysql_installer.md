# MySql Installation

So you want to connect to a MySql server, eh? Follow these steps and you should
be up and running in no time.

1. Go [here](http://dev.mysql.com/doc/refman/5.7/en/installing.html) and follow
   the instructions for installing MySql server for whichever operating system
you're on. Feel free to install whatever extra tools meet your fancy. (We're
using version 5.7.13)

2. Add mysql to your path. The documentation should tell you where it installs
   to, but take a look at `/usr/local/mysql-x-x-x/bin` if you're having trouble.

3. Start running mysql server by running the command `mysql`.

4. Run `mysql -u root -h localhost -p` and at the password prompt enter the
   password that the installer should have given you on installation.

5. Then, run `ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassword';` to
   change the root password.

6. Create the database by running `create database kdrpoints`
