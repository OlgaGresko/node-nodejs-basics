import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const read = async () => {
  try {
    const fileName = 'fileToRead.txt';
    const folderName = 'files';
    const pathToFile = fileURLToPath(import.meta.url);
    const dirName = dirname(pathToFile);
    const filePath = resolve(dirName, folderName, fileName);

    const data = await fs.readFile(filePath);
    process.stdout.write(data.toString());
  } catch (error) {
    console.error(`Error reading the file: ${error.message}`);
  }
};

await read();
