const fs = require("fs");
const path = require("path");
const { minify: minifyHtml } = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const terser = require("terser");
async function minifyFile(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const content = fs.readFileSync(inputPath, "utf-8");
    let minified;
    if (ext === ".html" || ext === ".htm") {
      minified = await minifyHtml(content, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      });
    } else if (ext === ".css") {
      const output = new CleanCSS({}).minify(content);
      if (output.errors.length) {
        console.error(`CSS minify errors in ${inputPath}:`, output.errors);
        return;
      }
      minified = output.styles;
    } else if (ext === ".js") {
      const result = await terser.minify(content);
      if (result.error) {
        console.error(`JS minify error in ${inputPath}:`, result.error);
        return;
      }
      minified = result.code;
    } else {
      return;
    }
    if (typeof minified !== "string" || minified.length === 0) {
      console.error(`Minification failed for ${inputPath}: no output`);
      return;
    }
    fs.writeFileSync(inputPath, minified);
    console.log(`Minified and overwritten: ${inputPath}`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}
async function minifyCurrentFolder() {
  const files = fs.readdirSync(".");
  const filteredFiles = files.filter((f) => /\.(html?|css|js)$/i.test(f));
  for (const file of filteredFiles) {
    await minifyFile(file);
  }
}
minifyCurrentFolder();
