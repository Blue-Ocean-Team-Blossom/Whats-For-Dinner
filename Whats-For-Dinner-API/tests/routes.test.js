const request = require('supertest')
const {app, listen} = require('../server')
const db = require('../database/index.js')

// this doesn't do anything
afterAll(() => {
  db.close();
  listen.close();
  });

describe('Get Endpoints', () => {
  it('should get', async () => {
    const res = await request(app)
      .get('/pantry?id=1')
      .send({
        userId: 1,
        title: 'test is cool',
      })
    expect(res.statusCode).toEqual(200)
  })
})