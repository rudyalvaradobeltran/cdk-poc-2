import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, PutItemCommand  } from "@aws-sdk/client-dynamodb";
import { v4 } from "uuid";

const insert = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
  const randomId = v4();
  const item = JSON.parse(event.body || '');

  const result = await ddbClient.send(new PutItemCommand({
    TableName: process.env.TABLE_NAME,
    Item: {
      id: {
        S: randomId
      },
      productName: {
        S: item.productName
      },
      productPrice: {
        N: item.productPrice
      },
      userID: {
        S: item.userID
      }
    }
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