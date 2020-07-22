const { client_id } = require('../config/config.js');
const _ = require('underscore');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(client_id);

async function googleVerifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: [client_id],
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  return {
    name: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
    password: ':)',
  };
}

// verify().catch(console.error);

module.exports = {
  googleVerifyToken,
};
