const parseEnv = () => {
    const prefix = 'RSS_';

    Object.keys(process.env).forEach(key => {
      if (key.startsWith(prefix)) {
        const value = process.env[key];
        console.log(`${key}=${value};`);
      }
    });
};

parseEnv();