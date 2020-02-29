// import file
var tools = require("./toolsLibrary");
var regex = require("./regularExpression");

var http = require("http");
var url = require("url");
var fs = require("fs");

// var dbUrl = "mongodb://localhost:27017/";
var port = process.env.PORT || 4242;

var loginStatus = false;

// #### Test server #####
// var server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

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
        method: "like",
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

        var method = action.toString().substring(1);
        if (route[method]){
            // executeFunctionByName(action.split("/")[1], req, res);
            console.log("method: "+method);
            tools.callRoute(method, route[method], req, res);
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
            else if(regex.check(req.url) != null){
                regularCheck(regex[regex.check(req.url)], res, req.url);
            }
            else {
                console.log("Requested URL is: " + req.url);
                res.end();
            }
        }
    });

    server.listen(port, () => {
        console.log("Server " + port + " is running, the time is " + new Date());
    });
}

function regularCheck(regex, res, url) {
    if ((regex.regEx).test(url)){
        sendFileContent(res, url.substring(1), regex.fileType);
    }
    else {
        console.log("Fail to load: " + url);
        res.end();
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