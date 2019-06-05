const ConfigDevRemote = {
    apiBaseUrl: "http://52.62.149.101/api",
    wordpressBaseUrl:"http://52.62.149.101"
};
const ConfigLocal = {
    ...ConfigDevRemote,
    apiBaseUrl: 'http://localhost:8080',
};

export const Config = ConfigDevRemote;