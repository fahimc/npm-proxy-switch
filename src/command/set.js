require('shelljs/global');
var fs = require('fs');
var path = require('path');
var SetCommand = {
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
		this.name =  args[2];
		this.set();
	},
	set:function(){
		fs.readFile(this.root+'/resources/proxies.json', 'utf8', this.onGetProxyFile.bind(this));
	},
	setProxy:function(content){
		if (this.name === 'none') {
			exec('npm config delete proxy');
			exec('npm config delete https-proxy');
			this.Logger.ok('successfully removed proxy settings');
			return;
		  } else if(!content[this.name]){
			console.log('proxy not found');
			return;
		}
		for( var key in content[this.name]){
			exec('npm config set '+key+' '+content[this.name][key]);			
		}
		this.Logger.ok('proxy set');
	},
	onGetProxyFile:function(err,data){
		if (err) {
			this.Logger.error('Cant find proxy file');
		}else{
			var obj = JSON.parse(data);
			this.setProxy(obj);
		}
	}
}

module.exports = SetCommand.init.bind(SetCommand);

