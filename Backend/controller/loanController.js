const loanService = require("../service/loanService");
class LoanController {
    postLoan = async (req, res) => {
        try {
          const loan = await loanService.postLoan(req.body);
          res.status(201).json(loan);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      };
    getLoansByCustomerId = async (req, res) => {
        try {
          const loans = await loanService.getLoansByCustomerId(req.params.id);
          res.status(200).json(loans);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
    }
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

      getALoan = async (req, res) => {
        try {
          const loan = await loanService.getLoan(req.params.id);
          if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
          }
          res.status(200).json(loan);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      };
      
      
}

module.exports = new LoanController();