const readline = require('readline');
const mongo = require('./config/db');
const User = require('./user');

const UPPER_LIMIT = 8999999999999999;
const LOWER_LIMIT = 2999999999999999;
const getRandomUserId = () => Math.floor(
    (Math.random() * (UPPER_LIMIT - LOWER_LIMIT)) + LOWER_LIMIT
);

// (async () => {
//     await mongo.connect();
//     for (let i = 0; i < 200000; i += 1) {
//         readline.clearLine(process.stdout);
//         readline.cursorTo(process.stdout, 0);
//         process.stdout.write(`Done: ${i + 1} / 200000`);
//         const userId = getRandomUserId();
//         await User.create({ userId });
//     }
//     console.log('\n');
// })();
