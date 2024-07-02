const Store = require("../models/storeModel.js");

class StoreController {
  async addStore(req, res) {
    const role=req.role;
    const currentUserID=req.user.id;
    const { name, email, address } = req.body;

    try {
        if(role==="User"){
            return res.status(401).json({ msg: "authorization denied  for User role" });
        }
      const store = await Store.findOne({ email });
      if (store) {
        return res
          .status(400)
          .json({ msg: "Store already exists with tis email" });
      }
      const newStore = await Store.create({ name, email, address, owner:currentUserID });
      res.status(200).json({success:"OK",store:newStore});
    } catch (err) {
      res.status(500).json({ msg: "internal Server error",error:err });
    }
  }


  async getAllStore(req,res){
    try {
        const stores = await Store.find().populate('owner').populate('ratings');
        if(!stores){
            return res.status(400).json({msg:"no store found"});
        }
        res.status(200).json(stores);
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server error',error:err });
    }
  }


  async getMyStore(req,res){
    try {
        const stores = await Store.find({owner:req.user.id}).populate('owner').populate('ratings');
        if(!stores){
            return res.status(400).json({msg:"no store found"});
        }
        res.status(200).json(stores);
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server error',error:err });
    }
  }
}

module.exports = StoreController;
