import fs, { access } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const create = async () => {
  const fileName = 'fresh.txt';
  const folderName = 'files';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const filePath = resolve(dirName, folderName, fileName);
  
  const errorMessage = 'FS operation failed';

  try {
    await access(filePath);

    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const content = 'I am fresh and young';
      await fs.writeFile(filePath, content);
    } else {
      console.error(errorMessage);
    }
  }
};

await create();
