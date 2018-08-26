var gEngine = gEngine || { };

gEngine.TextFileLoader = (function () {
  var eTextFileType = Object.freeze({
    eXMLFile: 0,
    eTextFile: 1
  });

  var loadTextFile = function (fileName, fileType, callbackFunction) {
    if (!(gEngine.ResourceMap.isAssetLoaded(fileName))) {
      // update resources in load counter
      gEngine.ResourceMap.asyncLoadRequested(fileName);

      // TODO: update this to ES2017 standards
      // async req data from server
      var req = new XMLHttpRequest();
      req.onreadystatechange = function () {
        if ((req.readyState === 4) && (req.status !== 200)) {
          console.error(`${fileName}: loading failed!
            [Hint: you cannot double click index.html to run this project.
            The index.html file must be loaded by a web-server.]`);
        }
      };
      req.open('GET', fileName, true);
      req.setRequestHeader('Content-Type', 'text/xml');
      req.overrideMimeType('text/plain; charset=utf-8'); // TODO: remove pesky error messages

      req.onload = function () {
        var fileContent = null;
        if (fileType === eTextFileType.eXMLFile) {
          var parser = new DOMParser();
          fileContent = parser.parseFromString(req.responseText, 'text/xml');
        } else {
          fileContent = req.responseText;
        }
        gEngine.ResourceMap.asyncLoadCompleted(fileName,fileContent);

        if ((callbackFunction !== null) && (callbackFunction !== undefined)) callbackFunction(fileName);
      };
      req.send();
    } else {
      if ((callbackFunction !== null) && (callbackFunction !== undefined)) callbackFunction(fileName);
    }
  };

  var unloadTextFile = function (fileName) {
    gEngine.ResourceMap.unloadAsset(fileName);
  };

  var mPublic = {
    loadTextFile,
    unloadTextFile,
    eTextFileType
  };
  return mPublic;
}());
