import { Request, Response } from 'express';
import { optimizeImage } from '../services/imageService';
import { analyzeImage } from '../services/aiService';
import { CONFIG } from '../config';

export const handleAnalysis = async (req: Request, res: Response): Promise<any> => {
  const start = Date.now();
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    if (!CONFIG.AZURE.KEY) return res.status(500).json({ error: 'Server misconfiguration: Missing AI API Key' });

    // Performance: Optimize image immediately to free up Multer buffer reference ASAP (if GC runs)       
    const imageResult = await optimizeImage(req.file.buffer);

    console.log(`[Perf] Image: ${(req.file.size / 1024).toFixed(1)}KB -> ${imageResult.sizeKB}KB | Opt: ${Date.now() - start}ms`);

    const userNotes = req.body.notes || '';

    // Call AI Service
    const aiStart = Date.now();
    const analysisResult = await analyzeImage(userNotes, imageResult.dataUrl);

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.json(analysisResult);

    console.log(`[Perf] AI Latency: ${Date.now() - aiStart}ms | Total: ${Date.now() - start}ms`);

  } catch (error: any) {
    console.error('[Error] Analysis Failed:', error.message);

    const status = error.status || 500;
    const msg = error.status === 429 ? 'Rate limit exceeded.' : 'Internal server error';

    res.status(status).json({ error: msg, details: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};
