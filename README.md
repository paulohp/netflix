# Netflix unofficial API


## How to install
`npm install netflix --save`

## How to use

```javascript
var Netflix = require('../dist/netflix');

var n = new Netflix({
  email: '',
  password: ''
});

n.catalog(function(){
  console.log('We are in!')
});
```
