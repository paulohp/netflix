import request from 'request';
import cheerio from 'cheerio';

//setting the cookies
let req = request.defaults({ jar: true });

//constants
const loginUrl = 'https://signup.netflix.com/Login';
const baseUrl = 'http://www.netflix.com/browse';
const moviesBase = 'http://movies.netflix.com/WiAltGenre?agid=$id';

export default class Netflix {
  constructor(credentials) {
     this.credentials = credentials;
  }

  //get the movies and series catalog
  catalog(cb){
    this._login(function(){
      req.get(baseUrl, (err, response, body) => {
        let $ = cheerio.load(body);
        let elements = $('.slider-item');
        for (var i = 0; i < elements.length; i++) {
          let data_id = $(elements[i]).data('reactid');
          let id = data_id.split('title')[1].split('_')[1]
          req.get(`${baseUrl}/?jbv=${id}&jbp=${i}&jbr=1`, (err, response, body) => {
            let $$ = cheerio.load(body);
            console.log($$('.title').text());
          })
        }

        return cb();
      });
    })
  }

  // login stuff
  _login(cb) {
    req.get(loginUrl, (err, response, body) => {
      let $ = cheerio.load(body);
      this.credentials.authURL = $('input[name="authURL"]').attr('value');

      req.post(loginUrl, { form: this.credentials }, (err, resp, body) => {
        if (err) { throw err; }
        this._getProfileCookie(() => {
          return cb();
        });
      });
    });
  }

  //this is to make sure that the cookies was setted
  _getProfileCookie(cb) {
    req.get(moviesBase.replace('$id', 2), (err, response, body) => {
      if (err) throw err;
      req.get(moviesBase.replace('$id', 4), (err, response, body) => {
        if (err) throw err;
        cb();
      });
    });
  }
}
