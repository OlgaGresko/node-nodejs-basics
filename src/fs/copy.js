import fs, { access, readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const copy = async () => {
  const folderName = 'files_copy';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const folderPath = resolve(dirName, folderName);

  const errorMessage = 'FS operation failed';

  try {
    await access(folderPath);

    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(folderPath);
      const path = resolve(dirName, 'files');
      const files = await readdir(path);

      for (const file of files) {
        const oldFileDest = resolve(path, file);
        const newFileDest = resolve(folderPath, file);
        await fs.copyFile(oldFileDest, newFileDest);
      }
    } else {
      console.error(errorMessage);
    }
  }
};

await copy();
