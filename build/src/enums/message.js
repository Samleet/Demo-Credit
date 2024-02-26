/**
 * This file defines generic "messages" constants
 *
 */
const env = process.env;
export default {
    welcome: `Welcome to ${env.APP_NAME || "DemoCredit"}, Enjoy instant loans without hassles at absolutely zero interest`,
    withdraw: 'You made a withdrawal from your account'
};
