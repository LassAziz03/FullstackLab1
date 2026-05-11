const Video = require("../models/video");

const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("userId", "username")
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVideosByUser = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.params.userId })
      .populate("userId", "username")
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVideosByCategory = async (req, res) => {
  try {
    const videos = await Video.find({ categoryId: req.params.categoryId })
      .populate("userId", "username")
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      title: { $regex: req.params.title, $options: "i" }
    })
      .populate("userId", "username")
      .populate("categoryId", "name");

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json(updatedVideo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);

    if (!deletedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVideo,
  getVideos,
  getVideosByUser,
  getVideosByCategory,
  searchVideos,
  updateVideo,
  deleteVideo
};