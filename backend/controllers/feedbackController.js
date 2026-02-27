const nodemailer = require('nodemailer');

const submitFeedback = async (req, res) => {
    try {
        const { type, message, userEmail, userName } = req.body;

        if (!type || !message) {
            return res.status(400).json({ 
                success: false,
                message: "Type and message are required" 
            });
        }

        // Create email transporter
        // For production, use environment variables for email credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'your-email@gmail.com',
                pass: process.env.EMAIL_PASS || 'your-app-password'
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER || 'noreply@devnest.com',
            to: 'ugonnaaninwodo@gmail.com',
            subject: `DevNest Feedback: ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                    <div style="background-color: #1F6FEB; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="color: white; margin: 0;">New Feedback from DevNest</h2>
                    </div>
                    
                    <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
                        <h3 style="color: #333; margin-top: 0;">Feedback Details</h3>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Type:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">
                                    ${type === 'suggestion' ? '💡 Suggestion' : 
                                      type === 'bug' ? '🐛 Bug Report' : 
                                      type === 'feature' ? '✨ Feature Request' : 
                                      type === 'improvement' ? '🚀 Improvement' : 
                                      '💬 Other'}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">From:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${userName || 'Unknown'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${userEmail || 'No email provided'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Date:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${new Date().toLocaleString()}</td>
                            </tr>
                        </table>
                        
                        <div style="margin-top: 30px;">
                            <h4 style="color: #333; margin-bottom: 10px;">Message:</h4>
                            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; border-left: 4px solid #1F6FEB;">
                                <p style="color: #333; margin: 0; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
                        <p>This is an automated message from DevNest Feedback System</p>
                    </div>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            success: true,
            message: "Feedback submitted successfully" 
        });

    } catch (error) {
        console.error('Feedback submission error:', error);
        
        // Even if email fails, we can log it and return success to user
        // This prevents poor UX when email service is down
        res.status(200).json({ 
            success: true,
            message: "Feedback received and will be reviewed" 
        });
    }
};

module.exports = { submitFeedback };
