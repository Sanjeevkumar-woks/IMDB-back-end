import {
  getMoviesByFilter,
  getMovieById,
  deleteMovieById,
  addMovies,
  updateMovieById,
} from "../helper.js";
import express from "express";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const movies = await getMoviesByFilter(req);
  res.send(movies);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //db.movies.findOne({id:"102"})
  // var movie=movies.find((x)=>x.id===id)
  const movie = await getMovieById(id);
  movie
    ? res.send(movie)
    : res.status(404).send({ message: "no movies found" });
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await deleteMovieById(id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  const newmovies = req.body;
  const result = await addMovies(newmovies);
  res.send(result);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateMovie = req.body;
    const result = await updateMovieById(id,updateMovie);
    res.send(result);
  });

export const moviesRouter = router;
