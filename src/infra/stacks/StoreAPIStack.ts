import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
  lambdaIntegration: {
    productsIntegration: LambdaIntegration;
    usersIntegration: LambdaIntegration;   
  }
}

export class StoreApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    const api = new RestApi(this, 'Store');
    const usersResource = api.root.addResource('users');
    const productsResource = api.root.addResource('products');
    productsResource.addResource('getAll').addMethod('GET', props.lambdaIntegration.productsIntegration);
    productsResource.addResource('getById').addMethod('GET', props.lambdaIntegration.productsIntegration);
    productsResource.addResource('insert').addMethod('PUT', props.lambdaIntegration.productsIntegration);
    productsResource.addResource('updateById').addMethod('POST', props.lambdaIntegration.productsIntegration);
    productsResource.addResource('deleteById').addMethod('DELETE', props.lambdaIntegration.productsIntegration);
    usersResource.addResource('insert').addMethod('PUT', props.lambdaIntegration.usersIntegration);
    usersResource.addResource('getById').addMethod('GET', props.lambdaIntegration.usersIntegration);
  }
}