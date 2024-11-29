function identifyFormat(text) {
  // Basic regular expressions for common formats
  const htmlRegex = /<[^>]+>/;
  const jsonRegex = /\{.*\}/;
  const xmlRegex = /<\?xml.*\?>/;
  const markdownRegex = /^#/;
  const codeRegex = /`.*`/g;

  // Check for HTML
  if (htmlRegex.test(text)) {
    return "HTML";
  }

  // Check for JSON
  if (jsonRegex.test(text)) {
    return "JSON";
  }

  // Check for XML
  if (xmlRegex.test(text)) {
    return "XML";
  }

  // Check for Markdown headings
  if (markdownRegex.test(text)) {
    return "Markdown Heading";
  }

  // Check for code snippets
  if (codeRegex.test(text)) {
    return "Code Snippet";
  }

  // Default to plain text
  return "Plain Text";
}

// Example usage:
const textList = [
  "<p>This is HTML</p>",
  '{"key": "value"}',
  "<xml><root></root></xml>",
  "# Heading",
  "`console.log('Hello, world!');`",
  "This is plain text",
];

for (const text of textList) {
  console.log(`${text} is identified as: ${identifyFormat(text)} \n`);
}

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

const codeSnippet = '```javascript\nconsole.log("Hello, world!");\n```';
hljs.registerLanguage('javascript', javascript);
// Highlight the code snippet and get the HTML
const highlightedCode = hljs.highlight(
    '<span>Hello World!</span>',
    { language: 'xml' }
  ).value