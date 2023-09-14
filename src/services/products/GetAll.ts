import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const getAll = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
  const products = await ddbClient.send(new ScanCommand({
    TableName: process.env.TABLE_NAME,
  }));

  const unmashalledProducts = products.Items?.map(item => unmarshall(item));

  if (products) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success', data: unmashalledProducts }),
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify('No data found')
    }
  }
 
}

export { getAll };