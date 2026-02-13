/**
 * Vercel Serverless Function: /api/prototipos
 * Returns available property prototypes
 * Replaces the Python version (prototipos.py)
 */

import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filePath = join(process.cwd(), 'data', 'prototipos.json');
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    const prototipos = data.prototipos || [];

    return res.status(200).json({
      total: prototipos.length,
      prototipos
    });
  } catch (error) {
    console.error('Error loading prototipos:', error);
    return res.status(500).json({
      error: `Error obteniendo prototipos: ${error.message}`
    });
  }
}
