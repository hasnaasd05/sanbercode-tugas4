const request = require("supertest")("https://kasir-api.belajarqa.com")
const expect = require("chai").expect;
const getToken = require('./getToken.spec');

describe('Create Category', function() {
    let authToken;

    before(async () => {
      authToken = await getToken();
    });

    // Positive
    it('should create a new category', async function() {
      const response = await request
        .post('/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
            "name": 'Nike',
            "description": 'Sepatu dengan merk Nike',
        });
        
      console.log(await response.body)
      expect(await response.status).to.equal(201);
      expect(await response.body.data.name).to.equal("Nike");
      CategoryId = await response.body.data.categoryId;
    });

    //Negative
    it('should not create a category with missing data', async () => {
      const invalidCategory = {
        description: 'Sepatu dengan merk Adidas',
      };
  
      const response = await request
        .post('/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidCategory);
  
        console.log(await response.body)
      expect(await response.status).to.equal(400);
      expect(await response.body).to.have.property('status');
      expect(await response.body.message).to.equal('"name" is required');
    });
  
})


describe('Get Category Detail', function() {
  let authToken;

  before(async () => {
    authToken = await getToken();
  });
  it('Get detaillll', async function() {
    const response = await request
      .get(`/categories/${CategoryId}`)
      .set('Authorization', `Bearer ${authToken}`);
      
    console.log(CategoryId)
    expect(await response.status).to.equal(200);

  });

  it('should return an error for an invalid category ID', async function() {
    const invalidCategoryId = 'invalid_id';

    const response = await request
      .get(`/categories/${invalidCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('status');
    // Lakukan asser tambahan sesuai kebutuhan

    console.log(response.body);
  });
})



describe('Update Category Detail', function() {
  let authToken;

  before(async () => {
    authToken = await getToken();
  });

   // Positive scenario: Update an existing category
   it('should update an existing category', async () => {
    const updatedCategory = {
      name: 'Update-Nike',
      description: 'Sepatu dengan merk Nike',
    };

    const response = await request
      .put(`/categories/${CategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedCategory);

    console.log(response.body)
    expect(response.status).to.equal(200);
    expect(response.body.data.name).to.equal(updatedCategory.name);
  });

  // Negative scenario: Update a non-existent category
  it('should not update a non-existent category', async () => {
    const nonExistentCategoryId = 'non-existent-id';

    const updatedCategory = {
      name: 'Update-Nike',
      description: 'Sepatu dengan merk Nike',
    };

    const response = await request
      .put(`/categories/${nonExistentCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedCategory);

    console.log(response.body)

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('status');
    expect(response.body.status).to.equal('fail');
  });
})

