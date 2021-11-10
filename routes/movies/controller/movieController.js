const Movie = require('../model/Movie');
const User = require('../../users/model/User');
const errorHandler = require("../../../utils/errorHandler/errorHandler");

async function addToFavorites(req, res) {
  try {
    const { title, poster, imdbLink } = req.body;
    let errObj = {};

    if (!title) {
      errObj.title = "No title";
    };

    if (!poster) {
      errObj.poster = "No poster";
    };

    if (!imdbLink) {
      errObj.imdbLink = "No imdb link";
    };

    if (Object.keys(errObj).length > 0) {
      return res.status(500).json({
        message: "error",
        error: errObj,
      });
    }
    // remember that jw middleware was ran before in router and thats how we got the decoded data
    const decodedData = res.locals.decodedData;
    const foundUser = await User.findOne({ email: decodedData.email })

    const favoritedMovie = new Movie({
      userID: foundUser._id,
      title,
      poster,
      imdbLink,
    });

    const savedMovie = await favoritedMovie.save();
    foundUser.favoriteMovies.push(savedMovie._id);

    await foundUser.save();

    res.json({ message: "success", favoritedMovie });

  } catch (e) {
    res
      .status(500)
      .json(errorHandler(e));
  }
};

async function getAllFavoriteMovies(req, res) {
  const decodedData = res.locals.decodedData;
  const foundUser = await User.findOne({ email: decodedData.email }).populate("favoriteMovies")

  // const foundAllMovies = await Movie.find({}).populate("userID", "username");
  res.json({ message: "success", payload: foundUser.favoriteMovies });
};

module.exports = {
  addToFavorites,
  getAllFavoriteMovies,
}
