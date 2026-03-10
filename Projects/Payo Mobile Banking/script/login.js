console.log("Login functionality loaded");

document
    .getElementById("login-btn")
    .addEventListener("click", function () {

        // 1️⃣ Get values
        const contactNumber = document
            .getElementById("input-number")
            .value
            .trim();

        const pin = document
            .getElementById("input-pin")
            .value
            .trim();

        // 2️⃣ Validate mobile number
        if (!/^\d{11}$/.test(contactNumber)) {
            alert("Please enter a valid 11-digit mobile number");
            return;
        }

        // 3️⃣ Validate PIN
        if (!/^\d{4}$/.test(pin)) {
            alert("PIN must be exactly 4 digits");
            return;
        }

        // 4️⃣ Check credentials (demo logic)
        const DEMO_NUMBER = "01234567890";
        const DEMO_PIN = "1234";

        if (contactNumber === DEMO_NUMBER && pin === DEMO_PIN) {
            alert("Login successful");

            // Navigate to home
            window.location.assign("home.html");
        } else {
            alert("Invalid mobile number or PIN");
        }

    });
