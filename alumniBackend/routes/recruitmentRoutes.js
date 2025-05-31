const express = require("express");
const router = express.Router();
const {
  addJob,
  bulkInsert,
  getAllJobs,
  getJobById
} = require("../controllers/recruitmentController");

router.post("/", addJob);
router.post("/bulk", bulkInsert);
router.get("/", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;
