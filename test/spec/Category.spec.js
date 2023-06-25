const request = require("supertest")("https://kasir-api.belajarqa.com")
const expect = require("chai").expect;
const getToken = require('./getToken.spec');

let authToken;

before(async () => {
  authToken = await getToken();
});

describe('Create Category', function() {
    // Positive
    it('create new category', async function() {

      const category = {
        name: 'Nike',
        description: 'Sepatu dengan merk Nike',
      };

      const response = await request
        .post('/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send(category);
        
      console.log('Response Body = ');
      console.log(await response.body);
      expect(await response.status).to.equal(201);
      expect(await response.body.data.name).to.equal("Nike");
      expect(await response.body.status).to.equal("success");
      CategoryId = await response.body.data.categoryId;
    });

    //Negative
    it('create a category without name', async () => {
      const category = {
        description: 'Sepatu dengan merk Adidas',
      };
  
      const response = await request
        .post('/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send(category);
  
      console.log('Response Body = ');
      console.log(await response.body);
      expect(await response.status).to.equal(400);
      expect(await response.body).to.have.property('status');
      expect(await response.body.message).to.equal('"name" is required');
    });
});

describe('Get Category Detail', function() {
  //Positive
  it('Get Category Detail with valid category ID', async function() {
    const response = await request
      .get(`/categories/${CategoryId}`)
      .set('Authorization', `Bearer ${authToken}`);
      
    console.log('Response Body = ');
    console.log(await response.body);
    expect(await response.status).to.equal(200);
    expect(await response.body.data.category.name).to.be.a("string");
    expect(await response.body.data.category.description).to.include("Sepatu");
  });

  //Negative
  it('invalid category ID', async function() {
    const invalidCategoryId = 'invalid_id';

    const response = await request
      .get(`/categories/${invalidCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    console.log('Response Body = ');
    console.log(await response.body);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('status');
    expect(await response.body.message).to.equal('id tidak valid');
  });
});

describe('Update Category Detail', function() {
  //Positive
   it('should update an existing category', async () => {
    const category = {
      name: 'Update-Nike',
      description: 'Sepatu dengan merk Nike',
    };

    const response = await request
      .put(`/categories/${CategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(category);

    console.log('Response Body = ');
    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.body.data.name).to.equal(category.name);
  });

  //Negative
  it('should not update a non-existent category', async () => {
    const id = '4b160a0e-ac90-4b17-a8bd';

    const category = {
      name: 'Update-Nike',
      description: 'Sepatu dengan merk Nike',
    };

    const response = await request
      .put(`/categories/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(category);
    
    console.log('Response Body = ');
    console.log(response.body);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('status');
    expect(response.body.status).to.equal('fail');
  });
});


describe('Delete Category', function() {
  //Positive
  it('should delete an existing category', async function() {
    const response = await request
      .delete(`/categories/${CategoryId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    console.log('Response Body = ');
    console.log(response.body);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status');
  });

  //Negative
  it('Delete category with invalid category ID', async function() {
    const id = '4b160a0e-ac90-4b17-a8bd';

    const response = await request
      .delete(`/categories/${id}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    console.log('Response Body = ');
    console.log(response.body);
    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal('fail');
  });
});



