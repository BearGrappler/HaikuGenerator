
//alert message to tell node
// console.log("Node starting...");

var fs = require('fs');
//truncated was so that I could look at output more easily
var cmudictFile = readTxtFile('./Cmudict.txt');

var macBethFile = readTxtFile('./macBethFile.txt')

// console.log(cmudictFile);


formatData([[5],[7],[5]], cmudictFile);


function readTxtFile(file){
	return fs.readFileSync(file).toString();
}
// DEBUGGING STARTS
// console.log(fs);
// console.log(fs.readFileSync('./cmudict.txt'));
// DEBUGGING ENDS

function formatData(structureArr, data){
	var lines = data.toString().split("\n"), //lines -> array of strings where each line is an array entry
		lineSplit, 
		syllableCount,
		wordsArray = [],
		syllablesArray,
		wordToSyllableDictionary = {},
		syllableToWordDictionary = {};  //{'1': array of all the words with 1 syllable, "2":}


	// as you push words in use objects for key-value mapping for number of syllables in a word better than an array
	// especially if you have a lot of words.
	// console.log(line[10].split(" "));


	// console.log(lines);
	lines.forEach(function(line){
		lineSplit = line.split(" ");
		wordsArray.push(lineSplit[0]);
		syllableCount = countSyllables(lineSplit);
		wordToSyllableDictionary[lineSplit[0]] = syllableCount;

		if(syllableToWordDictionary[syllableCount.toString()] === undefined){
			syllableToWordDictionary[syllableCount.toString()] = [];
			syllableToWordDictionary[syllableCount.toString()].push(lineSplit[0]);
		}
		else{
			syllableToWordDictionary[syllableCount.toString()].push(lineSplit[0]);
		}

		// console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]);
	})

	// console.log(syllableToWordDictionary);
	// console.log(lineSplit);



	syllablesArray = generateSyllablesArray(syllableToWordDictionary, structureArr);

	// console.log(syllablesArray);
	// console.log([wordToSyllableDictionary,syllablesArray]);
	// console.log(wordsArray);
	return  [wordToSyllableDictionary,syllablesArray]
}




function countSyllables(wordArr){  //counting syllables for each word
	var syllablesArr = wordArr.slice(2),  //assuming the format is like ["wholeWord","", //actual syllables]
	numberOfSyllables = 0;

	for(var i = 0; i < syllablesArr.length; i++){

		if(syllablesArr[i].match(/\d/)){ //if it finds a number in the string then it should increment the counter
			numberOfSyllables++;
		}
	}
	// console.log(wordArr);
	// console.log(syllablesArr);

	return numberOfSyllables;

}


//will use this to create arrOfWords
function generateSyllablesArray(arg1, structureArr){
	//arg1 is syllabletoWordDictionary
	//the structureArr contains the word count per line

	var output =[],
	totalNumbOfWordsNeeded = 0, //could make this more efficient
	maxNumbOfSyllablesInOneWord=7;  // will need to change this

	// console.log(arg1);
	for(var i = 0; i < structureArr.length; i++){
		totalNumbOfWordsNeeded += structureArr[i].length;
	}

	// console.log("We are entering j loop!")
	for(var j = 0; j <= maxNumbOfSyllablesInOneWord; j++){
		output.push([]);
		for(var k= 1; k<= totalNumbOfWordsNeeded; k++){
			var arrayOfWordsForThisNumbOfSyllables = arg1[j.toString()];
			// console.log(arrayOfWordsForThisNumbOfSyllables);
			var randomIntForPullingARandomWord = Math.floor(Math.random()*arrayOfWordsForThisNumbOfSyllables.length);
			output[j].push(arrayOfWordsForThisNumbOfSyllables[randomIntForPullingARandomWord]);
			//do this until you hit total Numb of words neede;
		}
		// console.log("We exited k loop!");
	}
	// console.log("We exited");
	return output; 

}

//the array of words index corresponds to number of syllables in that array
function createHaiku(structure, syllablesArr){
 
	// console.log("this should log a haiku with the structure " + structure);
	// console.log('sylls', syllablesArr);
	var arrOfWords;
  	return structure.map(function(lines){
    	return lines.map(function(syls){
    		console.log('syls: ', syls)
      		arrOfWords = syllablesArr[syls];
      		return arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
    	}).join(' ');
	}).join('\n');

}

function searchForHaikuStructure(structure, wordTosyllableDictionary, textBeingAnalyzed){
	
}

module.exports = {
	readTxtFile: readTxtFile,
	formatData: formatData,
	countSyllables: countSyllables,
	createHaiku: createHaiku,

}
//Learning experience it didn't work because we didn't export the functions since
//it's a module

// console.log(module);

