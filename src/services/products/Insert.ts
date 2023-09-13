import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, PutItemCommand  } from "@aws-sdk/client-dynamodb";
import { v4 } from "uuid";

const insert = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
  const randomId = v4();
  const item = JSON.parse(event.body || '');

  const result = await ddbClient.send(new PutItemCommand({
    TableName: process.env.TABLE_PRODUCTS_NAME,
    Item: {
      id: {
        S: randomId
      },
      name: {
        S: item.name
      },
      price: {
        N: item.price
      },
      userID: {
        S: item.userID
      }
    }
  }));

  return {
    statusCode: 400,
    body: JSON.stringify({})
  }
}

export { insert };