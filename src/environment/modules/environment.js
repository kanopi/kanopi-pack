module.exports = {
    read_environment_variables: ({ dotenvEnable = true, dotenvConfiguration = {} } = {}) => {
        return {
            dotenvEnable,
            dotenvConfiguration
        };
    }
};