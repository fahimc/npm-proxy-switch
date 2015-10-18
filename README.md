# staging-bower

This is a global module which allows you to create a local bower repository in order to test your bower components before releasing them via git tags.

When using this to register your bower module it stores a reference to the repo locally.   

Then when you use the install command it will pull the staging branch of the bower module and install all the dependencies into the bower_components folder. 

##Install
```
npm install -g https://github.com/fahimc/staging-bower.git
```

## Options

#### staging-bower register `<packageName> <repo>`  
This will store the package reference.  
Example:
```
staging-bower register test-module https://github.com/fahimc/test-module.git
```

#### staging-bower install `<packageName>`  
This will install the package into the current folder under bower_components.  
Example:
```
staging-bower install test-module
```

#### staging-bower bowerrc `<pathToFile>`  
Set the bowerrc file by providing the location of your .bowerrc file. It will be stored.  
Example:
```
staging-bower bowerrc C:\Projects\Fahim\.bowerrc
```

