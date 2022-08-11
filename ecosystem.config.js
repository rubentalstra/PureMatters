module.exports = {
    apps: [
        {
            name: 'PureMatters',
            script: './app.js',
            watch: true,
            instances: '1',
            exec_mode: 'fork',
            env: {
                PORT: 80,
                NODE_ENV: 'development',
            },
            env_production: {
                PORT: 443,
                NODE_ENV: 'production',
            },
        },
    ],
};
