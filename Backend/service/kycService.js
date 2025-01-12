const Kyc = require("../model/kyc");

class KycService {
  postKyc = async (data) => {
    console.log("Inside kyc service", data)
    const kyc = new Kyc(data);
    return await kyc.save();
  };
  getKyc = async (id) => {
    return await Kyc.findOne({customerId: id});
  };
}

module.exports = new KycService();
