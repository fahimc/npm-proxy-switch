require('shelljs/global');
var fs = require('fs');
var path = require('path');
var NPMRCCommand = {
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
	getTask: function (args) {
		this.task = args[3];
		if (this.task && this.task == 'remove') {
			this.load();
		} else if (this.task && this.task == 'restore') {
			this.load();
		}
	},
	load:function(){
		fs.readFile(this.root+'/resources/npmrc.json', 'utf8', this.onGetNPMFile.bind(this));
	},
	onGetNPMFile:function(err,data){
		if (err) {
			this.Logger.error('Cant find proxy file');
		}else{
			var obj = JSON.parse(data);
			if(this.task == 'remove')
			{
				this.rename(obj);
			}else{
				this.restore(obj);
			}
		}
	},
	rename: function (obj) {
		config.silent = true;
		exec('npm config list', function (code, output) {
			var arr = output.split('\n');
			var filePath = NPMRCCommand.findConfig(arr);
			if (filePath) {
				NPMRCCommand.save(filePath,obj);
				var newName = filePath.replace('.npmrc','._npmrc');
				fs.rename(filePath, newName, function (err) {
					if (err) console.log('ERROR: ' + err);
					NPMRCCommand.Logger.ok('removed npmrc file. use \'restore\' to restore file');
				});
			}
		});

	},
	save:function(filePath,content){
		content['path'] = filePath;
		var filePath = this.root+'/resources/npmrc.json';
		fs.writeFile(filePath, JSON.stringify(content, null, 4), this.onFileCreated.bind(this));
	},
	onFileCreated:function(err){
		if (err) {
			this.Logger.error('Cant save npmrc location please try again');
		}else{
			this.Logger.ok(this.name + ' npmrc location was saved');
		}
	},
	restore: function (obj) {
		config.silent = true;
		if(obj['path'])
		{
			var newName = obj['path'].replace('.npmrc','._npmrc');
			fs.rename(newName,obj['path'], function (err) {
				if (err) console.log('ERROR: ' + err);
				NPMRCCommand.Logger.ok('restored npmrc file');
			});
		}

},
findConfig:function(arr){
	for(var a=0;a<arr.length;a++){
		if(arr[a].indexOf('; userconfig') >=0){
			return arr[a].replace('; userconfig ','').trim();
		}
	}
	return null;
}
}

module.exports = NPMRCCommand.init.bind(NPMRCCommand);

