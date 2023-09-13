import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { productsHandler } from "./products";
import { usersHandler } from "./users";

const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    switch (event.path.split("/")[0]) {
      case "users":
        const usersResponse = await usersHandler(event);
        return usersResponse;
      case "products":
        const productsResponse = await productsHandler(event);
        return productsResponse;
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
};

export { handler };
