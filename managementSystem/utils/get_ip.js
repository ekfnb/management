const express = require('express')
var router = express.Router();
const os = require('os');
///获取本机ip///
function getIP(){
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const getIPv4 = getIP
router.get('/ip',(req,res)=>{
    res.send({
        data:'http:\\' + getIPv4 + ':3009'
    })
})

module.exports = router