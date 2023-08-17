/**
 * @typedef {Object} IncomingDevelopmentConfiguration
 * @property {string[]} allowedHosts - Additional hostnames allowed to access to server
 * @property {string} host - Hostname for the server
 * @property {number} post - Post of the server
 * @property {string} sockHost - Hostname for the server Websocket
 * @property {number} sockPort - Port for the server  Websocket
 * @property {boolean} useProxy - If using a proxy
 * @property {boolean} useSslProxy - If proxy is SSL enabled
 */

/**
 * @typedef {Object} DevelopmentServerPaths
 * @property {Object} local - Local URL to server
 * @property {string} public - Public/final URL to server
 */

/**
 * @typedef {Object} DevelopmentServerConfiguration
 * @property {string} configuration - Partial configuration for Webpack Dev Server 5
 * @property {DevelopmentServerPaths} paths - Set of final URL paths for server
 */

/**
 * @typedef {Object} DistributionPaths
 * @property {string} fullPath - Full path to the distribution files
 * @property {string} relativePath - Relative path to the distribution files
 */

module.exports = {
  /**
   * 
   * @param {IncomingDevelopmentConfiguration} developmentConfiguration 
   * @param {DistributionPaths} distributionPaths
   * @returns 
   */
  readDevelopmentConfiguration: (developmentConfiguration = {}, distributionPaths = {}) => {
    const {
      allowedHosts = [],
      host = '0.0.0.0',
      port = 4400,
      sockHost = '',
      sockPort = 80,
      useProxy = false,
      useSslProxy = false
    } = developmentConfiguration;

    const {
      fullPath,
      relativePath
    } = distributionPaths;

    const hostBuilder = (host, port) => 80 !== port ? `${host}:${port}` : `${host}`;
    const localUrl = hostBuilder(host, port);
    const url = useProxy ? hostBuilder(sockHost, sockPort) : localUrl;

    const finalAllowedHosts = allowedHosts.concat([
      '.localhost',
      'localhost',
      '.docksal',
      '.docksal.site',
      '.test',
      '127.0.0.1'
    ]);

    const localPath = `http://${localUrl}/${relativePath}/`;
    const publicPath = useSslProxy
      ? `https://${url}/${relativePath}/`
      : `http://${url}/${relativePath}/`;

    const client = useProxy
      ? {
        webSocketURL: {
          hostname: sockHost,
          port: sockPort,
          protocol: useSslProxy ? 'wss' : 'ws'
        }
      }
      : {};

    const configuration = {
      allowedHosts: finalAllowedHosts,
      client: client,
      devMiddleware: {
        publicPath: publicPath,
      },
      host: host,
      port: port,
      static: {
        directory: fullPath,
      },
    };

    return { configuration, paths: { local: localPath, public: publicPath } };
  }
}
