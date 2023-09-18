import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, PutItemCommand  } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 } from "uuid";
import { validateProduct } from "../shared/validators";

const insert = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
  const randomId = v4();
  const item = JSON.parse(event.body || '');

  item.id = randomId;

  validateProduct(item);

  const result = await ddbClient.send(new PutItemCommand({
    TableName: process.env.TABLE_NAME,
    Item: marshall(item)
  }));

  if (result) {
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Created', id: randomId })
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Database error' })
    }
  }
}

export { insert };