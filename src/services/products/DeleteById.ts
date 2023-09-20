import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { hasAdminGroup } from "../shared/permissions";

const deleteById = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
  if(event.queryStringParameters && 'id' in event.queryStringParameters && event.queryStringParameters['id']) {
    if (!hasAdminGroup(event)) {
      return {
        statusCode: 401,
        body: JSON.stringify(`Not authorized`)
      }
    }

    const productId = event.queryStringParameters['id'];
    
    const deletedProductById = await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: { S: productId }
      },
    }));

    if (deletedProductById) {
      return {
        statusCode: 200,
        body: JSON.stringify(`Product with id ${productId} deleted successfully`)
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

export { deleteById };