# Whats-For-Dinner-Client:
Client Side Application with Server Side Rendering.

This is a single page web application for
a suggested recipes list, a list of all your items
a user has in stock at home, user authentication
to track the logged in user's pantry, and
an ingredient filtering recipe list.

The application's data is served from our Whats-For-Dinner-API service:
https://github.com/Blue-Ocean-Team-Blossom/Whats-For-Dinner-API

## Features:

![App Screenshot](http://g.recordit.co/0EfebzqaSh.gif)
![App Screenshot](http://g.recordit.co/qH7hCn6f2k.gif)
![App Screenshot](http://g.recordit.co/DSViv47G8Q.gif)
![App Screenshot](http://g.recordit.co/5qbjm1EV2X.gif)

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
  git clone https://github.com/Blue-Ocean-Team-Blossom/Whats-For-Dinner-Client.git
```

### Go to the project directory:

```bash
  cd Whats-For-Dinner-Client
```

### Install dependencies:

```bash
  npm install
```

### Setup .env file:

- Fill in a port.
- Request API IP address from our team, or host your own API instance.
- If hosting API instance locally, use your `http;//localhost:(YOUR_PORT_FOR_BACKEND)/` for `API_IP_ADDRESS=FILL_ME_IN`
- If hosting API instance deployed, use the deployed instance's IP address for `API_IP_ADDRESS=FILL_ME_IN`

### Bundle and serve:

- For development:
```bash
  npm run react-dev
  npm run server-dev
```

- For production:
```bash
  npm run react-prod
  npm run server-prod
```

### In the Browser:

- If hosting locally: http://localhost:(YOUR_PORT_HERE)/
- If deploying: http://(YOUR_IP_ADDRESS_HERE):(YOUR_PORT_HERE)/

### Now Enjoy What's For Dinner App, Cheers mate!
:beers: :beers: :beers: :beers: :beers:
:stew: :poultry_leg: :spaghetti: :apple: :egg:

## Tech Stack

**Client Dependencies:**

- axios
- react
- react-dom
- react-infinite-scroll-component
- jquery
- html-react-parser

**Server Dependencies:**
- @babel/core
- @babel/plugin-transform-runtime
- @babel/preset-env
- @babel/preset-react
- @babel/runtime
- babel
- babel-loader
- axios
- dotenv
- webpack
- webpack-cli
- forever
- express

**Additional Dev Deps:**
- nodemon

**Test Dependencies:**
- @wojtekmaj/enzyme-adapter-react-17
- enzyme
- jest-enzyme
- jest
- jest-css-modules-transfom
- babel-jest

**Lint Dependencies (Tied in with Webpack):**
AirBnB ruleset (with changes)
- babel-eslint
- eslint
- eslint-config-airbnb
- eslint-loader
- eslint-plugin-import
- eslint-plugin-jsx-a11y
- eslint-plugin-react
- eslint-plugin-react-hooks

## Running Tests

To run tests, run the following command:

```bash
  npm run test
```

To get test coverage, run the following command:

```bash
    npm run test-cov
```

## Contributing

Contributions are always welcome!