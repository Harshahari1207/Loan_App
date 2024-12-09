const Loan = require("../model/loan");

class LoanService{
    postLoan = async(data)=>{
        const loan = new Loan(data);
        return await loan.save();
    }
    updateLoan = async(id, data)=>{
        return await Loan.findByIdAndUpdate(id, data);
    }
    getLoan = async(id)=>{
        return await Loan.findById(id);
    }
    deleteLoan = async(id)=>{
        return await Loan.findByIdAndDelete(id);
    }
    getAllLoans = async()=>{
        return await Loan.find();
    }
    getLoansByCustomerId = async(id)=>{
        return await Loan.find({customerId: id});
    }
}

module.exports = new LoanService();