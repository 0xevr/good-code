# Lead Management Guide - GoodCode

## 📧 Where Your Leads Go

### Current Setup
All form submissions currently show success messages to users, but you need to connect them to receive actual leads.

### Recommended Options (Choose One)

## Option 1: Email-Based (Easiest) ⭐
**Perfect for: Getting started quickly**

### Setup Steps:
1. **Use Formspree** (free for 50 submissions/month)
   - Go to https://formspree.io
   - Sign up with your email
   - Create a form endpoint
   - Replace form actions in your components

### Implementation:
```typescript
// In your form components, update the form action:
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" />
  <input type="text" name="name" />
  <button type="submit">Submit</button>
</form>
```

**Result**: Leads sent directly to your email inbox

---

## Option 2: Google Sheets (Simple Dashboard) ⭐⭐
**Perfect for: Basic lead tracking and organization**

### Setup Steps:
1. **Create Google Sheet** with columns:
   - Timestamp, Name, Email, Phone, Service, Experience, Goals, Message
2. **Use Google Forms** or **Zapier** to connect submissions
3. **Set up email notifications** from Google Sheets

**Result**: All leads in an organized spreadsheet + email notifications

---

## Option 3: Professional CRM (Advanced) ⭐⭐⭐
**Perfect for: Serious lead management and follow-up**

### Recommended Tools:
- **HubSpot** (free tier available)
- **Pipedrive** ($14/month)
- **Airtable** (free tier)

### Features:
- Lead scoring and categorization
- Automated follow-up sequences
- Analytics and conversion tracking
- Integration with calendar booking

---

## Current Form Locations in Your Site

### 1. Hero Section (`components/Hero.tsx`)
- **Free Trial Button** → BookingModal
- **School Consultation Button** → BookingModal

### 2. Interactive Pricing (`components/InteractivePricing.tsx`)
- **Plan Selection Buttons** → BookingModal
- **School Consultation Button** → BookingModal

### 3. Smart Contact Form (`components/SmartContactForm.tsx`)
- **Multi-step form** (currently just shows success)

### 4. Footer (`components/Footer.tsx`)
- **Email link**: youness@goodcode.ma
- **Phone link**: +212 12 34 56 789

---

## Quick Implementation (30 minutes)

### Step 1: Set Up Formspree
1. Go to https://formspree.io
2. Sign up with your email: `youness@goodcode.ma`
3. Create a new form
4. Copy the form endpoint: `https://formspree.io/f/YOUR_ID`

### Step 2: Update BookingModal
```typescript
// In components/BookingModal.tsx, add form submission:
const handleSubmit = async (formData) => {
  const response = await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      service: serviceType,
      message: formData.message
    })
  })
  
  if (response.ok) {
    // Show success message
  }
}
```

### Step 3: Test Your Setup
1. Submit a test form
2. Check your email for the lead
3. Verify all form fields are captured

---

## Lead Notification Email Template

**Subject**: New Lead from GoodCode Website 🎯

**Content**:
```
New lead submitted!

👤 Name: [Name]
📧 Email: [Email]  
📞 Phone: [Phone]
🎯 Service: [Service Type]
📝 Experience: [Experience Level]
🎯 Goals: [Goals]
💬 Message: [Message]
⏰ Submitted: [Timestamp]
🔥 Urgency: [Timeline]

Next steps:
1. Reply within 24 hours
2. Schedule appropriate session
3. Add to CRM/tracking system
```

---

## Monthly Lead Report Template

Track these metrics monthly:
- Total leads generated
- Conversion rate by source (hero, pricing, contact form)
- Most popular service requests
- Average response time
- Trial-to-paid conversion rate

---

## Quick Actions You Can Take Today

1. ✅ **Set up Formspree** (15 mins)
2. ✅ **Update one form component** (10 mins) 
3. ✅ **Test form submission** (5 mins)
4. ✅ **Create lead tracking spreadsheet** (10 mins)

**Total setup time: ~40 minutes**

---

## Need Help?

If you need assistance implementing any of these options, let me know which approach you'd prefer and I can:
1. Update your form components
2. Set up the backend integration
3. Create lead tracking dashboards
4. Set up automated follow-up sequences

**Recommended for most users**: Start with Formspree for immediate lead capture, then upgrade to a CRM as you grow.