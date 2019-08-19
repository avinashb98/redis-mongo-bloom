const http = require('http');
const mongo = require('./config/db');
const User = require('./user');

(async () => {
    await mongo.connect();
})();

function requestResponseHandler(request, response) {
    if (request.url.includes('isAuthor')) {
        const urlParts = request.url.split('/');
        const userId = Number.parseInt(urlParts[urlParts.length - 1], 10);
        User.exists({ userId })
            .then((exists) => {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify({ userId, exists }));
                response.end();
            })
            .catch((err) => {
                console.log(err);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify({ message: 'Something Went Wrong' }));
                response.end();
            });
    }
}

const httpServer = http.createServer(requestResponseHandler);
httpServer.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
