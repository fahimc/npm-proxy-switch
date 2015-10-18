#!/usr/bin/env node
var Main = {
	commandIndex:2,
	command:{
		register:require('./src/command/register.js'),
		set:require('./src/command/set.js'),
		npmrc:require('./src/command/npmrc.js')
	},
	init: function () {
		this.checkCommand();
	},
	checkCommand:function(){
		if (process.argv.length > this.commandIndex) {
			var cmd = process.argv[this.commandIndex];
			if(cmd === 'npmrc'){
				this.command['npmrc'](process.argv);
			}else{
				if(process.argv.length > 3){
					this.command['register'](process.argv);
				}else{
					this.command['set'](process.argv);
				}
			}
			// }
		}
	}
};
Main.init();
//npm -g install .

