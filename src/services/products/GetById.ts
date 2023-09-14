import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const getById = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
  if(event.queryStringParameters && 'id' in event.queryStringParameters && event.queryStringParameters['id']) {
    const productId = event.queryStringParameters['id'];
    const productById = await ddbClient.send(new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: { S: productId }
      }
    }));

    if (productById.Item) {
      const unmashalledProduct = unmarshall(productById.Item);
      return {
        statusCode: 200,
        body: JSON.stringify(unmashalledProduct)
      }
    } else {
        return {
          statusCode: 404,
          body: JSON.stringify(`Product with id ${productId} not found`)
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