
//alert message to tell node
// console.log("Node starting...");

var fs = require('fs');
var cmudictFile = readCmudictFile('./truncatedCmudict.txt');

function readCmudictFile(file){
	return fs.readFileSync(file).toString();
}
// console.log(fs);
// console.log(fs.readFileSync('./cmudict.txt'));

function formatData(data){
	var lines = data.toString().split("\n"), //lines -> array of strings where each line is an array entry
		lineSplit,
		wordToSyllableDictionary = {};


	//as you push words in use objects for key-value mapping for number of syllables in a word better than an array
	//especially if you have a lot of words.
	// console.log(line[10].split(" "));



	lines.forEach(function(line){
		lineSplit = line.split(" ");
		wordToSyllableDictionary[lineSplit[0]] = countSyllables(lineSplit);
		console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]);
	})

	console.log(wordToSyllableDictionary);
}

function countSyllables(strArr){  //counting syllables for each word
	var syllablesArr = strArr.slice(2),  //assuming the format is like ["wholeWord","", //actual syllables]
	numberOfSyllables = 0;

	for(var i = 0; i < syllablesArr.length; i++){

		if(syllablesArr[i].match(/\d/)){ //if it finds a number in the string then it should increment the counter
			numberOfSyllables++;
		}
	}

	return numberOfSyllables;

}

formatData(cmudictFile);

function createHaiku(structure){
	console.log("this should log a haiku with the structure " + structure);


}

module.exports = {
	createHaiku: createHaiku,
}


// console.log(module);

