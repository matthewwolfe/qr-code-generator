const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  assetPrefix: !debug ? '/qr-code-generator/' : '',
};
