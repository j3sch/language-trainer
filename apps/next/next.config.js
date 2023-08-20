const boolVals = {
  true: true,
  false: false,
};

const disableBrowserLogs = boolVals[process.env.DISABLE_BROWSER_LOGS] ?? process.env.NODE_ENV === 'production';

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    typescript: {
      ignoreBuildErrors: true,
    },
    experimental: {
      appDir: false,
      forceSwcTransforms: true,
      scrollRestoration: true,
      legacyBrowsers: false,
    },
    compiler: {
      removeConsole: disableBrowserLogs,
    },
  };

  return config;
};
