import * as utils from "./base-utils.js";
/**
  @function Load binary file from anywhere
  @param {string} path File path
  @param {boolean} asy True - async call, false - sync call
  @param {function} success Success function
  @param {function} error Error function
  @return 1 for Async, data - for sync version
*/
utils.loadBinaryFile = function loadBinaryFile(path, asy, success, error) {
    var fs;
    if((typeof exports === 'object') || (typeof Meteor !== 'undefined' && Meteor.isServer)) {
        // For Node.js
        if(typeof Meteor !== 'undefined') {
            var fs = Npm.require('fs'); // For Meteor
        } else {
            var fs = require('fs');
        }
        if(asy) {
            fs.readFile(path,function(err,data){
                if(err) {
                    throw err;
                }
                var arr = [];
                for(var i = 0; i < data.length; ++i){
                    arr[i] = String.fromCharCode(data[i]);
                }
                success(arr.join(""));
            });

        } else {
            var data = fs.readFileSync(path);
            var arr = [];
            for(var i = 0; i < data.length; ++i){
                arr[i] = String.fromCharCode(data[i]);
            }
            success(arr.join(""));
        }

    }
};

export default utils;