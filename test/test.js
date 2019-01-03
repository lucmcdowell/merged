const request = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require('../app');

const {
    correct_details,
    correct_details2,
    empty_details,
    invalid_inputs,
    correct_optional_inputs

} = require('../test/meetuptestdata/create_meetup');

chai.use(chaiHttp);

describe('Meetups', () => {
 
    describe('POST /meetups', () => {
      it('it should return 400 if required fields are empty or missing', async () => {
        const res = await chai.request(app)
          .post('/api/v1/meetups')
          .send(empty_details);

        expect(res).to.have.status(400)
        expect(res.body).to.have.property('error');
      });
  
      it('it should return 400 if input fields contain invalid input data', async () => {
        const res = await chai.request(app)
          .post('/api/v1/meetups')
          .send(invalid_inputs);
  
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
      });
  
      it('should return 201 if meetup is created successfully', async () => {
        const res = await chai.request(app)
          .post('/api/v1/meetups')
          .send(correct_details);
  
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
      });
  
      it('should create meetup with appropriate id', async () => {
        const res = await chai.request(app)
          .post('/api/v1/meetups')
          .send(correct_details2);
  
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
      });
  
      it('should create meetup without optional fields', async () => {
        const res = await chai.request(app)
          .post('/api/v1/meetups')
          .send(correct_optional_inputs);
  
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
      });
    });

    describe('GET /meetups/:id', () => {
        it('should return 200 if request is successfull', async () => {
            const res = await chai.request(app)
              .get('/api/v1/meetups/1');
      
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
          });
    
        it('should return 404 if id does not exist', async () => {
          const res = await chai.request(app)
            .get('/api/v1/meetups/10');
    
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
        });
    
      });

      describe('GET /meetups', () => {
        it('should get all meetups and return 200', async () => {
          const res = await chai.request(app)
            .get('/api/v1/meetups');
    
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
        });
      });

      describe('GET /meetups/upcoming', () => {
        it('should get all upcoming meetups', async () => {
          const res = await chai.request(app)
            .get('/api/v1/meetups/upcoming');
    
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
        });
      });
 
  });

  describe('Questions', () => {
 
    describe('POST /question', () => {
      const acceptedData = {
        id: 1,
        createdOn: Date,
        createdBy: 21, // represents the user asking the question
        meetup: 11, // represents the meetup the question is for
        title: 'Clarification',
        body: 'Could you please provide more clarifications?',
        vote: 0,
      };
  
      it('should respond with status code 201 created', (done) => {
        request(app)
          .post('/api/v1/questions')
          .send(acceptedData)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
  
    });

    describe('PATCH /questions/:id/upvote', () => {
    
    
        it('should return 200 if request is successfull', async () => {
          const res = await chai.request(app)
            .patch('/api/v1/questions/1/upvote');
    
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
        });
      });

      describe('PATCH /questions/:id/downvote', () => {
    
        it('should return 200 if request is successfull', async () => {
          const res = await chai.request(app)
            .patch('/api/v1/questions/1/downvote');
    
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
        });
      });
      
    });

