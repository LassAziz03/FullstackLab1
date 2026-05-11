const express = require("express");

const {
  createVideo,
  getVideos,
  getVideosByUser,
  getVideosByCategory,
  searchVideos,
  updateVideo,
  deleteVideo
} = require("../controllers/videoController");

const router = express.Router();

router.post("/", createVideo);

router.get("/", getVideos);

router.get("/user/:userId", getVideosByUser);

router.get("/category/:categoryId", getVideosByCategory);

router.get("/search/:title", searchVideos);

router.put("/:id", updateVideo);

router.delete("/:id", deleteVideo);

module.exports = router;