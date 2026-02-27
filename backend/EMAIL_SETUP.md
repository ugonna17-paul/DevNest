# Email Setup for Feedback System

The feedback system sends emails to `ugonnaaninwodo@gmail.com` when users submit feedback through the dashboard.

## Setup Instructions

### Gmail Configuration

1. **Use a Gmail Account** (recommended)
   - You can use your existing Gmail or create a new one for the application

2. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Navigate to Security
   - Enable 2-Step Verification

3. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other" (give it a custom name like "DevNest")
   - Click "Generate"
   - Copy the 16-character password

4. **Update .env File**
   - Copy `.env.example` to `.env`
   - Update the following variables:
   ```
   EMAIL_USER=your-actual-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ```

5. **Restart the Server**
   ```bash
   npm start
   ```

## Testing

To test the feedback system:
1. Log into the dashboard
2. Click the blue feedback button (bottom right)
3. Fill out the feedback form
4. Submit
5. Check the email inbox for ugonnaaninwodo@gmail.com

## Troubleshooting

- **Email not sending**: Check that your app password is correct
- **Authentication error**: Verify 2FA is enabled on your Gmail account
- **Still not working**: The controller is designed to gracefully handle email errors, so users will still see success messages even if email fails

## Alternative Email Providers

If you want to use a different email provider:
- Update the `service` in `feedbackController.js`
- Or use custom SMTP settings:
  ```javascript
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  ```

## Security Notes

- ⚠️ Never commit `.env` file to version control
- ✅ `.env` is already added to `.gitignore`
- ✅ Use environment-specific credentials for production
- ✅ The app password is different from your regular Gmail password
