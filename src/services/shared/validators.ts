import { Product } from '../products/interfaces/product';
import { User } from '../users/interfaces/user';

export class MissingFieldError extends Error {
  constructor(missingField: string) {
    super(`Value for ${missingField} expected!`);
  }
}

const validateProduct = (arg: any) => {
  if ((arg as Product).id == undefined) {
    throw new MissingFieldError('id');
  }
  if ((arg as Product).productName == undefined) {
    throw new MissingFieldError('productName');
  }
  if ((arg as Product).productPrice == undefined) {
    throw new MissingFieldError('productPrice');
  }
  if ((arg as Product).userID == undefined) {
    throw new MissingFieldError('userID');
  }
}

const validateUser = (arg: any) => {
  if ((arg as User).id == undefined) {
    throw new MissingFieldError('id');
  }
  if ((arg as User).username == undefined) {
    throw new MissingFieldError('username');
  }
  if ((arg as User).active == undefined) {
    throw new MissingFieldError('active');
  }
}

export { validateUser, validateProduct };