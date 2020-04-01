var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'transagua',
  description: 'desenvolvido por cherry tech',
  script: 'C:\\Users\\SERVIDOR\\Documents\\transagua\\frontend\\node_modules\\react-scripts\\scripts\\start.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();