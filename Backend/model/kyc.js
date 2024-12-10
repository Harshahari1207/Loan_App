const mongoose = require("mongoose");

const kycSchema = mongoose.Schema({
    loanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan",
        required: true,
    },
    panNumber: {
        type: String,
        required: true,
    },
    aadharNumber: {
        type: Number,
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
});

module.exports = mongoose.model("KYC", kycSchema);  