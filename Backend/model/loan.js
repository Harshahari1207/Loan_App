const mongoose = require("mongoose");

const loanSchema = mongoose.Schema({
    loanDescription: {
        type: String,
        required: true,
    },
    loanAmount: {
        type: Number,
        required: true,
    },
    loanStatus: {
      type: String,
      default: "Pending",  
    },
    kyc:{
        type: String,
        default: "Pending",
    },
    reason:{
        type: String,
    },
    loanDate: {
        type: Date,
        default: Date.now(),
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
});
   
module.exports = mongoose.model("Loan", loanSchema);