const loanService = require("../service/loanService");

class AdminController{

    getAllLoans = async (req, res) => {
        try {
          const loans = await loanService.getAllLoans();
          res.status(200).json(loans);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      };

      updateLoan = async (req, res) => {
        try {
          const loan = await loanService.updateLoan(req.params.id, req.body);
          if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
          }
          res.status(200).json(loan);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      };
      deleteLoan = async (req, res) => {
        try {
          const loan = await loanService.deleteLoan(req.params.id);
          if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
          }
          res.status(200).json({ message: "Loan deleted successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      };

}

module.exports = new AdminController();