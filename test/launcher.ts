import { handler } from "../src/services/products";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "Products";

handler({
  path: '/products/getAll',
  httpMethod: 'GET'
} as any, {} as any);