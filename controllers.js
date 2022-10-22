const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, "must provid a name"],
    // trim: true,
    // maxlength: [20, "name can not be more than 20 charachter"],
  },
  lastName: {
    type: String,
    // required: [true, "must provid a name"],
    // trim: true,
    // maxlength: [20, "name can not be more than 20 charachter"],
  },
  paid: {
    type: Boolean,
    default: false,
  },
  profileImg: {
    type: String, //Object,
  },
});

// creating the client model
const Client = mongoose.model("Clients", clientSchema);

//get all items in collection
const getAllClients = async (erq, res) => {
  try {
    const clients = await Client.find({});
    res.status(200).json({ clients });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

// create a client
const createClient = async (req, res) => {
  try {
    console.log(req.body);
    await Client.create(req.body);
    res.status(200).json(req.body);
  } catch (error) {
    console.log("CLIENT NOT CREATED !!!!", error);
  }
};

// get a single item from db
const getClient = async (req, res) => {
  try {
    const clientID = req.params.id;
    const client = await Client.findOne({ _id: clientID });
    if (!client) {
      return res
        .status(404)
        .json({ msg: `No Client matching the id: ${clientID}` });
    }
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ msg: "there was an errorr" });
  }
};

//delete a client by _id
const deleteClient = async (req, res) => {
  try {
    const clientID = req.params.id;
    const client = await Client.deleteOne({ _id: clientID });
    if (!client) {
      return res
        .status(404)
        .json({ msg: `No Client matching the id: ${clientID}` });
    }
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ msg: "there was an errorr" });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const client = await Client.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!client) {
      return res
        .status(404)
        .json({ msg: `No Client matching the id: ${req.prams.id}` });
    }
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ msg: "there was an errorr " });
  }
};

// get a single item from db
const searchClients = async (req, res) => {
  try {
    const clientName = req.params.name;
    const client = await Client.find({ firstName: clientName });
    if (client.length === 0) {
      return res
        .status(404)
        .json({ ERROR: `No Client matching the Name: ${clientName}` });
    }
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ msg: "error form catch" });
  }
};

module.exports = {
  getClient,
  getAllClients,
  createClient,
  deleteClient,
  updateClient,
  searchClients,
};
