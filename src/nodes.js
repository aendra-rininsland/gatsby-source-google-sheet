import createNodeHelpers from "gatsby-node-helpers";

const {
  createNodeFactory,
  generateNodeId,
  generateTypeName
} = createNodeHelpers({
  typePrefix: `GoogleSheets`
});

export const SheetNode = createNodeFactory("Sheet");
