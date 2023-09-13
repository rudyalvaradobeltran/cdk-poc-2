import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getById } from "./GetById";
import { insert } from "./Insert";

const ddbClient = new DynamoDBClient({});

const usersHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    switch (event.path.split("/")[1]) {
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

export { usersHandler };