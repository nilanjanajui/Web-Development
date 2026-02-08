/* Problem-3 */
function finalScore (omr) {
    if (typeof omr !== "object" || omr === null || Array.isArray(omr))
    {
        return "Invalid";
    }

    const { right, wrong, skip} = omr;

    if ( typeof right !== "number" || typeof wrong !== "number" || typeof skip !== "number") {
        return "Invalid";
    }

    if ( right + wrong + skip !== 100) {
        return "Invalid";
    }

    const score = right * 1 - wrong * 0.5;

    return Math.round(score);
}

console.log(finalScore({ right: 67, wrong: 23, skip: 10}));
console.log(finalScore({ right: 80, wrong: 25, skip: 0}));
console.log(finalScore("!@#"));
console.log(finalScore(["Raj"]));