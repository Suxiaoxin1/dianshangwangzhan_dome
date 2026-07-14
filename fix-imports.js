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
      // 匹配 import ... from '@/components/...' 或 './...' 且不以 .vue 结尾的字符串
      const original = content;
      content = content.replace(
        /from\s+(['"])(@\/components\/[^'"]+|\.\/[^'"]+)\1/g,
        (match, quote, importPath) => {
          // 跳过已带后缀或目录的
          if (importPath.endsWith('.vue') || importPath.endsWith('.js') || importPath.endsWith('.css')) {
            return match;
          }
          // 对于相对路径的 ./router 等，只有文件是 index.js 才合法，Vite 可以解析，但 .vue 需要加后缀
          // 这里安全起见，只给 @/components 和 ./App 等组件路径加 .vue
          if (importPath.startsWith('@/components/') || importPath === './App') {
            return `from ${quote}${importPath}.vue${quote}`;
          }
          return match;
        }
      );
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log('Updated:', fullPath);
      }
    }
  }
}

walk(srcDir);
console.log('Done');
