require('shelljs/global');
var fs = require('fs');
var path = require('path');
var GetCommand = {
	Logger: require('../logger.js'),
	path: '',
	root: '',
	name: '',
	key: '',
	proxy: '',
	init: function (args) {
		this.root = path.dirname(require.main.filename);
		this.getTask(args);
	},
	getTask:function(args){ 
		this.get();
	},
	get:function(){
		fs.readFile(this.root+'/resources/proxies.json', 'utf8', this.onGetProxyFile.bind(this));
	},
	onGetProxyFile:function(err,data){
		if (err) {
			this.Logger.error('Cant find proxy file');
		}else{
			var obj = JSON.parse(data);
			this.getProxies(obj);
		}
	},
	getProxies:function(obj){
		var namekeys = Object.keys(obj);
		namekeys.forEach(function (namekey) {
			Object.keys(obj[namekey]).forEach(function (proxyname) {
				this.Logger.ok("Name: " + namekey + ", Proxy: " + proxyname + ' ' + obj[namekey][proxyname]);
			}.bind(this))
		}.bind(this))

	}
}

module.exports = GetCommand.init.bind(GetCommand);