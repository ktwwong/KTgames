/**
 * This is the tools library for the dbserver.js
 * provide different funcition which can call the route or the MongoDB.
 */

var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017/";
var port = process.env.PORT || 4242;
var qs = require("querystring");
var fs = require("fs");

var dbo = db.db("database");

// execute a JavaScript function by its name
// Reference from: https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
// call method: executeFunctionByName("My.Namespace.functionName", window, arguments);
function executeFunctionByName(functionName, context /*, args */ ) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (let i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

// call different page or return data by post
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
                        searchDB += splitMsg[i][0] + " : " + splitMsg[i][1] + ", ";
                    }
                    console.log(searchDB);

                    this.dbConnect(method, splitMsg);
                });
            });
        }
    }
    else {
        return fs.readFile(html, function (err, contents) {
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

// return the MongoDB server data by calling different method
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
