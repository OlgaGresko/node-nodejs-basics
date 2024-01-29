import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const list = async () => {
  const folderName = 'files';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const folderPath = resolve(dirName, folderName);
  
  const errorMessage = 'FS operation failed';

  try {
    const files = await readdir(folderPath);
    console.log(files);

  } catch (error) {
      console.error(errorMessage);
  }
};

await list();