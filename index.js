"use strict";
exports.__esModule = true;
var transformInputFile_1 = require("./transformInputFile");
var rotate = function (orientation, angle) {
    var orientations = ["N", "E", "S", "O"];
    var finalIndex = orientations.length - 1;
    var i = 0;
    if (angle === "D") {
        i = 1;
    }
    else {
        i = -1;
    }
    var indexOfOr = orientations.indexOf(orientation);
    if ((indexOfOr + i) % orientations.length >= 0) {
        finalIndex = (indexOfOr + i) % orientations.length;
    }
    return orientations[finalIndex];
};
var willWeCollide = function (pos, othersPos) {
    for (var index = 0; index < othersPos.length; index++) {
        var otherPos = othersPos[index];
        if (pos.x === otherPos.x) {
            if ((pos.direction === "N" && pos.y + 1 === otherPos.y) || (pos.direction === "S" && pos.y - 1 === otherPos.y)) {
                return true;
            }
        }
        if (pos.y === otherPos.y) {
            if ((pos.direction === "E" && pos.x + 1 === otherPos.x) || (pos.direction === "O" && pos.x - 1 === otherPos.x)) {
                return true;
            }
        }
    }
    return false;
};
var translate = function (pos, othersPos, width) {
    var newPos = pos;
    // Verifier s'il va depasser les bords
    if ((pos.x === width && pos.direction === "E") || (pos.x === 0 && pos.direction === "O") || (pos.y === width && pos.direction === "N") || (pos.y === 0 && pos.direction === "S")) {
        return newPos;
    }
    //Verifier si on va pas toucher d'autres tondeuses
    if (willWeCollide(pos, othersPos)) {
        return newPos;
    }
    switch (pos.direction) {
        case "N": {
            newPos.y += 1;
            break;
        }
        case "S": {
            newPos.y -= 1;
            break;
        }
        case "E": {
            newPos.x += 1;
            break;
        }
        case "O": {
            newPos.x -= 1;
            break;
        }
        default: {
            break;
        }
    }
    return newPos;
};
// -------------------- Execution , le MAIN en qq sorte --------------------
var inputs = transformInputFile_1.getInputs();
// Taille du gazon
var w = inputs.width;
// Positions des autres tondeuzes 
var othersPos = [{ x: 6, y: 6, direction: 'N' }];
// On boucle sur chaque tondeuze
inputs.data.forEach(function (input) {
    // Les instrctions
    var directions = input.dir;
    // Postion de la tondeuze
    var currentPos = input.pos;
    console.log("**Instructions**");
    console.log(directions);
    // On boucle sur les instructions
    for (var index = 0; index < directions.length; index++) {
        // On execute une rotation ou une translation selon l'instructions
        if (directions[index] === "G" || directions[index] === "D") {
            var currDir = currentPos.direction;
            currentPos.direction = rotate(currDir, directions[index]);
            // console.log(currentPos);
        }
        else {
            var currPos = currentPos;
            currentPos = translate(currPos, othersPos, w);
            // console.log(currentPos);
        }
    }
    // Quand les instructions d'une tondeuze ont toutes ete execute , il faut ajouter sa position finale a otherPos comme ca il n'y aura pas de collisions
    othersPos.push(currentPos);
    console.log("**Resultat**");
    console.log(currentPos);
    console.log("-------------------------------------------------------");
});
// console.log(willWeCollide({x : 3 , y :3 , direction : "N"} , [{x : 3 , y : 4}]));
