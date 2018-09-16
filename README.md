# gatsby-source-google-sheets

Source plugin for pulling data into Gatsby from a Google Sheets document

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
        rootName: 'RootName' // default is Sheet
      }
    }
  ]
};
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
