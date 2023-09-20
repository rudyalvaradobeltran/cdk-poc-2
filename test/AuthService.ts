import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";

const awsRegion = 'us-east-1';

Amplify.configure({
  Auth: {
    region: awsRegion,
    userPoolId: "us-east-1_XpPeV0tjm",
    userPoolWebClientId: "22sqiok1ek97qi2ggk0b7j9rdh",
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
})

export class AuthService {
  public async login(userName: string, password: string) {
    const result = await Auth.signIn(userName, password) as CognitoUser;
    return result;
  }
}