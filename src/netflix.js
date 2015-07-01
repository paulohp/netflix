import request from 'request';
import cheerio from 'cheerio';

export default class Netflix {
  // constructor(args) {
  //   // code
  // }

  catalog(cb){
    let req = request.defaults({ jar: true });
    req.get('http://www.netflix.com/browse', (err, response, body) => {
      console.log(err, body, response.statusCode)
    })
  }
}