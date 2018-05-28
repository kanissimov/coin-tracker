## Coin Tracker

Simple demo project for tracking crypto currency portfolios.

How to run locally:

- unzip
- cd coin-tracker
- npm install
- npm start
- open localhost:3000 in browser

Comments

This demo project is based on create-react-app wireframe.

Packages added:
- redux (for application state management)
- redux-thunk (to handle async actions)
- axios (for http requests)
- material-ui (for predefined set of UI elements)
- styled-components (to apply custom styling)

For simplicity, there is a list of supported crypto currencies (defined in constants.js), which could be easily adjusted. Coins meta data is pulled once as the app starts, then the price data is pulled every 10 seconds. Meta data, prices, and portfolio holdings are kept as separate slices of the redux store.

To optimize data updates in prod, pub/sub pattern could be used (as opposed to periodically pulling data on timer).

Considering limited time spent on this project, there is no error handling or test coverage implemented here.

Deploying to prod would be specific to a target platform. Normally there is a separate build pipeline, optimized for production. Prod build files then moved to a target system (often using a target specific utils).

Front end authentication normally involves a login page or redirect to an external auth service. The result of that process is the app getting an access token, which is kept in the app store (or local storage) and used to access protected resources (API calls). Depending on auth model, front end might be responsible for handling of access token expiry (using a refresh token as needed).
