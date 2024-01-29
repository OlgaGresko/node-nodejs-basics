import { Transform, pipeline } from 'stream';

const transform = async () => {
  const readable = process.stdin;
  const writable = process.stdout;

  const transform = new Transform({
    transform(chunk, enc, cb) {
      const chunkStringified = chunk.toString().trim();
      const reversedChunk = chunkStringified.split('').reverse().join('');
      this.push(reversedChunk + '\n');
      cb();
    },
  });

  pipeline(readable, transform, writable, err => {
    console.error(err.message);
  });
};

await transform();
