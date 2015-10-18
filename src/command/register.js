require('shelljs/global');
var fs = require('fs');
var path = require('path');
var RegisterCommand = {
	Logger: require('../logger.js'),
	argsLength: 5,
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
		if (args.length - 1 == this.argsLength) {
			this.path = args[this.argsLength];
			//this.save();
			this.name =  args[2];
			this.key =  args[4];
			this.proxy =  args[5];
			this.save();
		}
	},
	save:function(){
		fs.readFile(this.root+'/resources/proxies.json', 'utf8', this.onGetProxyFile.bind(this));
	},
	storeProxy:function(content){
		if(!content[this.name])content[this.name]={};
		content[this.name][this.key] = this.proxy;
		var filePath = this.root+'/resources/proxies.json';
		fs.writeFile(filePath, JSON.stringify(content, null, 4), this.onFileCreated.bind(this));
	},
	onGetProxyFile:function(err,data){
		if (err) {
			this.Logger.error('Cant find proxy file');
		}else{
			var obj = JSON.parse(data);
			this.storeProxy(obj);
		}
	},
	onFileCreated:function(err){
		if (err) {
			this.Logger.error('Cant create proxy please try again');
		}else{
			this.Logger.ok(this.name + ' proxy was saved');
		}
	}
}

module.exports = RegisterCommand.init.bind(RegisterCommand);

