var Logger ={
	init:function(){
	},
	warn:function(message){
		console.warn('\x1b[33m WARNING: '+message+this.reset());
	},
	error:function(message){
		console.error('\033[31m ERROR: '+message+this.reset());
	},
	ok:function(message){
		console.log('\x1b[32m'+message+this.reset());		
	},
	reset:function()
	{
		return '\x1b[0m';
	}
}
module.exports = Logger;