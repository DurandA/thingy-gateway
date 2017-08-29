var Thingy = require('thingy52');
const argv = require('yargs').argv
var client = require('./client')('http://127.0.0.1:8080');
var events = require('./environment')(client);

var ids = []

if (argv.id) {
    ids = ids.concat(argv.id).map(function(e) {
        return e.replace(/:/g,'').toLowerCase();
    })
}

function* discoverByIds(ids) {
  for (var id of ids) {
    yield new Promise((resolve, reject) => {
      Thingy.discoverById(id, function(thingy) {
          console.log('Discovered: ' + thingy);
          resolve(thingy);
      });
    });
  }
}

if (ids && ids.length){
    Promise.all(discoverByIds(ids)).then(devices => {
      console.log('Discovered all devices!');
      for (var thingy of devices) {
        events.onDiscover(thingy);
      }
    });
} else {
    Thingy.discoverAll(function (thingy){
        console.log('Discovered: ' + thingy);
        events.onDiscover(thingy)}
    );
}
