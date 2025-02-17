const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
const validateMiddleware = require("../middleware/validateMiddleware");

router.get("/", customerController.getAllCustomers);

router.get("/:id", customerController.getCustomerById);

router.post(
  "/",
  validateMiddleware.validateMiddleware,
  customerController.createCustomer
);

router.put(
  "/:id",
  validateMiddleware.validateMiddleware,
  customerController.updateCustomer
);
router.patch(
  "/:id",
  validateMiddleware.validateMiddleware,
  customerController.updateCustomer
);

router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
