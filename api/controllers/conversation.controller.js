import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readBySeller: !req.isSeller,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(201).send("Saved Conversation");
  } catch (err) {
    res.end(err.message);
  }
};

export const updateConversation = async (req, res) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          //readBySeller:true
          //readByBuyer:true,
          ...createConversation(
            req.isSeller ? { readBySeller: true } : { readByBuyer: true }
          ),
        },
      },
      { new: true }
    );
    res.status(200).send("updated Conversation.");
  } catch (err) {
    res.send(err.message);
  }
};

export const getSingleConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return res.status(404).send("not found");
    res.status(200).send(conversation);
  } catch (err) {
    res.send(err.message);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { BUYERiD: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    res.send(err.message);
  }
};
