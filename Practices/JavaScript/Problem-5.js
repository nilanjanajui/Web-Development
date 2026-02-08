/* Problem-5 */
function  analyzeText(str) {
    if (typeof str !== "string") {
        return "Invalid";
    }

    if (str.trim().length === 0) {
        return "Invalid";
    }

    const token = str.split(" ").join("").length;

    const words = str.trim().split(/\s+/);

    let longwords = words[0];
    let maxLen = words[0].length;

    for (let i = 1; i < words.length; i++) {
        if (words[i].length > maxLen) {
            maxLen = words[i].length;
            longwords = words[i];
        }
    }

    return {
        longwords: longwords,
        token: token
    };
}


const input = "I am a little honest person";
const result = analyzeText(input);
console.log(result);
