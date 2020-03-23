import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

const product = (_,args) => {
  return Product.findById(args.id).exec();
};

const products = () => {
  return Product.find({}).exec();
};

const newProduct = (_,args,ctx) => {
  return Product.create({...args.input, createdBy: ctx.user._id});
};

const updateProduct = (_,args,ctx) => {
  return Product.findByIdAndUpdate(args.id,args.input, {new: true});
};

const removeProduct = (_,args,ctx) => {
  return Product.findByIdAndRemove(args.id);
};

export default {
  Query: {
    products,
    product
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    __resolveType(product) {},
    createdBy(product) {
      return User.findById(product.createdBy).exec();
    }
  }
}
