/* Problem-2 */
function validOtp(otp) {
        if (typeof otp !== "string"){
            return "Invalid";
        }

        if (otp.length !== 8) {
            return false;
        }

        if (!otp.startsWith("ph-")) {
            return false;
        }

        return true;

}

console.log(validOtp("ph-10985"));
console.log(validOtp("ph-1234"));
console.log(validOtp("abc-12345"));
console.log(validOtp(["ph-10985"]));
console.log(validOtp(1234567890));