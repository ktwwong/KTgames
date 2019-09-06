var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";
var port = process.env.PORT || 4242;

(function() {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) {
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);
		
		
		
		if (action === "/Main") {
			console.log("main");
			//form = publicPath + "ajaxSignupForm.html";
			form = "index.html";
			return fs.readFile(form, function(err, contents) {
				if (err !== true)
				{
					res.writeHead(200, {
						"Content-Type": "text/html"
					});
					return res.end(contents);
				}
				else 
				{
					res.writeHead(500);
					return res.end;
				}
			});
		}
		
		else if (action === "/Login"){
			console.log("login");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitEmail = splitMsg[0];
						var tempSplitPassword = splitMsg[1];
						var splitEmail = tempSplitEmail.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = "Email : " + splitEmail[1] + " " + "Password : " + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						console.log("search=" + searchDB);
						
						MongoClient.connect(dbUrl, function(err, db) {
							var username;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = splitMsg;
							dbo.collection("user").findOne({"email" : splitEmail[1], "password" : splitPassword[1]}, function(err, result){
								console.log("Error: ",err, "Result: ", result);
								//finalcount = count;
								if(result == null)
								{
									console.log("user missing");
									db.close();
									return res.end("fail");
								}
								else
								{
									console.log("OK");
									username = result.username;
									console.log(username);
									db.close();
									//return res.end(msg);
									return res.end(username);
								}
							});
						});
					});
				});
			}
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "login.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		else if (action === "/Register"){
			console.log("register");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitEmail = splitMsg[0];
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var splitEmail = tempSplitEmail.split("=");
						var searchDB = "Email : " + splitEmail[1] + " " + "Name : " + splitName[1] + " " + "Password : " + splitPassword[1];
						console.log("mess= "+msg);
						console.log("mess= "+formData);
						//console.log("split=" + msg[1]);
						console.log("search= " + searchDB);
						
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							dbo.collection("user").count({"email": splitEmail[1], "username" : splitName[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if (err) throw err;
									console.log("user exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("user").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end("OK");
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "register.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		else if (action === "/Favourlist")		
		{
			console.log("Get favourite");
			console.log(req.method);
			if (req.method === "POST") {
				console.log("action = GET");
				formData = '';
				msg = '';
				
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("=");
	
						
						var searchDB = "Name: " + splitMsg[1];
						console.log("mess= "+msg);
						console.log("mess= "+formData);
						//console.log("split=" + msg[1]);
						console.log("search= " + searchDB);
						
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("favourite").find({"username" : splitMsg[1]}).toArray(function(err, result){
								if(err)
								{
									throw err;
									console.log("favourite list fail");
								}
								else
								{
									console.log(result);
									db.close();
									var array = [];
									for (var i=0; i<result.length; i++){
										array.push(result[i].like);
									}
									console.log(array);
									return res.end(array.toString());
								}
							});
						});
					});
				});
			}
		
			else {
				form = "love.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					}
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		else if (action === "/addfavourlist")
		{
			console.log("Add favourite");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var splitName = splitMsg[0].split("=");
						var splitLike = splitMsg[1].split("=");
						
						var searchDB = "Name: " + splitName[1] + " Like : " + splitLike[1];
						console.log("mess= "+msg);
						console.log("mess= "+formData);
						//console.log("split=" + msg[1]);
						console.log("search= " + searchDB);
						res.writeHead(200, {
							"Content-Type": "application/json"
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("favourite").count({"username" : splitName[1], "like" : splitLike[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("data exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("favourite").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("favourite list inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
			}
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Main.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		else if (action === "/removefavourlist")
		{
			console.log("Delete favourite");
			console.log("action = post");
			formData = '';
			msg = '';
			return req.on('data', function(data) {
				formData += data;
				console.log("form data="+ formData);
				return req.on('end', function() {
					var user;
					user = qs.parse(formData);
					user.id = "0";
					msg = JSON.stringify(user);
					stringMsg = JSON.parse(msg);
					var splitMsg = formData.split("&");
					var splitName = splitMsg[0].split("=");
					var splitRemove = splitMsg[1].split("=");
					
					var searchDB = "Name: " + splitName[1] + " Remove : " + splitRemove[1];
					console.log("mess= "+msg);
					console.log("mess= "+formData);
					//console.log("split=" + msg[1]);
					console.log("search= " + searchDB);
					res.writeHead(200, {
						"Content-Type": "application/json",
						"Content-Length": msg.length
					});
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("database");
						var myobj = {"username" : splitName[1], "like" : splitRemove[1]}
						console.log(user);
						dbo.collection("favourite").deleteOne(myobj, function(err, result) {
							if (err) throw err;
							console.log("1 document deleted");
							db.close();
							return res.end(msg);
						});
					});
				});
			});
		}
		
		else if (action === "/contact")
		{
			form = "contact.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
		}
		
		else if (action === "/gameReview")
		{
			form = "game-review.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
		}
		
		else if (action === "/review")
		{
			form = "single-game-review.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
		}
		
		else if (action === "/post")
		{
			form = "post.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
		}
		
		else if (action === "/Sony%E2%80%99s+new+releases+for+2018")
		{
			form = "single-post.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
		}
		
		else if (action === "/API")
		{
			form = "apiCall.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
		}
		
		else 
		{
      //handle redirect
			if(req.url === "/index")
			{
        if(loginStatus)
				{
					sendFileContent(res, "loginindex.html", "text/html");
				}
				else
				{
					sendFileContent(res, "finalindex.html", "text/html");
				}
			}
			else if (req.url === "/Signuppage")
			{
				sendFileContent(res, "signuppage.html", "text/html");
			}
			else if (req.url === "/loginpage")
			{
				sendFileContent(res, "loginpage.html", "text/html");
			}
			else if (req.url === "/logout")
			{
				loginStatus = false;
				loginUser = "";
				sendFileContent(res, "finalindex.html", "text/html");
			}
			else if (req.url === "/hklawprivacy")
			{
				sendFileContent(res, "text_hklawprivacy.html", "text/html");
			}
      else if (req.url === "/socialnetwork")
			{
				sendFileContent(res, "text_socialnetwork.html", "text/html");
			}
      else if (req.url === "/favlistpage")
			{
				sendFileContent(res, "favouritelistpage.html", "text/html");
			}else if (req.url === "/abuse")
			{
				sendFileContent(res, "article4.html", "text/html");
			}else if (req.url === "/manage")
			{
				sendFileContent(res, "article3.html", "text/html");
			}else if (req.url === "/use")
			{
				sendFileContent(res, "article2.html", "text/html");
			}else if (req.url === "/food")
			{
				sendFileContent(res, "article1.html", "text/html");
			}
			else if(req.url === "/"){
				console.log("Requested URL is url" + req.url);
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write('<b>testpage</b><br /><br />This is the default response.');
			}else if(/^\/[a-zA-Z0-9\/-/]*.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/-/]*.bundle.min.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/-/]*.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/-]*.min.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/-/]*.jpg$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}else if(/^\/[a-zA-Z0-9-._\/]*.min.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9-]*.min.css.map$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/map");
			}else if(/^\/[a-zA-Z0-9\/-/]*.min.js.map$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/map");
			}else if(/^\/[a-zA-Z0-9\/-/]*.css.map$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/map");
			}else if(/^\/[a-zA-Z0-9\/-/]*.png$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}else if(/^\/[a-zA-Z0-9\/-/]*.ico$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/ico");
			}else if(/^\/[a-zA-Z0-9\/-/?]*.ttf$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/font");
			}else if(/^\/[a-zA-Z0-9\/-/?]*.woff$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/woff");
			}else if(/^\/[a-zA-Z0-9\/-/?]*.woff2$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/woff2");
			}else{
				console.log("Requested URL is: " + req.url);
				res.end();
			}
		}
	});

	server.listen(port);

	console.log("Server " + port + " is running, the time is " + new Date());


	function sendFileContent(response, fileName, contentType){
		fs.readFile(fileName, function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Not Found!");
			}else{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);