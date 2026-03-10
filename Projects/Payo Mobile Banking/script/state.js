console.log("State management loaded");

// Global transaction store
window.transactions = [];

/**
 * Add a transaction to memory
 * @param {string} type - ADD_MONEY | CASHOUT
 * @param {number} amount
 * @param {object} meta - extra info (bank, agent, etc.)
 */
window.addTransaction = function (type, amount, meta = {}) {
    const transaction = {
        id: Date.now(), // simple unique id
        type,
        amount,
        meta,
        date: new Date().toLocaleString()
    };

    window.transactions.push(transaction);

    console.log("Transaction added:", transaction);
    console.table(window.transactions);
};