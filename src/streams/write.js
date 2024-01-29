import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const write = async () => {
  const fileName = 'fileToWrite.txt';
  const folderName = 'files';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const filePath = resolve(dirName, folderName, fileName);

  const writable = createWriteStream(filePath);

  process.stdin.on('data', chunk => {
    writable.write(chunk.toString());
  });
};

await write();
