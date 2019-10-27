[![Netlify Status](https://api.netlify.com/api/v1/badges/a001091c-3d75-4e4a-b207-bbc934ad9867/deploy-status)](https://app.netlify.com/sites/web-dev-30days/deploys)

This is basically for my wife. She would like to learn Web Development. I hope this project can help.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

https://web-dev-30days.netlify.com

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

This will deploy the change via surge CDN service.

## Contentful data

This Data fo this application come from contentful. You can find the contentful data at `./contentful.json`.

It will only include `contentTypes` and `locales`. Please noted unnecessary data have been removed, so I am not sure if this can still work for `contentful space import`.

Detial please check this page https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/
