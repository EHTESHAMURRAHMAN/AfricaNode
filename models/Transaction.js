const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userid: { type: String, required: true },
    vaultid: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    blockhash: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
