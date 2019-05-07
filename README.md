This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## critical

Config browswer to work with BrowserRouter


## desc

Navigate around separate pages in our app {react-router}
allow user to login/logout {Google-OAuth}
handle forms in redux
CRUD operations in React/Redux
error handling

## browser router

three types - which part of URL does it focus on for nav purposes
!!! BrosweserRouter --> 'everything after TLD: Top Level Domain'
  server differs from traditional html requesting in that it doesn't return 404 when page not found.  Instead,
  returns index.html.  Why?  Server doesn't know routes, handled in browser... need production server set up like react dev server...
  send unknown route requests to public/index.js !!!
HashRouter --> 'everything after #. react-router automatically places # in URL'
MemoryRouter --> 'URL is NOT used to track navigation' URL in browser appears to remain TLD while navigating

## debug

Redux DevTools
browserURL: http://localhost:3000/?debug_session=%3Csome_string%3E
  tells R devTools to start debug session... default is to dump data on refresh... dev session sets data to save between refreshes

!!! end my comments !!!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
