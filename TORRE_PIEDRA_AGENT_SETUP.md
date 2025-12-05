# 🏗️ Torre de Piedra Zarú Digital Assistant - Complete Setup Guide

## 📋 Overview

This is a **completely rebuilt** digital assistant for your Hidden1 page, designed to:
- Provide information about Torre de Piedra Zarú development
- Schedule appointments via Google Calendar
- Log appointments to Google Sheets
- Use Gemini AI for intelligent conversations

---

## 🔴 Why the Old Assistant Failed

### Root Causes:
1. **Missing Backend Infrastructure** - No API endpoints existed (only frontend code)
2. **Client-Side Only** - Appointments saved to localStorage only
3. **No Google Integration** - Calendar and Sheets were never connected
4. **Security Risk** - Google credentials would have been exposed in frontend

### The Fix:
Complete rebuild with **serverless architecture** using Vercel Functions.

---

## 🏗️ New Architecture

```
┌─────────────────┐
│  Hidden1 Page   │
│  (Auth + UI)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ TorrePiedraAgent.jsx│ (New React Widget)
└────────┬────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│     Vercel Serverless Functions      │
│  ┌──────────────┐  ┌───────────────┐│
│  │ /api/agent-  │  │ /api/agent-   ││
│  │   chat       │  │   schedule    ││
│  └──────┬───────┘  └───────┬───────┘│
│         │                   │        │
│         ▼                   ▼        │
│    Gemini AI    Google Calendar +   │
│                   Google Sheets      │
└──────────────────────────────────────┘
```

---

## 📁 Project Structure

```
pantrio-ai/
├── api/                          # ✅ NEW - Serverless functions
│   ├── agent-chat.js            # Chat endpoint with Gemini AI
│   ├── agent-schedule.js        # Appointment scheduling
│   ├── package.json             # API dependencies
│   └── node_modules/            # API packages
│
├── src/
│   ├── agent/
│   │   ├── TorrePiedraAgent.jsx # ✅ NEW - Main widget
│   │   └── SecretAgentWidget.jsx # ❌ OLD - No longer used
│   │
│   └── pages/
│       └── Hidden1.jsx           # ✅ UPDATED - Uses new agent
│
└── vercel.json                   # ✅ UPDATED - Serverless config
```

---

## ⚙️ Environment Variables (Already Set in Vercel)

Your environment variables are already configured:

```env
GEMINI_API_KEY=AIzaSyAdttmwSD1cwd11s9b4KNAquDntuIVnRXc
GEMINI_MODEL=gemini-2.0-flash-exp
GOOGLE_CALENDAR_ID=f7260b83...@group.calendar.google.com
GOOGLE_SHEET_ID=1-fMwnJ-XweG16klBZyPvFdrt68bTH8f59dKLpATS3Uw
GOOGLE_CALENDAR_TIMEZONE=America/Mexico_City
GOOGLE_CREDENTIALS_JSON={...service account credentials...}
```

✅ **All environment variables are correct and ready to use.**

---

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Rebuild Torre de Piedra agent with serverless architecture"
git push origin main
```

### 2. Vercel Will Automatically:
- Detect the `/api` folder
- Install dependencies from `api/package.json`
- Deploy serverless functions
- Build your React app
- Deploy everything

### 3. Verify Deployment

After deployment, check:
- ✅ `https://your-site.vercel.app/api/agent-chat` (should return 405 for GET)
- ✅ `https://your-site.vercel.app/api/agent-schedule` (should return 405 for GET)
- ✅ `https://your-site.vercel.app/hidden1` (should show login page)

---

## 🧪 Testing the Agent

### Local Testing (Optional)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Link your project:**
```bash
vercel link
```

3. **Pull environment variables:**
```bash
vercel env pull .env.local
```

4. **Run locally:**
```bash
vercel dev
```

5. **Test at:** `http://localhost:3000/hidden1`

### Production Testing

1. Go to `https://your-site.vercel.app/hidden1`
2. Enter password: `hector1234`
3. Test the agent:
   - Ask about amenities
   - Ask about prototypes (Magnolia, Orquídea, Lirio, Dalia)
   - Say "quiero agendar una cita"
   - Fill out the appointment form
   - Submit and verify:
     - Google Calendar event is created
     - Google Sheets gets a new row
     - You receive email confirmation

---

## 🔧 Google Calendar & Sheets Setup Verification

### Google Calendar Setup

Your calendar is already configured, but verify:

1. Go to [Google Calendar](https://calendar.google.com)
2. Settings → Your calendar settings
3. Find calendar ID: `f7260b83...@group.calendar.google.com`
4. Verify service account has access:
   - Share calendar with: `torre-piedra-bot@handy-contact-465921-e4.iam.gserviceaccount.com`
   - Permission: **Make changes to events**

### Google Sheets Setup

1. Open your sheet: [Sheet ID: 1-fMwnJ-XweG16klBZyPvFdrt68bTH8f59dKLpATS3Uw](https://docs.google.com/spreadsheets/d/1-fMwnJ-XweG16klBZyPvFdrt68bTH8f59dKLpATS3Uw)
2. Create a sheet named **"Citas"** (if it doesn't exist)
3. Share with service account:
   - Email: `torre-piedra-bot@handy-contact-465921-e4.iam.gserviceaccount.com`
   - Permission: **Editor**

The API will automatically create these headers:
| Fecha Registro | Fecha Cita | Hora | Nombre | Teléfono | Email | Prototipo | Notas | Fuente | Estado |

---

## 🎯 Agent Capabilities

### Knowledge Base

The agent knows about:

**Development Info:**
- Location: Desarrollo Zarú, Querétaro
- Developer: Vialli (14+ years, 2,663 families, 20 projects)

**Amenities:**
- Controlled access, pool, clubhouse, gym, terrace, playgrounds, etc.

**Location/Proximity:**
- Paseo Querétaro: 8 min
- Universidad Anáhuac: 10 min
- Blvd. Bernardo Quintana: 12 min
- Centro Histórico: 20 min

**Prototypes:**
1. **Magnolia** - 3 bed, 2.5 bath, 125m², 90m² lot
2. **Orquídea** - 3 bed, 3.5 bath, 145m², 105m² lot
3. **Lirio** - 4 bed, 3.5 bath, 165m², 120m² lot
4. **Dalia** - 4 bed, 4.5 bath, 185m², 140m² lot

### Conversation Flow

1. **Greeting:** Always introduces itself as Pantrio.dev assistant
2. **Information:** Answers questions professionally and concisely
3. **Scheduling:** Detects when user wants to schedule and shows form
4. **Closure:** Ends conversation when user says "no" or "that's all"
5. **Follow-up:** Always asks "¿Hay algo más en lo que pueda ayudarte?"

---

## 🐛 Troubleshooting

### Issue: 500 Error on Chat
**Solution:**
- Check Vercel logs for API errors
- Verify `GEMINI_API_KEY` is set
- Check Gemini API quota

### Issue: Appointment Not Created
**Solution:**
- Check Google Calendar sharing permissions
- Verify service account has "Make changes to events"
- Check Vercel logs for Google API errors

### Issue: Sheets Not Updating
**Solution:**
- Check sheet is named "Citas"
- Verify service account has Editor permission
- Check sheet ID matches environment variable

### Issue: Widget Not Loading
**Solution:**
- Check browser console for errors
- Verify `/api/agent-chat` endpoint is accessible
- Clear browser cache

### View Logs:
```bash
vercel logs your-deployment-url
```

---

## 📊 API Endpoints Documentation

### POST /api/agent-chat

**Request:**
```json
{
  "message": "¿Cuáles son las amenidades?",
  "conversationHistory": [
    { "type": "bot", "text": "Hola..." },
    { "type": "user", "text": "Hola" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "reply": "Las amenidades incluyen...",
  "showScheduleButton": false,
  "conversationEnded": false,
  "timestamp": "2024-12-04T..."
}
```

### POST /api/agent-schedule

**Request:**
```json
{
  "nombre": "Juan Pérez",
  "telefono": "4421234567",
  "email": "juan@example.com",
  "fecha": "2024-12-10",
  "hora": "14:00",
  "prototipo": "Magnolia",
  "notas": "Interesado en planta baja"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cita agendada exitosamente",
  "appointment": { ... },
  "calendar": {
    "eventId": "abc123",
    "eventLink": "https://calendar.google.com/..."
  },
  "sheets": {
    "logged": true
  }
}
```

---

## ✅ Final Checklist

Before going live:

- [ ] Code pushed to GitHub
- [ ] Vercel deployment successful
- [ ] Environment variables verified in Vercel dashboard
- [ ] Google Calendar shared with service account
- [ ] Google Sheets shared with service account
- [ ] Sheet named "Citas" exists
- [ ] Test conversation flow
- [ ] Test appointment scheduling
- [ ] Verify calendar event created
- [ ] Verify sheets row added
- [ ] Test email notifications

---

## 🎉 Summary of Changes

### ✅ Created (New Files):
- `api/agent-chat.js` - Chat endpoint
- `api/agent-schedule.js` - Scheduling endpoint
- `api/package.json` - API dependencies
- `src/agent/TorrePiedraAgent.jsx` - New widget

### 📝 Modified (Updated Files):
- `src/pages/Hidden1.jsx` - Now uses TorrePiedraAgent
- `vercel.json` - Added serverless function config

### ❌ Deprecated (No longer used):
- `src/agent/SecretAgentWidget.jsx` - Old implementation (can be deleted)

---

## 🆘 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify all environment variables
3. Test API endpoints directly
4. Check Google Calendar/Sheets permissions
5. Review browser console for frontend errors

---

**Built with:**
- React 18
- Gemini 2.0 Flash AI
- Google Calendar API
- Google Sheets API
- Vercel Serverless Functions

**Last Updated:** December 2024
