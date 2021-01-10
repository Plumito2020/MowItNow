import * as lineByLine from 'n-readlines';

const transformData = () =>{
    const liner = new lineByLine('file.txt');
    let line;
    let inputsFromFile = [];
    while (line = liner.next()) {
        inputsFromFile.push(line.toString());
       
    }
    
    // Cleaning the extracted array
    for (let index = 0; index < inputsFromFile.length; index++) {
        inputsFromFile[index] = inputsFromFile[index].replace(/(\r\n|\n|\r)/gm,"");
    }
    
    //--------------------
    
    let extractedWidth = inputsFromFile[0];
    var width = extractedWidth.split(' ');
    
    
    
    inputsFromFile.shift();
    
    
    let finalInputs = { width : parseInt(width[0]) , data : []};
    
    for (let index = 0; index < inputsFromFile.length; index+=2) {
        
        let extractedStartPos = inputsFromFile[index];
        let startPosArray = extractedStartPos.split(' ');
        let startPos = { x : parseInt(startPosArray[0]) , y :  parseInt(startPosArray[1] ) , direction : startPosArray[2]};
    
        let extractedDir = inputsFromFile[index + 1];
        let directions = extractedDir.split('');
    
        finalInputs.data.push({ pos : startPos , dir : directions});
    }

    return finalInputs ;
}





export { transformData as getInputs };

 




