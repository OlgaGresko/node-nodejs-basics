import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const read = async () => {
  const fileName = 'fileToRead.txt';
  const folderName = 'files';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const filePath = resolve(dirName, folderName, fileName);

  const errorMessage = 'FS operation failed';

  try {
    const content = await fs.readFile(filePath, { encoding: 'utf8' });
    console.log(content);
  } catch (error) {
    console.error(errorMessage);
  }
};

await read();
