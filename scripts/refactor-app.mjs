import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, "../src/App.jsx");
const content = fs.readFileSync(appPath, "utf-8");

// Extract all const declarations and their line numbers
const lines = content.split("\n");
const components = {};
let currentStart = -1;
let currentName = "";
let braceCount = 0;
let inComponent = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Find component starts
  const match = line.match(/^const\s+(\w+)\s*=\s*(?:\(.*?\)\s*)?=>/);
  if (match) {
    const name = match[1];
    currentStart = i;
    currentName = name;
    braceCount = 0;
    inComponent = true;
  }
  
  // Track braces to find component end
  if (inComponent) {
    for (const char of line) {
      if (char === "{") braceCount++;
      if (char === "}") braceCount--;
    }
    
    // Component ends when braces return to 0
    if (braceCount <= 0 && i > currentStart) {
      components[currentName] = { start: currentStart, end: i };
      inComponent = false;
    }
  }
}

// Log the found components
console.log("Found components:");
Object.entries(components).forEach(([name, { start, end }]) => {
  const lines_count = end - start + 1;
  console.log(`  ${name}: lines ${start + 1}-${end + 1} (${lines_count} lines)`);
});
