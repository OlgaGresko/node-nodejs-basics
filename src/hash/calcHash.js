import { createReadStream } from 'fs';
import { Transform, pipeline } from 'stream';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const calculateHash = async () => {
  const fileName = 'fileToCalculateHashFor.txt';
  const folderName = 'files';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const filePath = resolve(dirName, folderName, fileName);

  const readable = createReadStream(filePath);
  const writable = process.stdout;

  const transform = new Transform({
    transform(chunk, enc, cb) {
      const hash = crypto.createHash('sha256').update(chunk).digest('hex');
      this.push(hash + '\n');
      cb();
    },
  });

  pipeline(readable, transform, writable, err => {
    if (err) {
      console.error(err.message);
    }
  });
};

await calculateHash();
