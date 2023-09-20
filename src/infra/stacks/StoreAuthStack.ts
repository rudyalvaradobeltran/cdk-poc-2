import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { CfnUserPool, CfnUserPoolGroup, UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class StoreAuthStack extends Stack {
  public userPool: UserPool;
  private userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.createUserPool();
    this.createUserPoolClient();
    this.createAdminGroup();
  }

  private createUserPool() {
    this.userPool = new UserPool(this, 'UserPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true
      }
    });
    new CfnOutput(this, 'UserPoolId', { value: this.userPool.userPoolId });
  }

  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient('UserPoolClient', {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    });
    new CfnOutput(this, 'UserPoolClientId', { value: this.userPoolClient.userPoolClientId });
  }

  private createAdminGroup() {
    new CfnUserPoolGroup(this, 'StoreAdmins', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'admins'
    });
  }
}