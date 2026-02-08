/*Problem -1*/
function newPrice(currentPrice , discount ) {
        if (typeof currentPrice !== 'number' || typeof discount !== 'number' || isNaN(currentPrice) || isNaN(discount)) {
            return "Invalid";
        }

        if (discount < 0 || discount > 100) {
            return "Invalid";
        }

        const discountAmount = (currentPrice * discount) / 100;
        const finalPrice = currentPrice - discountAmount;

        return finalPrice.toFixed(3);
}

console.log(newPrice(1500, 20));
console.log(newPrice(2000, 15));
console.log(newPrice("1000", 10));
