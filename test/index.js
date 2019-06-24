import http from 'http';
import assert from 'assert';

import server from '../src/index.js';

describe('Example test on server', ()=> {
  it('should return 200 status', (done)=> {
    http.get('http://localhost:8000/', (res)=> {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});