module.exports = (client, rateLimitData) => {
    client.logger.warn(`Hitted a rate limit **(info):** ${JSON.stringify(rateLimitData)}`, { label: `Rate limit` });
}