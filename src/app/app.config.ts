const config = {
    appName: "Global Education",
    env: 'dev',
    hosts: {
        dev: 'http://localhost:8080/api',
        prod: 'http://prod.com/api'
    },
    host: null
};

config.host = config.hosts[config.env];

export {config};