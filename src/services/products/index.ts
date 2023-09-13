import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getAll } from "./GetAll";
import { getById } from "./GetById";
import { deleteById } from "./DeleteById";
import { updateById } from "./UpdateById";
import { insert } from "./Insert";

const ddbClient = new DynamoDBClient({});

const productsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    switch (event.path.split("/")[1]) {
      case "getAll":
        const getAllResponse = await getAll(event, ddbClient);
        return getAllResponse;
      case "getById":
        const getByIdResponse = await getById(event, ddbClient);
        return getByIdResponse;
      case "deleteById":
        const deleteByIdResponse = await deleteById(event, ddbClient);
        return deleteByIdResponse;
      case "updateById":
        const updateByIdResponse = await updateById(event, ddbClient);
        return updateByIdResponse;
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

export { productsHandler };