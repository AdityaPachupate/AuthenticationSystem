import { mailtrapClient , sender} from "./mailtrap.config.js"
import { 
    WELCOME_SIGNUP_SUCCESS_TEMPLATE , 
    PASSWORD_RESET_REQUEST_TEMPLATE, 
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE
} from "./emailTemplates.js";

const APP_NAME = "AuthIO";
const GITHUB_URL = "https://github.com/adityaPachupate";
const PORTFOLIO_URL = "https://adityapachupate.vercel.app/";
const LINKEDIN_URL = "https://www.linkedin.com/in/adityapachupate/";
const TWITTER_URL = "https://x.com/ADITYAPACHUAPTE";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    let html = VERIFICATION_EMAIL_TEMPLATE
        .replace("{verificationCode}", verificationToken)
        .replace(/{appName}/g, APP_NAME)
        .replace("{githubURL}", GITHUB_URL)
        .replace("{portfolioURL}", PORTFOLIO_URL)
        .replace("{linkedinURL}", LINKEDIN_URL)
        .replace("{twitterURL}", TWITTER_URL);

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: `Verify your email for ${APP_NAME}`,
            html,
            category:"Email Verification"
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    const html = WELCOME_SIGNUP_SUCCESS_TEMPLATE
        .replace("{userName}", name)
        .replace("{githubURL}", GITHUB_URL)
        .replace("{portfolioURL}", PORTFOLIO_URL)
        .replace("{linkedinURL}", LINKEDIN_URL)
        .replace("{twitterURL}", TWITTER_URL)
        .replace(/{appName}/g, APP_NAME);

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: `Welcome to ${APP_NAME}`,
            html,
        });
        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw error;
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}]

    let html = PASSWORD_RESET_REQUEST_TEMPLATE
        .replace("{resetURL}", resetURL)
        .replace(/{appName}/g, APP_NAME)
        .replace("{githubURL}", GITHUB_URL)
        .replace("{portfolioURL}", PORTFOLIO_URL)
        .replace("{linkedinURL}", LINKEDIN_URL)
        .replace("{twitterURL}", TWITTER_URL);

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: `Reset your password for ${APP_NAME}`,
            html,
            category: "Password Reset",
        });
    } catch (error) {
        console.error("Error sending password reset email", error);
    }
}

export const sendPasswordResetSuccessEmail = async (email) => {
    const recipient = [{email}]

    let html = PASSWORD_RESET_SUCCESS_TEMPLATE
        .replace(/{appName}/g, APP_NAME)
        .replace("{githubURL}", GITHUB_URL)
        .replace("{portfolioURL}", PORTFOLIO_URL)
        .replace("{linkedinURL}", LINKEDIN_URL)
        .replace("{twitterURL}", TWITTER_URL);

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: `Password reset successful for ${APP_NAME}`,
            html,
            category: "Password Reset",
        })
        console.log("Password reset success email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset success email", error);
        throw error;
    }
    
    
}