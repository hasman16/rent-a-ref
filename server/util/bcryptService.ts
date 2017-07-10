import * as bcrypt from 'bcryptjs';
import * as Bluebird from 'bluebird';

function genSalt(length:number = 10) {
  return bcrypt.genSalt(length);
};

function hash (value: string) {
  return bcrypt.hash(value, 10);
};

function compare(value1, hash){
  return bcrypt.compare(value1, hash);
};

export { genSalt, hash, compare };
