import * as utils from "./base-utils.js";
/**
  @function Load binary file from anywhere
  @param {string} path File path
  @param {boolean} asy True - async call, false - sync call
  @param {function} success Success function
  @param {function} error Error function
  @return 1 for Async, data - for sync version
*/
export function loadBinaryFile(path, asy, success, error) {
  if(typeof path === "string") {
      // For browser
      var xhr = new XMLHttpRequest();
      xhr.open("GET", path, asy); // Async
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
          var data = new Uint8Array(xhr.response);
          var arr = [];
          for(var i = 0; i < data.length; ++i){
              arr[i] = String.fromCharCode(data[i]);
          }
          success(arr.join(""));
      }
      xhr.send();
  } else if(path instanceof Event) {
      // console.log("event");
      var files = path.target.files;
      var reader = new FileReader();
      var name = files[0].name;
      reader.onload = function(e) {
          var data = e.target.result;
          success(data);
      };
      reader.readAsBinaryString(files[0]);
  } else if(path instanceof Blob) {
    success(path);
  }
};

export default utils;