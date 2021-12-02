const AppUrls = {
    local: {
        pwPortal: 'http://localhost:5000'
    },
    dev: {
        pwPortal: 'https://pw-web-dev.eastus.cloudapp.azure.com/portal'
    },
    qa: {
        pwPortal: 'https://pw-web-qa.eastus.cloudapp.azure.com/portal'
    }
};


export const getAppUrl = (appName = 'pwPortal', env = 'local') => {
    return AppUrls[env][appName];
};
