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
    res.status(500).json({
      ERROR_MESSAGE: "There was an error while retrieving the accounts."
    });
  }
});

// GET ACCOUNT FOR THE ID PASSED AS PARAM
router.get("/:id", validateAccountsId, async (req, res) => {
  try {
    res.status(200).json(req.account);
  } catch (error) {
    res.status(500).json({
      ERROR_MESSAGE: "There was an error while retrieving the accounts."
    });
  }
});

//ADD AN ACCOUNT
router.post("/", validateAccount, async (req, res) => {
  try {
    const account = await accountsHelper.add(req.body);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({
      ERROR_MESSAGE: "There was an error while inserting the account."
    });
  }
});

//UPDATE AN ACCOUNT
router.put("/:id", validateAccountsId, validateAccount, async (req, res) => {
  try {
    const accountId = req.params.id;
    const updateAccount = await accountsHelper.update(accountId, req.body);
    res.status(200).json(updateAccount);
  } catch (error) {
    res.status(500).json({
      ERROR_MESSAGE: "There was an error while updating the account."
    });
  }
});

// This is a custom middleware function to validate accounts Id
// The following validations have been performed.
// 1. Check if the id exist in the req params.
// 2. Check if id is not null 0 or empty string
// 3. Check if the id is available in the database
async function validateAccountsId(req, res, next) {
  if (req.params.id) {
    if (req.params.id !== 0 && req.params.id !== null && req.params.id !== "") {
      const account = await accountsHelper.findById(req.params.id);
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(400).json({
          ERROR_MESSAGE:
            "No account available for this post id in the database."
        });
      }
    } else {
      res.status(400).json({
        ERROR_MESSAGE: "The account id provided is either null or empty."
      });
    }
  } else {
    res
      .status(400)
      .json({ ERROR_MESSAGE: "There is no account id available." });
  }
}

//This is a custom middleware to validate a project
// Following are the validations:
// 1. Validates the body on a request to create a new project
// 2. validate if request body is not missing else 400
// 3. validate if the request body has the name and description field
function validateAccount(req, res, next) {
  if (req.body) {
    if (req.body.name && req.body.budget) {
      next();
    } else {
      res.status(400).json({
        ERROR_MESSAGE: "Missing required name field or budget field"
      });
    }
  } else {
    res.status(400).json({ ERROR_MESSAGE: "Missing account data." });
  }
}
module.exports = router;
