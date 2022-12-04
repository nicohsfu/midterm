# LHL Midterm Project

by Minha Kim, Nico Hernandez, Kasey Valdez

Pikmeup allows for a food ordering experience where customers can receive SMS updates regarding the status of their order. Users will recieve an SMS text with an estimated pickup, followed by an order completion text.

## Final Product

### User placing an order
![User placing an order](https://github.com/nicohsfu/midterm/blob/master/docs/user-order.gif?raw=true)

### Restaurant receiving an order
![Restaurant receiving an order](https://github.com/nicohsfu/midterm/blob/master/docs/admin-order.gif?raw=true)

### Restaurant adding new menu item
![Restaurant adding new menu item](https://github.com/nicohsfu/midterm/blob/master/docs/admin-add.gif?raw=true)

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
