var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017/";
var port = process.env.PORT || 4242;

var http = require("http");
var rl = require("url");
var qs = require("querystring");
var fs = require("fs");
var dbo = db.db("database");

var loginStatus = false;
var loginUser = "";

var server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

function executeFunctionByName(functionName, context /*, args */ ) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (let i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

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

function callRoute(method, html, req, res){
    var searchDB;
    if (req.method === "POST"){
            console.log(method);
            formData = "";
            msg = "";
            return req.on("data", function (data){
                formData += data;
                console.log("form data = " + formData);
                return req.on("end", function(){
                    var user = qs.parse(formData);
                    user.id = "0";
                    msg = JSON.stringify(user);
                    stringMsg = JSON.parse(msg);
                    var splitMsg = formData.split("&");
                    for(let i=0; i<splitMsg.length; i++){
                        splitMsg[i] = splitMsg[i].split("=");
                        searchDB += splitMsg[i][0] + " : " + splitMsg[i][1] + " ";
                    }
                    console.log(searchDB);

                    dbConnect(method, splitMsg);
                });
            });
        }
    }
    else {
        console.log(route);
        form = html;
        return fs.readFile(form, function (err, contents) {
            if (err != true) {
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
}

function dbConnect(method, splitMsg){
    switch (method){
        case "findOne":
            MongoClient.connect(dbUrl, function (err, db) {
                var username;
                if (err) throw err;
                var email = splitMsg[0][1];
                var password = splitMsg[1][1];
                dbo.collection("user").findOne({
                    "email" : email,
                    "password": password
                }, function(err, result) {
                    console.log("Error: ", err, ", Result: ", result);
                    if (result == null){
                        console.log("user missing");
                        db.close();
                        return res.end("fail");
                    }else {
                        console.log("OK");
                        username = result.username;
                        console.log(username);
                        db.close();
                        return res.end(username);
                    }
                });
            });
            break;

        case "insertOne":
            MongoClient.connect(dbUrl, function (err, db) {
                var finalcount;
                if (err) throw err;
                var myobj = splitMsg;
                dbo.collection("user").count({
                    for (let i = 0; i < splitMsg.length; i++) {
                        splitMsg[i][0] : splitMsg[i][1]
                    }
                }, function (err, count) {
                    console.log(err, count);
                    finalcount = count;
                    if (finalcount > 0) {
                        if (err) throw err;
                        console.log("user exist");
                        db.close();
                        return res.end("fail");
                    }else {
                        dbo.collection("user").insertOne(myobj, function (err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                            db.close();
                            //return res.end(msg);
                        });
                        return res.end("OK");
                    }
                });
            }); 
            break;
        case "find":
            MongoClient.connect(dbUrl, function (err, db) {
                var finalcount;
                if (err) throw err;
                var myobj = splitMsg;
                dbo.collection("favourite").find({
                    for (let i = 0; i < splitMsg.length; i++) {
                        splitMsg[i][0] : splitMsg[i][1]
                    }
                }).toArray(function (err, result) {
                    if (err) {
                        throw err;
                        console.log("favourite list fail");
                    } else {
                        console.log(result);
                        db.close();
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].like);
                        }
                        console.log(array);
                        return res.end(array.toString());
                    }
                });
            });
            break;
        case "count":
            MongoClient.connect(dbUrl, function (err, db) {
                var finalcount;
                if (err) throw err;
                var myobj = stringMsg;
                dbo.collection("favourite").count({
                    for (let i = 0; i < splitMsg.length; i++) {
                        splitMsg[i][0] : splitMsg[i][1]
                    }
                }, function (err, count) {
                        console.log(err, count);
                        finalcount = count;
                        if (finalcount > 0) {
                            if (err) throw err;
                            console.log("data exist");
                            db.close();
                            return res.end("fail");
                        } else {
                            dbo.collection("favourite").insertOne(myobj, function (err, res) {
                                    if (err) throw err;
                                    console.log("favourite list inserted");
                                    db.close();
                                    //return res.end(msg);
                                });
                            return res.end(msg);
                        }
                });
            });
            break;
        case "delete":
            MongoClient.connect(dbUrl, function (err, db) {
                if (err) throw err;
                var myobj = {
                    for (let i = 0; i < splitMsg.length; i++) {
                        var array = splitMsg[i][0] : splitMsg[i][1];
                    }
                };
                console.log(user);
                dbo.collection("favourite").deleteOne(myobj, function (err, result) {
                    if (err) throw err;
                    console.log("1 document deleted");
                    db.close();
                    return res.end(msg);
                });
            });
            break;
        
    }
}

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
            this.callRoute(method, route[method].html, req, res)
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
            }
            else if (/^\/[a-zA-Z0-9\/-/]*.js$/.test(req.url.toString())) {
                sendFileContent(res,req.url.toString().substring(1),"text/javascript");
            } else if (/^\/[a-zA-Z0-9\/-/]*.bundle.min.js$/.test(req.url.toString())) {
                sendFileContent(res,req.url.toString().substring(1),"text/javascript");
            } else if (/^\/[a-zA-Z0-9\/-/]*.css$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/css");
            } else if (/^\/[a-zA-Z0-9\/-]*.min.css$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/css");
            } else if (/^\/[a-zA-Z0-9\/-/]*.jpg$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "image/jpg");
            } else if (/^\/[a-zA-Z0-9-._\/]*.min.js$/.test(req.url.toString())) {
                sendFileContent(res,req.url.toString().substring(1),"text/javascript");
            } else if (/^\/[a-zA-Z0-9-]*.min.css.map$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/map");
            } else if (/^\/[a-zA-Z0-9\/-/]*.min.js.map$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/map");
            } else if (/^\/[a-zA-Z0-9\/-/]*.css.map$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/map");
            } else if (/^\/[a-zA-Z0-9\/-/]*.png$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "image/png");
            } else if (/^\/[a-zA-Z0-9\/-/]*.ico$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/ico");
            } else if (/^\/[a-zA-Z0-9\/-/?]*.ttf$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/font");
            } else if (/^\/[a-zA-Z0-9\/-/?]*.woff$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/woff");
            } else if (/^\/[a-zA-Z0-9\/-/?]*.woff2$/.test(req.url.toString())) {
                sendFileContent(res, req.url.toString().substring(1), "text/woff2");
            } else {
                console.log("Requested URL is: " + req.url);
                res.end();
            }
        }
    });

    server.listen(port, () => {
        console.log("Server " + port + " is running, the time is " + new Date());
    });
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