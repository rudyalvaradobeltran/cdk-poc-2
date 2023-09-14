import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
  productsTable: ITable;
}

export class StoreProductsLambdaStack extends Stack {
  public readonly lambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const lambdaFunction = new NodejsFunction(this, 'StoreProductLambdaFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: (join(__dirname, '..','..', 'services', 'products', 'index.ts')),
      environment: {
        TABLE_NAME: 'Products'
      }
    });

    lambdaFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.productsTable.tableArn],
      actions:[
        'dynamodb:PutItem',
        'dynamodb:Scan',
        'dynamodb:GetItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem'
      ]
    }));
    
    this.lambdaIntegration = new LambdaIntegration(lambdaFunction);
  }
}