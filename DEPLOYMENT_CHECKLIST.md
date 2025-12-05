# 🚀 Quick Deployment Checklist

## Step 1: Verify Google Services

### Google Calendar
1. Go to [Google Calendar](https://calendar.google.com)
2. Find your calendar with ID: `f7260b83232e321776630ebbb904f0a6a043d37f0905f5bfd6ac9a7dffca2cae@group.calendar.google.com`
3. Click Settings ⚙️ → Share with specific people
4. Add: `torre-piedra-bot@handy-contact-465921-e4.iam.gserviceaccount.com`
5. Permission: **Make changes to events**

### Google Sheets
1. Open: https://docs.google.com/spreadsheets/d/1-fMwnJ-XweG16klBZyPvFdrt68bTH8f59dKLpATS3Uw
2. Create a sheet named: **Citas** (if doesn't exist)
3. Click Share → Add: `torre-piedra-bot@handy-contact-465921-e4.iam.gserviceaccount.com`
4. Permission: **Editor**

---

## Step 2: Deploy to Vercel

```bash
# Add all new files
git add .

# Commit changes
git commit -m "🤖 Rebuild Torre de Piedra agent with serverless architecture

- Add /api/agent-chat endpoint with Gemini AI
- Add /api/agent-schedule with Calendar + Sheets integration
- Create new TorrePiedraAgent widget
- Update Hidden1 to use new agent
- Configure Vercel for serverless functions"

# Push to GitHub
git push origin main
```

Vercel will automatically deploy! ⚡

---

## Step 3: Verify Deployment

After Vercel finishes:

1. **Check API Endpoints:**
   - Visit: `https://your-site.vercel.app/api/agent-chat`
   - Should see: `{"error":"Method not allowed"}` ✅ (This is correct - it only accepts POST)

2. **Test the Agent:**
   - Go to: `https://your-site.vercel.app/hidden1`
   - Password: `hector1234`
   - Chat with agent
   - Schedule an appointment
   - Check Google Calendar for event
   - Check Google Sheets for new row

---

## Step 4: Monitor & Debug

### View Logs:
```bash
vercel logs --follow
```

### Common Issues:

**"AI service not configured"**
→ Environment variable missing. Check Vercel dashboard.

**"Failed to initialize Google authentication"**
→ Check `GOOGLE_CREDENTIALS_JSON` in Vercel.

**Calendar event not created**
→ Verify service account has calendar permissions.

**Sheet not updated**
→ Verify sheet is named "Citas" and has permissions.

---

## ✅ Done!

Your new agent is ready with:
- ✅ Gemini AI conversations
- ✅ Google Calendar integration
- ✅ Google Sheets logging
- ✅ Professional UI
- ✅ Secure serverless architecture

Read `TORRE_PIEDRA_AGENT_SETUP.md` for detailed documentation.
