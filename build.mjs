import { mkdir, rm, copyFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

for (const file of ['index.html']) {
  await copyFile(file, `dist/${file}`);
}

console.log('ReturnFlow production build ready');
