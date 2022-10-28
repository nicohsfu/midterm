LHL Midterm Project (October 2022)
===

## by Minha Kim, Nico Hernandez, Kasey Valdez

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
    - the env contents will be shared on the notes section of the Compass project submission
2. Update the .env file with your correct local information 
    - username: `labber` 
    - password: `labber` 
    - database: `midterm`
3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`
    - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm run local`
    - Note: nodemon is used, so you should not have to restart your server
6. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Twilio
