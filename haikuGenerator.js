// console.log(module);


var haiku = require('./haiku');

var cmudictFile = haiku.readTxtFile('./Cmudict.txt');
// var structure = [[5],[7],[5]]; //this works

var structure = [ [2,3],
				  [1,3,3],
				  [3,2],
		    	];

var intermediate = haiku.formatData(structure, cmudictFile);
console.log("We exited intermediate")

// console.log(intermediate[1])

var creation = haiku.createHaiku(structure, intermediate[1]);

console.log(creation);

//do not forget to change numbOfWordsCap and maxNumbOfSyllablesPossible 
// in the haiku file