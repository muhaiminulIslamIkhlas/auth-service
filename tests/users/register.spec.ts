import 'reflect-metadata';

import request from 'supertest';
import app from '../../src/app';
import { AppDataSource } from '../../src/config/data-source';
import { DataSource } from 'typeorm';
import { User } from '../../src/entity/User';
import { Roles } from '../../src/const';

describe('POST /auth/register', () => {
  let connection: DataSource;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();
  });

  beforeEach(async () => {
    // Database trancate
    await connection.dropDatabase();
    await connection.synchronize();
    // await truncateTables(connection);
  });

  afterAll(async () => {
    await connection.destroy();
  });

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

    it('should persist the user in database', async () => {
      const userData = {
        firstName: 'Muhaimin',
        lastName: 'Ikhlas',
        email: 'muhaiming2c@gmail.com',
        password: 'secret',
      };

      await request(app).post('/auth/register').send(userData);

      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();
      expect(users).toHaveLength(1);
      expect(users[0].firstName).toBe(userData.firstName);
      expect(users[0].lastName).toBe(userData.lastName);
      expect(users[0].email).toBe(userData.email);
    });

    // it('should return an ID', async () => {
    //   const userData = {
    //     firstName: 'Muhaimin',
    //     lastName: 'Ikhlas',
    //     email: 'muhaiming2c@gmail.com',
    //     password: 'secret',
    //   };

    //   const user = await request(app).post('/auth/register').send(userData);

    //   expect(user).toMatchObject({id: 1});
    // });

    it('should assign a customer role', async () => {
      const userData = {
        firstName: 'Muhaimin',
        lastName: 'Ikhlas',
        email: 'muhaiming2c@gmail.com',
        password: 'secret',
      };

      await request(app).post('/auth/register').send(userData);

      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();

      expect(users[0]).toHaveProperty('role');
      expect(users[0].role).toBe(Roles.CUSTOMER);
    });
  });
  describe('Fields are missing', () => {});
});
