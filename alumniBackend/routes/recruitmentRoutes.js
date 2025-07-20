const express = require("express");
const router = express.Router();
const { addRecruitment, getRecruitments } = require("../controllers/recruitmentController");

router.post("/", addRecruitment);
router.get("/", getRecruitments);

module.exports = router;
