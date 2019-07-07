const envConfigs = {
    development: {
        BACKEND: {
            BACKEND_BASE_URL: 'http://192.168.225.36:5000',
        }
    },

    production: {
        // PRODUCTION ENVIRONMENT CONFIG
        BACKEND: {
            BACKEND_BASE_URL: 'api',
        }
    }
};

const globalConfig = {
    // global
    ENVIRONMENT: ENV
};

const config = {
    ...globalConfig,
    ...envConfigs[globalConfig.ENVIRONMENT]
};

export default config;
