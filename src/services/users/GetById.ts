import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const getById = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
  if(event.queryStringParameters && 'id' in event.queryStringParameters && event.queryStringParameters['id']) {
    const userId = event.queryStringParameters['id'];
    const userById = await ddbClient.send(new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: { S: userId }
      }
    }));

    if (userById.Item) {
      const unmashalledProducts = unmarshall(userById.Item);

      return {
        statusCode: 200,
        body: JSON.stringify(unmashalledProducts)
      }
    } else {
        return {
          statusCode: 404,
          body: JSON.stringify(`User with id ${userId} not found`)
        }
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad request' })
    }
  }
}

export { getById };