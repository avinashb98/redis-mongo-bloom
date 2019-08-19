const readline = require('readline');
const mongo = require('./config/db');
const User = require('./user');
const BloomFilter = require('./userbloom');
// const ids = require('./ids.json');

const MAX_TESTS = 100000;
const UPPER_LIMIT = 6999999999999999;
const LOWER_LIMIT = 6000000000000000;
const getRandomUserId = () => Math.floor(
    (Math.random() * (UPPER_LIMIT - LOWER_LIMIT)) + LOWER_LIMIT
);

(async () => {
    await mongo.connect();
    await BloomFilter.connect();
    console.log('Filter Connected: userbloom');

    let negatives = 0;
    let falsePostitives = 0;
    for (let i = 0; i < MAX_TESTS; i += 1) {
        readline.clearLine(process.stdout);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`Checking for : ${i + 1} / ${MAX_TESTS}`);
        const userId = getRandomUserId();
        const existsInFilter = await BloomFilter.exists(userId);
        if (!existsInFilter) {
            negatives += 1;
        } else {
            const existsInDb = await User.exists({ userId });
            if (!existsInDb) falsePostitives += 1;
        }
    }
    console.log('\n');

    console.log({ negatives, falsePostitives });
    console.log(`Error: ${((falsePostitives / MAX_TESTS) * 100).toFixed(4)}`);
})();
