/**
 * Simple test endpoint to verify API is working
 */
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    success: true,
    message: 'API is working',
    timestamp: new Date().toISOString(),
    hasGoogleCredentials: !!process.env.GOOGLE_CREDENTIALS_JSON,
    hasCalendarId: !!process.env.GOOGLE_CALENDAR_ID,
    hasSheetId: !!process.env.GOOGLE_SHEET_ID,
    body: req.body
  });
}
