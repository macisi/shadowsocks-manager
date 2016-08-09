const path = require('path');
const shadowsocks = require('./shadowsocks');

module.exports = [
  {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: ['build'],
        listing: process.env.NODE_ENV === 'development',
      },
    },
  },
  {
    method: 'GET',
    path: '/{page?}',
    handler: (req, rep) => {
      let page = req.params.page;
      if (!page) {
        page = 'home';
      }
      rep.view(`page/${page}`, {
        pageName: page,
      });
    },
  },
  {
    method: 'GET',
    path: '/api/server/{action}',
    handler: (req, rep) => {
      let result;
      switch (req.params.action) {
        case 'status':
          result = shadowsocks.getStatus();
          if (result) {
            rep({
              hasError: false,
              content: {
                status: 'started',
                pid: result.pid,
              },
            });
          } else {
            rep({
              hasError: false,
              content: {
                status: 'stoped',
              },
            });
          }
          break;
        case 'start':
          result = shadowsocks.start();
          if (result) {
            rep({
              hasError: false,
              content: {
                status: 'started',
              },
            });
            const server = req.server;
            result.stdout.on('data', (data) => {
              server.publish('/api/console', {
                type: 'out',
                content: data.toString(),
              });
            });

            result.stderr.on('data', (data) => {
              server.publish('/api/console', {
                type: 'err',
                content: data.toString(),
              });
            });

            result.on('close', () => {
              server.publish('/api/console', {
                type: 'close',
              });
            });
          } else {
            rep({
              hasError: true,
              errorMsg: 'shadowsocks server start failed!',
            });
          }
          break;
        case 'stop':
          result = shadowsocks.stop();
          if (result) {
            rep({
              hasError: false,
              content: {
                status: 'stoped',
              },
            });
          } else {
            rep({
              hasError: true,
              content: {
                error: 'shadowsocks server stop failed!',
              },
            });
          }
          break;
        default:
          break;
      }
    },
  },
];
