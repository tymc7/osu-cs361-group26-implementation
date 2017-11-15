// copy this to your config file
// connect to phpmyadmin: https://tools.engr.oregonstate.edu/phpMyAdmin/index.php
// With your VPN connected, use below user/password to login
// Server choice: classmysql
// New table names should start with a_, like a_patients, so they are on the top of the list
// and distinguishable with the tables I used in cs340
module.exports = {
    host: 'classmysql.engr.oregonstate.edu',
    database: 'cs340_duz',
    user: 'cs340_duz',
    password: '6987',
    connectionLimit: 10
};
