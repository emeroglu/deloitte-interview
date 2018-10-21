$js.compile("$server", null, function($public, $private, $protected, $self) {

    $private.field.server = null;

    $public.void.serve = function() {

        $self.server = $http.createServer(function(_request, _response) {

            if (_request.url == "/") {

                $compiler.index(function(_html) {

                    _response.writeHead(200, { "Content-Type": "text/html" });
                    _response.write(_html);
                    _response.end();

                });

            } else if (_request.url == "/Flush") {

                $compiler.flush();

                _response.write("Cache removed.");
                _response.end();

            } else if (_request.url == "/Banner") {

                _response.writeHead(200, { "Content-Type": "image/jpeg" })

                $fs.createReadStream("files/banner.jpg").pipe(_response);

            } else if (_request.url == "/Image") {

                _response.writeHead(200, { "Content-Type": "image/jpeg" })

                $fs.createReadStream("files/image.jpg").pipe(_response);

            } else if (_request.url == "/Search") {

                let body = [];

                _request.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    
                    body = Buffer.concat(body).toString();

                    $api.search("pen");

                    _response.writeHead(200, { "Content-Type": "application/json" })
                    _response.end();

                });

            }
             else {

                _response.write("OK");
                _response.end();

            }

        });
        $self.server.listen(5000, function() { console.log("Listening port 5000..."); });

    };

});