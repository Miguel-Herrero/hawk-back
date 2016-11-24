var Hapi = require('hapi');
var HapiHawk = require('hapi-auth-hawk');
var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

var credentials = {
    d74s3nz2873n: {
        key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
        algorithm: 'sha256'
    }
}

var getCredentials = function (id, callback) {

    return callback(null, credentials[id]);
};

server.register(HapiHawk, function (err) {

    server.auth.strategy('default', 'hawk', 'required', { getCredentialsFunc: getCredentials });
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});