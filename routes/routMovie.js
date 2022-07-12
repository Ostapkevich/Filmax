/*jshint esversion: 8 */

const { Router } = require("Express");
const routMovie = Router();

routMovie.get("/movie:namevideo", (req, res) => {
  try {
    res.render("movie", {
      title: req.params.namevideo,
      layout: null,
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routMovie;
