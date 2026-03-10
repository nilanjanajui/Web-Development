console.log("History UI loaded");

function showHistory() {
    showOnly("history");

    const container = document.getElementById("history-list");
    container.innerHTML = "";

    if (!window.transactions || window.transactions.length === 0) {
        container.innerHTML = `
            <div class="card bg-base-100 shadow p-4 text-center text-sm text-neutral/60">
                No transactions yet
            </div>
        `;
        return;
    }

    // Show latest first
    const reversed = [...window.transactions].reverse();

    reversed.forEach(tx => {
        const sign = tx.type === "ADD_MONEY" ? "+" : "-";
        const color = tx.type === "ADD_MONEY" ? "text-green-600" : "text-red-600";
        const label = tx.type === "ADD_MONEY" ? "Add Money" : "Cashout";

        const card = document.createElement("div");
        card.className = "card bg-base-100 shadow p-4";

        card.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-medium">${label}</p>
                    <p class="text-xs text-neutral/60">${tx.date}</p>
                </div>
                <p class="font-semibold ${color}">
                    ${sign}$${tx.amount}
                </p>
            </div>
        `;

        container.appendChild(card);
    });
}