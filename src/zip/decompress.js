import zlib from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const decompress = async () => {
  const fileName = 'fileToCompress.txt';
  const zipedFileName = 'archive.gz';
  const folderName = 'files';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const filePath = resolve(dirName, folderName, fileName);
  const zipedFilePath = resolve(dirName, folderName, zipedFileName);

  const unzip = zlib.createUnzip();
  const readable = createReadStream(zipedFilePath);
  const writable = createWriteStream(filePath);

  readable.pipe(unzip).pipe(writable);
};

await decompress();
