const Transaction = require("../models/Transaction");
const ApiResponse = require("../models/ApiResponse");

// POST Create Transaction
exports.createTransaction = async (req, res) => {
    try {
        const { name, userid, vaultid, from, to, blockhash, amount, type } = req.body;

        // Validate required fields
        if (!name || !userid || !vaultid || !from || !to || !blockhash || amount === undefined || !type) {
            return res.status(400).json(new ApiResponse(
                false,
                "All fields including amount and type are required",
                null
            ));
        }

        // Validate type
        if (!["credit", "debit"].includes(type)) {
            return res.status(400).json(new ApiResponse(
                false,
                "Type must be either 'credit' or 'debit'",
                null
            ));
        }

        const newTx = await Transaction.create({ name, userid, vaultid, from, to, blockhash, amount, type });
        res.status(201).json(new ApiResponse(true, "Transaction created successfully", newTx));
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json(new ApiResponse(false, "Blockhash already exists", null));
        }
        res.status(500).json(new ApiResponse(false, err.message, null));
    }
};

// GET All Transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        const message = transactions.length ? "Transactions fetched successfully" : "No transactions found";
        res.json(new ApiResponse(true, message, transactions));
    } catch (err) {
        res.status(500).json(new ApiResponse(false, err.message, null));
    }
};

// GET Transactions by UserID
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
