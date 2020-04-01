var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'transagua-backend',
  description: 'desenvolvido por Cherry Tech',
  script: 'C:\\Users\\SERVIDOR\\Documents\\transagua\\backend\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();