# Contact Form Setup Instructions

Your contact form is now set up and ready to send emails! Here's how to complete the setup:

## Option 1: Formspree (Recommended - Free & Easy)

### Steps:
1. **Sign up for Formspree**
   - Go to [https://formspree.io](https://formspree.io)
   - Create a free account (allows 50 submissions/month)

2. **Create a New Form**
   - Click "New Form" in your Formspree dashboard
   - Give it a name (e.g., "Portfolio Contact Form")
   - Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)

3. **Update Your HTML**
   - Open `index.html`
   - Find this line:
     ```html
     <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     ```
   - Replace `YOUR_FORM_ID` with your actual form ID
   - Example:
     ```html
     <form class="contact-form" action="https://formspree.io/f/xyzabc123" method="POST">
     ```

4. **Test Your Form**
   - Open your website
   - Fill out and submit the contact form
   - Check your email for the message!

### Formspree Features:
- ✅ Free tier available (50 submissions/month)
- ✅ Spam protection built-in
- ✅ Email notifications
- ✅ No backend code required
- ✅ Works with static sites

---

## Option 2: EmailJS (Alternative)

If you prefer EmailJS, here's how to set it up:

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Create a free account
3. Add an email service (Gmail, Outlook, etc.)
4. Create an email template
5. Update the form to use EmailJS API

---

## Option 3: Custom Backend

If you want full control, you can create your own backend:

### Using Node.js + Express:
```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Configure your email service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });
  
  await transporter.sendMail({
    from: email,
    to: 'namiyer35@gmail.com',
    subject: subject,
    text: `From: ${name} (${email})\n\n${message}`
  });
  
  res.json({ success: true });
});

app.listen(3000);
```

---

## Current Setup

Your contact form includes:
- ✅ Name field
- ✅ Email field
- ✅ Subject field
- ✅ Message textarea
- ✅ Submit button with loading state
- ✅ GitHub and LinkedIn links below the form
- ✅ Responsive design for both themes
- ✅ Form validation (required fields)
- ✅ Smooth animations

## Testing

Before deploying, test your form by:
1. Opening `index.html` in a browser
2. Filling out all fields
3. Clicking "Send Message"
4. Checking your email for the message

---

## Troubleshooting

**Form doesn't submit:**
- Make sure you replaced `YOUR_FORM_ID` with your actual Formspree form ID
- Check browser console for errors (F12)

**Not receiving emails:**
- Check your spam folder
- Verify your Formspree email settings
- Test with a different email address

**Styling issues:**
- Clear browser cache (Ctrl+F5)
- Check that both `styles.css` and `contact-form.js` are loaded

---

## Need Help?

- Formspree Documentation: [https://help.formspree.io](https://help.formspree.io)
- EmailJS Documentation: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
