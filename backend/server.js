'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstraps Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass a relative path from the project root.
*/

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error)

var contador = 0;
function upTimeCherryTech() {
  const temporizador = 1000 * 60 * 5;
  const tokenUptimeCherryTech = "lks58d234fmp";
  
  // fetch(`http://apis.cherrytech.com.br/uptime.php?token=${tokenUptimeCherr­yTech}`).
  // .then((item)=>{
    //   console.log(item)
    // })
    // .catch((err) => {
      //   console.log(err)
      // })
      setTimeout( () => {
        console.log('> Executando uptime');
    console.log (`Uptime: ${++contador}`);
    fetch("http://apis.cherrytech.com.br/uptime.php?token="+tokenUptimeCherryTech)
    .then((item)=>{
      console.log(item)
    })
    .catch((err) => {
      console.log(err)
    })
    upTimeCherryTech();
  }, temporizador)
}
// upTimeCherryTech();