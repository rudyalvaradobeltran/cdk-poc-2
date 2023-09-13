import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
  lambdaIntegration: LambdaIntegration;
}

export class StoreApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    const api = new RestApi(this, 'Store');
    const usersResource = api.root.addResource('users');
    const productsResource = api.root.addResource('products');
    usersResource.addMethod('POST', props.lambdaIntegration);
    productsResource.addMethod('GET', props.lambdaIntegration);
    productsResource.addMethod('POST', props.lambdaIntegration);
    productsResource.addMethod('DELETE', props.lambdaIntegration);
    productsResource.addMethod('PUT', props.lambdaIntegration);
  }
}