const KycService = require("../service/kycService");

class KycController {
  postKyc = async (req, res) => {
    try {
      const result = await KycService.postKyc(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  getKyc = async (req, res) => {
    try {
      const result = await KycService.getKyc(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new KycController();
