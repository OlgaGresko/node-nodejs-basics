import zlib from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const compress = async () => {
  const fileName = 'fileToCompress.txt';
  const zipedFileName = 'archive.gz';
  const folderName = 'files';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const filePath = resolve(dirName, folderName, fileName);
  const zipedFilePath = resolve(dirName, folderName, zipedFileName);

  const gzip = zlib.createGzip();
  const readable = createReadStream(filePath);
  const writable = createWriteStream(zipedFilePath);

  readable.pipe(gzip).pipe(writable);
};

await compress();
