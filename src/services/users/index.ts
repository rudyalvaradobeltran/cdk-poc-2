import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getById } from "./GetById";
import { insert } from "./Insert";

const ddbClient = new DynamoDBClient({});

const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    switch (event.path.split("/")[2]) {
      case "getById":
        const getByIdResponse = await getById(event, ddbClient);
        return getByIdResponse;
      case "insert":
        const insertResponse = await insert(event, ddbClient);
        return insertResponse;
      default:
        break;
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({ message: "Not found." }),
  };

  return response;
}

export { handler };