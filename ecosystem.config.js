module.exports = {
    apps: [
        {
            name: 'PureMatters',
            script: './app.js',
            watch: true,
            instances: '1',
            exec_mode: 'fork',
            env_localhost: {
                PORT: 8443,
                NODE_ENV: 'localhost',
            },
            env_production: {
                PORT: 8443,
                NODE_ENV: 'production',
            },
        },
    ],
};
