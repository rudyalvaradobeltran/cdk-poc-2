import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login('Rudy', 'Hola@2023');
  console.log({ test: loginResult.getSignInUserSession()?.getIdToken().getJwtToken() });
}

testAuth();