/**
 * About the regular Expression, you can read more about it at:
 * https://atedev.wordpress.com/2007/11/23/%E6%AD%A3%E8%A6%8F%E8%A1%A8%E7%A4%BA%E5%BC%8F-regular-expression/
 * This is a good practice that learn how to avoid the target character you need, 
 * instead of put every word into you regular expression test,
 * beside it will easily getting bugs.
 */

module.exports = {
    fileType: 
        ["js", "css", "jpg", "png", "map", "ttf", "ico", "woff", "woff2"]
    ,

    check: function(file) {
        for(let i=0; i<this.fileType.length; i++){
            if(file.includes(this.fileType[i])){
                return this.fileType[i];
            }
        }
        return null;
    },

    js:{
        regEx: /^\/[a-zA-Z0-9\/\-\.]*.js$/,
        fileType: "text/javascript"
    },

    css:{
        regEx: /^\/[a-zA-Z0-9\/\-\.]*.css$/,
        fileType: "text/css"
    },

    jpg:{
        regEx: /^\/[a-zA-Z0-9\/\-\.]*.jpg$/,
        fileType: "image/jpg"
    },

    png:{
        regEx: /^\/[a-zA-Z0-9\/\-\.]*.png$/,
        fileType: "image/png"
    },

    map:{
        regEx: /^\/[a-zA-Z0-9\/\-\.]*.map$/,
        fileType: "text/map"
    },

    ttf:{
        regEx: /^\/[a-zA-Z0-9\/\-\.]*.ttf$/,
        fileType: "text/font"
    },

    ico:{
        regEx: /^\/[a-zA-Z0-9\/\-\.]*.ico$/,
        fileType: "text/ico"
    },
    
    woff:{
        regEx: /^\/[a-zA-Z0-9\/\-\.]*.woff$/,
        fileType: "text/woff"
    },

    woff2:{
        regEx: /^\/[a-zA-Z0-9\/\-\.]*.woff2$/,
        fileType: "text/woff2"
    },
};
// font is loading extremely low, direct call to avoid time-out
            // else if(/^\/[a-zA-Z0-9\/\-\.]*.tff$/.test(req.url)){
			// 	sendFileContent(res, req.url.substring(1), "text/font");
			// }else if(/^\/[a-zA-Z0-9\/\-\.]*.woff$/.test(req.url)){
			// 	sendFileContent(res, req.url.substring(1), "text/woff");
			// }else if(/^\/[a-zA-Z0-9\/\-\.]*.woff2$/.test(req.url)){
			// 	sendFileContent(res, req.url.substring(1), "text/woff2");
			// }else if(/^\/[a-zA-Z0-9\/\-\.]*.map$/.test(req.url)){
			// 	sendFileContent(res, req.url.substring(1), "text/map");
			// }else if(/^\/[a-zA-Z0-9\/\-\.]*.css$/.test(req.url)){
			// 	sendFileContent(res, req.url.substring(1), "text/css");
			// }else if(/^\/[a-zA-Z0-9\/\-\.]*.js$/.test(req.url)){
			// 	sendFileContent(res, req.url.substring(1), "text/javascript");
			// }else if(/^\/[a-zA-Z0-9\/\-\.]*.ico$/.test(req.url)){
			// 	sendFileContent(res, req.url.substring(1), "text/ico");
			// }else if(/^\/[a-zA-Z0-9\/\-\.]*.png$/.test(req.url)){
			// 	sendFileContent(res, req.url.substring(1), "image/png");
			// }else if(/^\/[a-zA-Z0-9\/\-\.]*.jpg$/.test(req.url)){
			// 	sendFileContent(res, req.url.substring(1), "image/jpg");
            // }