import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const updateById = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
  if(event.queryStringParameters && 'id' in event.queryStringParameters && event.queryStringParameters['id'] && event.body) {
    const productId = event.queryStringParameters['id'];
    const item = JSON.parse(event.body || '');

    const updatedProductById = await ddbClient.send(new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: { S: productId }
      },
      UpdateExpression: "set productName = :productName, productPrice = :productPrice",
      ExpressionAttributeValues: {
        ":productName": { S: item.productName },
        ":productPrice": { S: item.productPrice }
      }
    }));

    if (updatedProductById) {
      return {
        statusCode: 200,
        body: JSON.stringify(`Product with id ${productId} updated successfully`)
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

export { updateById };