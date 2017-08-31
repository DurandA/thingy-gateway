var Thingy = require('thingy52');
/*var client = require('./client')('http://127.0.0.1:8080');
var events = require('./events')(client);*/

var events = function (api_root) {
    var client = require('./client')(api_root);
    return require('./events')(client);
}

function* discoverByIds(uuids) {
  for (var uuid of uuids) {
    yield new Promise((resolve, reject) => {
      Thingy.discoverById(uuid, function(thingy) {
          console.log('Discovered: ' + thingy);
          resolve(thingy);
      });
    });
  }
}

const argv = require('yargs')
    .command('connect <api_root> [uuids..]', 'connect to device(s) with specified [uuids..] (= MACs) and connect to <api_root>', {}, (argv) => {
        var uuids = []
        uuids = argv.uuids.map(function(e) {
            return e.toString().replace(/:/g,'').toLowerCase();
        })
        console.log('Search for device UUIDs: '+uuids);

        Promise.all(discoverByIds(uuids)).then(devices => {
          console.log('Discovered all devices!');
          for (var thingy of devices) {
            events(argv.api_root).onDiscover(thingy);
          }
        });
    })
    .command('discover <api_root>', 'discover all devices and connect to <api_root>', {}, (argv) => {
        Thingy.discoverAll(function (thingy){
            console.log('Discovered: ' + thingy);
            events(argv.api_root).onDiscover(thingy)}
        );
    })
    .help()
    .argv
