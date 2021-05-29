# Whats-For-Dinner-API:
Backend API for Whats-For-Dinner Client.

This is the backend server that responds with a user's pantry items, as well as various endpoints from Spoonacular API. Capabilities include authentication of a user, generating list of recipes based on pantries, and persistence of pantry items.

The application's data is served to our Whats-For-Dinner-API service:
https://github.com/Blue-Ocean-Team-Blossom/Whats-For-Dinner-Client

## Documentation:
The documentation for the Whats-For-Dinner-API has been generated on Postman, and includes the various endpoints available to request to. <br/>
https://documenter.getpostman.com/view/15037434/TzXunKnp


## Authors:

Jeff Heuton,
Andrew Vo,
Daniel Suh,
Jason Tseng,
Daniel Tseng,
Zad Castaneda,
Peter Kwak,
Ian Ferrier

## Running this Application:

### Clone the project:

```bash
  git clone https://github.com/Blue-Ocean-Team-Blossom/Whats-For-Dinner-API.git
```
or
```bash
  git clone https://github.com/Blue-Ocean-Team-Blossom/Whats-For-Dinner.git
```


### Go to the project directory:

```bash
  cd Whats-For-Dinner-API
```

### Install dependencies:

```bash
  npm install
  npm install forever -g
```

### Get Spoonacular API Keys

- Get the keys from RapidApi.com, on Spoonacular API.
- Make sure to get the api key, api host, and the spoonacular api url.


### Setup .env file:

- Create a .env file, with the same variables as in example.env.
- Fill in variables with relevant values.

### Run server:

- For development:
```bash
  npm run dev
```

- For production:
```bash
  npm run start
```


## Tech Stack

**Server Dependencies:**
- axios
- dotenv
- express
- express-jwt
- express-session
- forever
- passport
- passport-local
- pg
- postgresql
- sequelize

**Test Dependencies:**
- jest
- supertest

## Running Tests

To run tests, run the following command:

```bash
  npm run test
```

## Contributing

Contributions are always welcome!

## License
[MIT](https://choosealicense.com/licenses/mit/)