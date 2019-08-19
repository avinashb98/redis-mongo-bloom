const { BloomFilter } = require('@albert-team/rebloom');

const filter = new BloomFilter('userbloom', { port: 6380 });

const connect = () => filter.connect();

const add = (userId) => filter.add(userId);

const exists = (userId) => filter.exists(userId).then((res) => res === 1).catch(() => false);

// await filter.disconnect();

module.exports = { exists, add, connect };
