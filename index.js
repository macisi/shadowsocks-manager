const path = require('path');
const Hapi = require('hapi');
const vision = require('vision');
const HapiReactViews = require('hapi-react-views');
const routerConfig = require('./server/router');
const Nes = require('nes');
const Inert = require('inert');

require('babel-core/register')({
  presets: ['react', 'es2015', 'stage-1'],
  only: '/views/',
  extensions: ['.jsx'],
});

const server = new Hapi.Server();
server.connection({
  port: 3000,
});

server.register([vision, Nes, Inert], (err) => {
  if (err) {
    console.log('Failed to load vision');
  }

  server.views({
    engines: {
      jsx: HapiReactViews,
    },
    compileOptions: {
      layoutPath: path.resolve(__dirname, './views/layout'),
      layout: 'default',
      path: './page',
    },
    relativeTo: __dirname,
    path: 'views',
  });

  server.path(__dirname);
  server.route(routerConfig);
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server run at:', server.info.uri);
});
