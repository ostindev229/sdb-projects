const input = "example";
const vowels = ["a", "e", "i", "o", "u"];
const resultArray = [];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < vowels.length; j++) {
        if (input[i] === vowels[j]) {
            resultArray.push(input[i]);
            if (input[i] === "e" || input[i] === "u") {
                resultArray.push(input[i]);
            }
        }
    }
}

console.log(resultArray);