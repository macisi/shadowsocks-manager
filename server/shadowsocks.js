const spawn = require('child_process').spawn;
const path = require('path');

const sserverPath = path.resolve(process.cwd(), './bin/shadowsocks-server');
let child;

exports.start = () => {
  if (child && child.pid) return false;
  child = spawn(sserverPath, ['-p', '8083', '-k', '123456']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return true;
};

exports.stop = () => {
  if (!child) return false;
  child.kill();
  return true;
};

exports.getStatus = () => {
  if (!child) {
    return false;
  }
  return child;
};
