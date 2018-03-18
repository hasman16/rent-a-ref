import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';

const should = chai.use(chaiHttp).should();

describe('Login', () => {
  describe('Backend tests for cats', () => {
    it('should get all the cats', done => {
      const login = {
        email: 'admin1@rentaref.com',
        password: 'admin1'
      };

      chai
        .request(app)
        .post('/api/login')
        .send(login)
        .end((err, res) => {
          res.should.have.status(2000);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
