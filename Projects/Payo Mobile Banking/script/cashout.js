document
    .getElementById("cashout-btn")
    .addEventListener("click", function () {

        const agent = getValueFromInput("cashout-number");
        if (!/^\d{11}$/.test(agent)) {
            alert("Agent number must be exactly 11 digits");
            return;
        }

        const amount = Number(getValueFromInput("cashout-amount"));
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        const pin = getValueFromInput("cashout-pin");
        if (!/^\d{4}$/.test(pin)) {
            alert("PIN must be 4 digits");
            return;
        }

        if (pin !== "1234") {
            alert("Invalid PIN");
            return;
        }

        const currentBalance = getBalance();
        const newBalance = currentBalance - amount;

        if (newBalance < 0) {
            alert("Insufficient balance");
            return;
        }

        setBalance(newBalance);

        // ✅ NEW: log transaction
        addTransaction("CASHOUT", amount, { agent });

        alert(`Cashout Successful!
Agent: ${agent}
Amount: $${amount}`);
    });