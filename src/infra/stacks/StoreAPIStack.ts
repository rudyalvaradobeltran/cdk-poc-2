import { Stack, StackProps } from 'aws-cdk-lib';
import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, MethodOptions, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
  lambdaIntegration: {
    productsIntegration: LambdaIntegration;
    usersIntegration: LambdaIntegration;   
  },
  userPool: IUserPool;
}

export class StoreApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    const api = new RestApi(this, 'Store');
    const authorizer = new CognitoUserPoolsAuthorizer(this, 'StoreAuthorizer', {
      cognitoUserPools: [props.userPool],
      identitySource: 'method.request.header.Authorization',
    });
    authorizer._attachToApi(api);
    const optionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId
      }
    }
    const usersResource = api.root.addResource('users');
    const productsResource = api.root.addResource('products');
    productsResource.addResource('getAll').addMethod('GET', props.lambdaIntegration.productsIntegration, optionsWithAuth);
    productsResource.addResource('getById').addMethod('GET', props.lambdaIntegration.productsIntegration, optionsWithAuth);
    productsResource.addResource('insert').addMethod('PUT', props.lambdaIntegration.productsIntegration, optionsWithAuth);
    productsResource.addResource('updateById').addMethod('POST', props.lambdaIntegration.productsIntegration, optionsWithAuth);
    productsResource.addResource('deleteById').addMethod('DELETE', props.lambdaIntegration.productsIntegration, optionsWithAuth);
    usersResource.addResource('insert').addMethod('PUT', props.lambdaIntegration.usersIntegration, optionsWithAuth);
    usersResource.addResource('getById').addMethod('GET', props.lambdaIntegration.usersIntegration, optionsWithAuth);
  }
}