# My Pokemon API
This is an Express.js API demo based on the Next.js [My Pokemon](https://github.com/eodeluga/my-pokemon) web application (basically just the backend).

## Getting Started

### Running using shell (manual setup..working to fix Docker implementation)
This will require that PostgreSQL is installed, and the user name and password in .env file will need to be changed to match your environment

1. First create a .env file in the folder root with the following details

````
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="<your_postgres_user_password>"
POSTGRES_DB="pokemon"
DATABASE_URL="postgresql://postgres:<your_postgres_user_password>@localhost:5432/pokemon?schema=public"
````

2. Create the database required by the application
````
sudo -u postgres psql -c 'create database pokemon;'
````

3. Then enter the following commands
````
npm install
npm run generate
npm run build
npm start
````
Run tests after starting the API using the above.
````
npm test
````

You can now access the application using this url in your browser 
[http://localhost:3000](http://localhost:3000)
