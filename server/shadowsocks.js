const spawn = require('child_process').spawn;
const path = require('path');

const sserverPath = path.resolve(process.cwd(), './bin/shadowsocks-server');
let child;

exports.start = () => {
  if (child && child.pid) return false;
  child = spawn(sserverPath, ['-p', '8083', '-k', '123456']);
  return child;
};

exports.stop = () => {
  if (!child) return false;
  child.kill();
  child = false;
  return true;
};

exports.getStatus = () => {
  if (!child) {
    return false;
  }
  return child;
};
