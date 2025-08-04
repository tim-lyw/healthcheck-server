import { Request, Response } from 'express';
import Declaration from '../models/Declaration';

export const createDeclaration = async (req: Request, res: Response): Promise<void> => {
  try {
    // Basic input validation
    const { name, temperature, hasSymptoms, contactWithCovid } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ message: 'Name is required and must be a non-empty string' });
      return;
    }
    
    if (typeof temperature !== 'number' || temperature < 35 || temperature > 42) {
      res.status(400).json({ message: 'Temperature must be a number between 35 and 42' });
      return;
    }
    
    if (typeof hasSymptoms !== 'boolean') {
      res.status(400).json({ message: 'hasSymptoms must be a boolean' });
      return;
    }
    
    if (typeof contactWithCovid !== 'boolean') {
      res.status(400).json({ message: 'contactWithCovid must be a boolean' });
      return;
    }

    const declaration = new Declaration(req.body);
    const savedDeclaration = await declaration.save();
    res.status(201).json(savedDeclaration);
  } catch (error) {
    console.error('Error creating declaration:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ message });
  }
};

export const getAllDeclarations = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      Declaration.find()
        .sort({ submissionDate: -1 })
        .skip(skip)
        .limit(limit),
      Declaration.countDocuments()
    ]);
    
    res.status(200).json({ data, total, page, limit });
  } catch (error) {
    console.error('Error fetching declarations:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message });
  }
}; 