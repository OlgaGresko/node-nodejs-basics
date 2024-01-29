import { Worker } from 'worker_threads';
import os from 'os';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
    const pathToFile = fileURLToPath(import.meta.url);
    const numCPUs = os.cpus().length;

    const createWorker = (index, data) => {
        return new Promise((resolve) => {
            const worker = new Worker(pathToFile, { workerData: data });
    
            worker.on('message', (result) => {
                resolve({ index, result });
            });
        });
    };

    const workerPromises = [];

    for (let i = 0; i < numCPUs; i++) {
        const dataToSend = 10 + i;
        workerPromises.push(createWorker(i, dataToSend));
    };

    const results = await Promise.all(workerPromises);

    const sortedResults = results
        .sort((a, b) => a.index - b.index)
        .map(({ result }) => ({ status: result !== null ? 'resolved' : 'error', data: result }));

    console.log(sortedResults);
};

await performCalculations();