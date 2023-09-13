import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class StoreDynamoStack extends Stack {
  public readonly userTable: ITable;
  public readonly productTable: ITable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
   
    this.userTable = new Table(this, 'Users', {
      partitionKey : {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: 'Users'
    });

    this.productTable = new Table(this, 'Products', {
      partitionKey : {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: 'Products'
    })
  }
}