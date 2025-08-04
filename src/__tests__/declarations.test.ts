import request from 'supertest';
import express from 'express';
import declarationRoutes from '../routes/declarationRoutes';
import Declaration from '../models/Declaration';

const app = express();
app.use(express.json());
app.use('/api/declarations', declarationRoutes);

describe('Declaration API', () => {
  describe('POST /api/declarations', () => {
    it('should create a new declaration successfully', async () => {
      const declarationData = {
        name: 'John Doe',
        temperature: 36.5,
        hasSymptoms: false,
        contactWithCovid: true
      };

      const response = await request(app)
        .post('/api/declarations')
        .send(declarationData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('John Doe');
      expect(response.body.temperature).toBe(36.5);
      expect(response.body.hasSymptoms).toBe(false);
      expect(response.body.contactWithCovid).toBe(true);
      expect(response.body).toHaveProperty('submissionDate');
    });

    it('should return 400 for invalid temperature', async () => {
      const invalidData = {
        name: 'Person with unrealistically high temperature',
        temperature: 50,
        hasSymptoms: false,
        contactWithCovid: false
      };

      const response = await request(app)
        .post('/api/declarations')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Temperature must be a number between 35 and 42');
    });
  });

  describe('GET /api/declarations', () => {
    beforeEach(async () => {
      // Create test data for pagination testing
      const declarations = [
        { name: 'Alice Ang', temperature: 36.5, hasSymptoms: false, contactWithCovid: false },
        { name: 'Bob Boon', temperature: 37.2, hasSymptoms: true, contactWithCovid: false },
        { name: 'Charlie Chua', temperature: 36.8, hasSymptoms: false, contactWithCovid: true }
      ];
      await Declaration.insertMany(declarations);
    });

    it('should return paginated declarations with correct structure', async () => {
      const response = await request(app)
        .get('/api/declarations?page=1&limit=2')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page');
      expect(response.body).toHaveProperty('limit');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.total).toBe(3);
      expect(response.body.page).toBe(1);
      expect(response.body.limit).toBe(2);
    });
  });
});