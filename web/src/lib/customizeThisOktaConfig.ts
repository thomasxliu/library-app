export const customizeThisOktaConfig = {
  clientId: "<Your own client ID>",
  issuer: "https://<Your own dev env url>/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true
};
