document
    .getElementById("add-money-btn")
    .addEventListener("click", function () {

        const bank = getValueFromInput("add-money-bank");
        if (!bank) {
            alert("Please select a bank");
            return;
        }

        const accountNumber = getValueFromInput("add-money-number");
        if (!/^\d{11}$/.test(accountNumber)) {
            alert("Account number must be exactly 11 digits");
            return;
        }

        const amount = Number(getValueFromInput("add-money-amount"));
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        const pin = getValueFromInput("add-money-pin");
        if (!/^\d{4}$/.test(pin)) {
            alert("PIN must be 4 digits");
            return;
        }

        if (pin !== "1234") {
            alert("Invalid PIN");
            return;
        }

        const currentBalance = getBalance();
        const newBalance = currentBalance + amount;
        setBalance(newBalance);

        // ✅ NEW: log transaction
        addTransaction("ADD_MONEY", amount, { bank });

        alert(`Add Money Successful!
Bank: ${bank}
Amount: $${amount}`);
    });