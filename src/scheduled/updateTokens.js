const CronJob = require("node-cron");
const { updateTokens } = require('../services/tokenService.js');

module.exports = scheduledUpdateTokens = () => {

    const scheduledUpdateFunction = CronJob.schedule("*/30 * * * *", async () => {
        await updateTokens();
    });

    scheduledUpdateFunction.start();
};