"use strict";
exports.__esModule = true;
exports.getInputs = void 0;
var lineByLine = require("n-readlines");
var transformData = function () {
    var liner = new lineByLine('file.txt');
    var line;
    var inputsFromFile = [];
    while (line = liner.next()) {
        inputsFromFile.push(line.toString());
    }
    // Cleaning the extracted array
    for (var index = 0; index < inputsFromFile.length; index++) {
        inputsFromFile[index] = inputsFromFile[index].replace(/(\r\n|\n|\r)/gm, "");
    }
    //--------------------
    var extractedWidth = inputsFromFile[0];
    var width = extractedWidth.split(' ');
    inputsFromFile.shift();
    var finalInputs = { width: parseInt(width[0]), data: [] };
    for (var index = 0; index < inputsFromFile.length; index += 2) {
        var extractedStartPos = inputsFromFile[index];
        var startPosArray = extractedStartPos.split(' ');
        var startPos = { x: parseInt(startPosArray[0]), y: parseInt(startPosArray[1]), direction: startPosArray[2] };
        var extractedDir = inputsFromFile[index + 1];
        var directions = extractedDir.split('');
        finalInputs.data.push({ pos: startPos, dir: directions });
    }
    return finalInputs;
};
exports.getInputs = transformData;
