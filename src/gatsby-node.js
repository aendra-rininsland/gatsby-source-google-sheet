// gatsby-node.js

import { SheetNode } from "./nodes";
import GoogleSpreadsheet from "google-spreadsheet";

exports.sourceNodes = async ({ boundActionCreators }, pluginOptions) => {
  const { createNode } = boundActionCreators;
  const doc = new GoogleSpreadsheet(pluginOptions.spreadsheetKey);

  if (pluginOptions.creds) {
    await new Promise(resolve =>
      doc.useServiceAccountAuth(pluginOptions.creds, resolve)
    );
  }

  const items = await Promise.all(
    (await new Promise((resolve, reject) =>
      doc.getInfo((err, info) => {
        if (err || !info.worksheets.length) reject(err);
        resolve(info.worksheets);
      })
    )).reduce(
      async (acc, sheet) =>
        acc.concat(
          await new Promise((resolve, reject) => {
            sheet.getRows((err, rows) => {
              if (err) reject(err);
              resolve(rows);
            });
          })
        ),
      []
    )
  );

  const rows = items.forEach(item => {
    const itemNode = SheetNode(item);
    createNode(itemNode);
  });
};
