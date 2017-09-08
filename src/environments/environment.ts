// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDAq8jxsonWbc9aQUBOycosatntzRFynmY',
    authDomain: 'firechat-b3ef4.firebaseapp.com',
    databaseURL: 'https://firechat-b3ef4.firebaseio.com',
    projectId: 'firechat-b3ef4',
    storageBucket: 'firechat-b3ef4.appspot.com',
    messagingSenderId: '24176082741'
  }
};
