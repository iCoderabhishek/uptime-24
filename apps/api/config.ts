import { config } from "dotenv";
import jwksClient from "jwks-rsa";

config();

// Clerk JWKS client
export const clerkJwksClient = jwksClient({
  jwksUri: 'https://giving-pug-4.clerk.accounts.dev/.well-known/jwks.json',
  requestHeaders: {}, // Optional
  timeout: 30000, // Defaults to 30s
});

// Function to get signing key
export const getClerkSigningKey = (kid: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    clerkJwksClient.getSigningKey(kid, (err, key) => {
      if (err) {
        reject(err);
      } else {
        const signingKey = key?.getPublicKey();
        resolve(signingKey || '');
      }
    });
  });
};