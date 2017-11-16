# OSU CS361 Group 26 - Implementation

### Setup
1. Clone the Repo
2. Run `npm install`
3. Create your `config.js` file (once a database is created, the temp variables will be included in the `config.template` file)
4. Run `npm start` and go to http://localhost:3612

### Database
1. The tables will auto generate in your SQL database configured in your `config.js` file
2. If you want to create another table, add a file to the `migrations` folder and follow the style of the other migrations

This application utilizes a SQL Query Builder called [Knex](http://knexjs.org/). It is a promise-based sql query builder that is highly extensible and easy to read. Please check out the docs if you have any questions.

### Develop
1. Clone the repo to your computer
2. Checkout a new branch (`git checkout -b [BRANCH]`)
3. Write some code
4. Push your branch (`git push origin [BRANCH]`)
5. On Github, setup a new Pull Request
    - If you go to the repo, the option should be available
6. Write a description of what it does and what's changed
7. Wait for people to approve or request changes
    - Make Changes if necessary and repush to the same branch on github
8. Once approved, feel free to merge to master!
9. Click on Delete branch and also delete branch locally (`git branch -d [BRANCH]`)
10. Start at 2 again!
