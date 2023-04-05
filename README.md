# My Pokemon API
This is an Express.js API demo based on the Next.js [My Pokemon](https://github.com/eodeluga/my-pokemon) web application (basically just the backend).

## Running the application using Docker (requires docker-compose)

1. First create an .env.docker file in the folder root with the following details

````
PORT=3000
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<your_postgres_user_password>
POSTGRES_DB=pokemon
DATABASE_URL=postgresql://postgres:<your_postgres_user_password>@db:5432/pokemon?schema=public
````

2. Then enter the following commands
````
docker-compose build
docker-compose up
````

## Running the application using shell
This will require that PostgreSQL is installed, and the user name and password in .env file will need to be changed to match your environment

1. First create a .env file in the folder root with the following details (this is different to the above .env.docker)

````
PORT=3000
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

## Accessing the API

The server should now be up.
  
Next you need to propagate the database with Pokemon data.

1. Open a browser and enter:

    [http://localhost:3000/api/internal/catch-pokemon](http://localhost:3000/api/internal/catch-pokemon)

You should see a success message in the server log console along with how many Pokemon were loaded into the database

2. You can now GET Pokemon:

    [http://localhost:3000/api/v1/get-pokemon](http://localhost:3000/api/v1/get-pokemon)


3. You can also filter Pokemon by using URL query parameters for height and / or weight, for example:

    [http://localhost:3000/api/v1/get-pokemon?weight=2000&height=54](http://localhost:3000/api/v1/get-pokemon?weight=2000&height=54)

4. You can POST a Trainer to store the user in the database: 

    [http://localhost:3000/api/internal/create-trainer](http://localhost:3000/api/internal/create-trainer)
    
    Each trainer added must have a unique email address.
    
    The password is hashed before entering the database.
    
    The request body must contain the trainer object in JSON, for example:
    
    ````
    {
        "data":{
            "username": "llamb",
            "password": "password",
            "email_address": "larry.lamb@gmail.com"
        }
    }
    ````
