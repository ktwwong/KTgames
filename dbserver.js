var tools = require("./toolsLibrary");
var http = require("http");
var url = require("url");
var qs = require("querystring");
var fs = require("fs");
var regex = require("./regularExpression");

var loginStatus = false;
var loginUser = "";

var server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

var route = {
    "Main" : {
        method: "", 
        html: "index.html"
    },
    "Login" : {
        method: "findOne",
        html: "login.html"
    },
    "Register" : {
        method: "insertOne",
        html: "register.html"
    },
    "Favourlist" : {
        method: "find",
        html: "love.html"
    },
    "addfavourlist" : {
        method: "count",
        html: "Main.html"
    },
    "removefavourlist" : {
        method: "deleteOne",
        html: "contact.html"
    },
    "gameReview" : {
        method: "",
        html: "game-review.html"
    },
    "review" : {
        method: "",
        html: "single-game-review.html"
    },
    "post" : {
        method: "",
        html: "post.html"
    },
    "API" : {
        method: "",
        html: "apiCall.html"
    },
};

function createServer() {
    var server = http.createServer(function (req, res) {
        var action, form, formData, msg, publicPath, urlData, stringMsg;
        urlData = url.parse(req.url, true);
        action = urlData.pathname;
        publicPath = __dirname + "\\public\\";
        console.log(req.url);

        if (action){
            // executeFunctionByName(action.split("/")[1], req, res);
            var method = action.toString().substring(1);
            tools.callRoute(method, route[method].html, req, res)
        }
        else if (action === "/Sony%E2%80%99s+new+releases+for+2018") {
            form = "single-post.html";
            return fs.readFile(form, function (err, contents) {
                if (err !== true) {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    return res.end(contents);
                } else {
                    res.writeHead(500);
                    return res.end;
                }
            });
        }
        else {
            //handle redirect
            if (req.url){
                var html = req.url.split("/")[1] + ".html"

                if (req.url === "/index") {
                    if (loginStatus) {
                        sendFileContent(res, "loginindex.html", "text/html");
                    } else {
                        sendFileContent(res, "finalindex.html", "text/html");
                    }
                }
                else if (req.url === "/logout") {
                    loginStatus = false;
                    loginUser = "";
                    sendFileContent(res, "finalindex.html", "text/html");
                }
                else if (req.url === "/") {
                    console.log("Requested URL is url" + req.url);
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    res.write("<b>testpage</b><br /><br />This is the default response.");
                }
                else {
                    sendFileContent(res, html, "text/html");
                }
            } else {
                regularExpression(res, req.url.toString());
                console.log("Requested URL is: " + req.url);
                res.end();
            }
        }
    });

    server.listen(port, () => {
        console.log("Server " + port + " is running, the time is " + new Date());
    });
}

function regularExpression(res, url){
    for(let i=0; i<regex.array.length; i++){
        if (regex1.array[i][0].test(url)){
            sendFileContent(res, url.substring(1), regex1.array[i][0]);
        }
    }
}

function sendFileContent(response, fileName, contentType) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            response.writeHead(404);
            response.write("Not Found!");
        } else {
            response.writeHead(200, {
                "Content-Type": contentType
            });
            response.write(data);
        }
        response.end();
    });
}

createServer.call();