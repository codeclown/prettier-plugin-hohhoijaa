const parserMarkdown = require("prettier/parser-markdown").parsers.remark;
const findTemplateSpot = require("hohhoijaa/src/findTemplateSpot");
const parse = require("hohhoijaa/src/parse");
const render = require("hohhoijaa/src/render");

const preprocess = (text, options) => {
  text = parserMarkdown.preprocess(text, options);
  const templateSpots = findTemplateSpot(text);
  const headings = parse(text);
  const tableOfContents = render(headings);
  return `${text.substring(
    0,
    templateSpots[0].start
  )}\n\n${tableOfContents}\n\n${text.substring(templateSpots[0].end)}`;
};

exports.parsers = {
  markdown: {
    ...parserMarkdown,
    preprocess,
  },
};
