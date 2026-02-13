const Transaction = require("../models/Transaction");
const ApiResponse = require("../models/ApiResponse");

exports.createTransaction = async (req, res) => {
    try {
        const { name, userid, vaultid, from, to, blockhash } = req.body;
        if (!name || !userid || !vaultid || !from || !to || !blockhash) {
            return res.status(400).json(new ApiResponse(false, "All fields are required", null));
        }

        const newTx = await Transaction.create({ name, userid, vaultid, from, to, blockhash });
        res.status(201).json(new ApiResponse(true, "Transaction created successfully", newTx));
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json(new ApiResponse(false, "Blockhash already exists", null));
        }
        res.status(500).json(new ApiResponse(false, err.message, null));
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        const message = transactions.length ? "Transactions fetched successfully" : "No transactions found";
        res.json(new ApiResponse(true, message, transactions));
    } catch (err) {
        res.status(500).json(new ApiResponse(false, err.message, null));
    }
};

exports.getTransactionsByUser = async (req, res) => {
    const { userid } = req.params;
    try {
        if (!userid) {
            return res.status(400).json(new ApiResponse(false, "UserID is required", null));
        }

        const transactions = await Transaction.find({ userid }).sort({ createdAt: -1 });
        const message = transactions.length ? "Transactions fetched successfully" : "No transactions found for this user";

        res.json(new ApiResponse(true, message, transactions));
    } catch (err) {
        res.status(500).json(new ApiResponse(false, err.message, null));
    }
};
