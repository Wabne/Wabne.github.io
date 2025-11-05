const fs = require("fs");
const path = require("path");
const { minify: minifyHtml } = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const terser = require("terser");

// List of folders to ignore
const IGNORED_FOLDERS = ["node_modules", ".git", "vendor", "composer"];

// Minify a single file
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
      return; // Skip other files
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

// Recursive folder traversal
async function minifyFolderRecursive(folderPath) {
  const items = fs.readdirSync(folderPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(folderPath, item.name);

    if (item.isDirectory()) {
      if (!IGNORED_FOLDERS.includes(item.name)) {
        await minifyFolderRecursive(fullPath); // Recurse into folder
      }
    } else if (item.isFile()) {
      if (/\.(html?|css|js)$/i.test(item.name)) {
        await minifyFile(fullPath);
      }
    }
  }
}

// Start minification from current folder
minifyFolderRecursive(process.cwd())
  .then(() => console.log("All eligible files minified!"))
  .catch((err) => console.error("Error during minification:", err));
