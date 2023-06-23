const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;
const AUTH = "Barrier 10a7a597-9977-4aff-ae4d-391494f4eb02";

async function getToken() {
  const response = await request
    .post("/authentications")
    .send({
      email: "hasnatoko@gmail.com",
      password: "hasna123",
    })
    .set({
      Authorization: AUTH,
    });

  expect(response.status).to.equal(201);
  expect(response.body.data).to.have.property('accessToken');

  return response.body.data.accessToken;
}

module.exports = getToken;