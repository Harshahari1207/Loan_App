const Kyc = require("../model/kyc");

class KycService{
    postKyc = async(data)=>{
        const kyc = new Kyc(data);
        return await kyc.save();
    }
    grtKyc = async(id)=>{
        return await Kyc.findById(id);
    }
}

module.exports = new KycService();