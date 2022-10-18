# 🚌 OC Transpo Web-app for ITEC4012

## Development setup

### Getting started

Before you do any development work, make sure all node modules are installed to your local machine using `npm i`.

### API Keys

API keys should be stored in a `.env.local` file in the root directory. This file is not synced through git, you will need to make your own local file for everything to work properly. All of the environment variables that will be required are listed in the default `.env` variable.

Example `.env.local`

```
MAPS_API_KEY=GOOGLE MAPS API KEY HERE
REACT_APP_OC_API_KEY=OC TRANSPO API KEY HERE
REACT_APP_OC_APP_ID=OC TRANSPO APP ID HERE
```

### Project Layout

The majority of the project is stored in `./src`. Here the project is split into components, pages, and an index file that contains setup for the react router.

#### The components lab page

When the application is running in development mode a "components lab" page will be built.

### Recommended Plugins

To make your life easier, the following VScode plugins are recommended:

- JavaScript and TypeScript Nightly
- ESLint
- Prettier
- Tailwind CSS Intellisense
- GitLens

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
