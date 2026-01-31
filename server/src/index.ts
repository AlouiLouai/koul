import express from 'express';
import cors from 'cors';
import multer from 'multer';
import compression from 'compression';
import helmet from 'helmet';
import { CONFIG } from './config';
import { handleAnalysis } from './controllers/analysisController';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: CONFIG.IMAGE.MAX_SIZE },
});

// --- ROUTES ---
app.post('/api/analyze', upload.single('image'), handleAnalysis);

// --- SERVER ---
app.listen(CONFIG.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${CONFIG.PORT}`);
  console.log(`Model Deployment: ${CONFIG.AZURE.DEPLOYMENT}`);
});