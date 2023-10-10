import app from './src/app';
import { calculateDiscount } from './src/utils';
import request from 'supertest';

describe.skip('App', () => {
  it('should calculate discount', () => {
    const result = calculateDiscount(100, 10);
    expect(result).toBe(10);
  });

  it('should return 200 status', async () => {
    const respose = await request(app).get('/').send();
    expect(respose.statusCode).toBe(200);
  });
});
