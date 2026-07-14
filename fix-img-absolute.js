const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.vue')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const original = content;
      // 把相对路径 img/ 改回 /img/，让 Vite 作为 public 资源处理
      content = content.replace(/(['"])img\//g, '$1/img/');
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log('Updated:', fullPath);
      }
    }
  }
}

walk(srcDir);
console.log('Done');
