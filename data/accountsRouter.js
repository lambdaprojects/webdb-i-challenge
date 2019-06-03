const express = require("express");
const router = express.Router();
const accountsHelper = require("./accounts-model.js");

// GET ALL ACCOUNTS
router.get("/", async (req, res) => {
  try {
    const accounts = await accountsHelper.find();
    if (accounts.length > 0) {
      res.status(200).json(accounts);
    } else {
      res
        .status(400)
        .json({ ERROR_MESSAGE: "There are no accounts to display" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ERROR_MESSAGE: "There was an error while retrieving the accounts."
    });
  }
});

module.exports = router;
