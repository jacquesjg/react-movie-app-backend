const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      unique: true,
    },
    poster: {
      type: String,
    },
    imdbLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("movie", movieSchema);