*Update:* Do you _really_ want to use Gatsby? https://twitter.com/tesseralis/status/1293649007739191296

# gatsby-source-google-sheets

Source plugin for pulling data into Gatsby from a Google Sheets document

## A note on versions

I haven't really used this very extensively lately but have tried to upgrade it
for Gatsby 2.x.

* If using Gatsby 1.x, do `npm i gatsby-source-google-sheet@1`
* If using Gatsby 2.x+, do `npm i gatsby-source-google-sheet@2`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    /*
     * Gatsby's data processing layer begins with “source” plugins. Here we
     * setup the site to pull data from a particular Google Sheet
     */
    {
      resolve: `gatsby-source-google-sheet`,
      options: {
        // For protected spreadsheets you can use two-legged OAuth as described here:
        // https://www.npmjs.com/package/google-spreadsheet#service-account-recommended-method
        creds: {
          client_email: `yourserviceaccountemailhere@google.com`,
          private_key: `<long private key stuff>`
        },
        // This is the bit after "/d/" and before "/edit" in the URL of a
        // Google Sheets document. I.e.,
        // https://docs.google.com/spreadsheets/d/1ec1bO25bbEL4pdZjhlV3AppMtnO65D0ZI8fXy4z47Dw/edit#gid=0
        spreadsheetKey: `1ec1bO25bbEL4pdZjhlV3AppMtnO65D0ZI8fXy4z47Dw`,
        rootName: "RootName" // default is Sheet
      }
    }
  ]
};
```

##### With .env (if you make your code public)

1. Run `npm install dotenv --save-dev`

2. Create `.env` in the root folder and fill with the credentials

```
GS_CLIENT_EMAIL=
GS_PRIVATE_KEY=
```

3. Add `require('dotenv').config()` on top of _gatsby-config.js_, and edit the creds object

```javascript
  creds: {
    client_email: process.env.GS_CLIENT_EMAIL || ``,
    private_key: process.env.GS_PRIVATE_KEY.replace(/\\n/g, '\n') || ``
  }
```

## Plugin options

* **creds**: Object containing `client_email` and `private_key`, for non-public sheets.
* **spreadsheetKey**: The key of the spreadsheet you want to consume via GraphQL.

## How to query your spreadsheet data using GraphQL

Below is a sample query for fetching three columns in a spreadsheet.

```graphql
query GetGoogleSheetsColumns {
  allGoogleSheet$rootName {
    edges {
      node {
        col1
        col2
        col3
      }
    }
  }
}
```
