# npm-proxy-switch
Add multiple proxies and switch between them and also remove and restore the npmrc file.  

## npmrc remove
This will remove the current npmrc. It will keep a backup so you can restore it  later.  
#### Example

```js
npm-proxy-switch npmrc remove
```


## npmrc restore
This will restore the npmrc that you removed previously.

#### Example

```js
npm-proxy-switch npmrc restore
```


## `<name> set <proxyType> <proxyURL>`
This will store a proxy setting under the `name` that you've provided. You can add multiple types under the same `name`

#### Example

```js
npm-proxy-switch example set proxy http://proxy.company.com:8080
npm-proxy-switch example set proxy-https https://proxy.company.com:8080
```

## `<name>`
This will set the proxy to the values which is set on the name.  
#### Example

```js
npm-proxy-switch example
```
