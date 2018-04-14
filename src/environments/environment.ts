// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: '(dev)',
  serverUrl: '/api',
  defaultLanguage: 'en-CA',
  supportedLanguages: [
    'fr-CA'
  ],
  firebase: {
    apiKey: "AIzaSyBoHbDNYFZlUgHuq7-jHYtykBzWZ1458cE",
    authDomain: "gestigris-c51b6.firebaseapp.com",
    databaseURL: "https://gestigris-c51b6.firebaseio.com",
    projectId: "gestigris-c51b6",
    storageBucket: "gestigris-c51b6.appspot.com",
    messagingSenderId: "260479479654"
  }
};