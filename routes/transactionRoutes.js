const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/transactions", transactionController.createTransaction);

router.get("/transactions", transactionController.getAllTransactions);

router.get("/transactions/user/:userid", transactionController.getTransactionsByUser);


module.exports = router;
