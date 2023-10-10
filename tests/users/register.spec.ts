import request from 'supertest';
import app from '../../src/app';

describe('POST /auth/register', () => {
  describe('Given all fields', () => {
    it('Should return the 201 status code', async () => {
      // Arrange
      const userData = {
        firstName: 'Muhaimin',
        lastName: 'Ikhlas',
        email: 'muhaiming2c@gmail.com',
        password: 'secret',
      };

      //Act
      const response = await request(app).post('/auth/register').send(userData);

      // Assert
      expect(response.statusCode).toBe(201);
    });

    it('Should return valid json', async () => {
      const userData = {
        firstName: 'Muhaimin',
        lastName: 'Ikhlas',
        email: 'muhaiming2c@gmail.com',
        password: 'secret',
      };

      const response = await request(app).post('/auth/register').send(userData);

      expect(
        (response.headers as Record<string, string>)['content-type'],
      ).toEqual(expect.stringContaining('json'));
    });
  });
  describe('Fields are missing', () => {});
});
