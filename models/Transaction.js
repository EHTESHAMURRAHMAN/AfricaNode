const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userid: { type: String, required: true },
    vaultid: { type: String, required: true },
    from: { type: String, required: true }, // user vault
    to: { type: String, required: true },   // omnibus wallet
    amount: { type: Number, required: true }, // fund added or withdrawn
    type: { type: String, enum: ["credit", "debit"], required: true }, // credit = to omnibus, debit = from omnibus
    blockhash: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
