const readline = require('readline');
const fs = require('fs');
const mongo = require('./config/db');
const User = require('./user');
const BloomFilter = require('./userbloom');

const MAX_USERS = 2000000;
const UPPER_LIMIT = 6999999999999999;
const LOWER_LIMIT = 6000000000000000;
const getRandomUserId = () => Math.floor(
    (Math.random() * (UPPER_LIMIT - LOWER_LIMIT)) + LOWER_LIMIT
);

// (async () => {
//     await mongo.connect();
//     await BloomFilter.connect();
//     console.log('Filter Connected: userbloom');

//     const ids = [];
//     for (let i = 0; i < MAX_USERS; i += 1) {
//         readline.clearLine(process.stdout);
//         readline.cursorTo(process.stdout, 0);
//         process.stdout.write(`Done: ${i + 1} / ${MAX_USERS}`);
//         const userId = getRandomUserId();
//         ids.push(userId);
//         await Promise.all([User.create({ userId }), BloomFilter.add(userId)]);
//     }
//     console.log('\n');
//     fs.writeFileSync('userIds.json', JSON.stringify(ids));
// })();
