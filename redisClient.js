// redisClient.js

require('dotenv').config();
const redis = require('redis');

// Log environment variables
console.log(`Connecting to Redis at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);

// Create a Redis client
const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.log('Redis error: ' + err);
});

module.exports = client;