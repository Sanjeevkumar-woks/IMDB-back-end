import {
    getActorsByFilter,
    getActorById,
    deleteActorById,
    addActors,
    updateActorById,
  } from "../helper.js";
  import express from "express";
  import { auth } from "../middleware/auth.js";
  const router = express.Router();
  
  router.get("/", async (req, res) => {
    if (req.query.rating) {
      req.query.rating = +req.query.rating;
    }
    const Actors = await getActorsByFilter(req);
    res.send(Actors);
  });
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    //db.Actors.findOne({id:"102"})
    // var Actor=Actors.find((x)=>x.id===id)
    const Actor = await getActorById(id);
    Actor
      ? res.send(Actor)
      : res.status(404).send({ message: "no Actors found" });
  });
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const Actor = await deleteActorById(id);
    res.send(Actor);
  });
  
  router.post("/", async (req, res) => {
    const newActors = req.body;
    const result = await addActors(newActors);
    res.send(result);
  });
  
  router.put("/:id", async (req, res) => {
      const { id } = req.params;
      const updateActor = req.body;
      const result = await updateActorById(id,updateActor);
      res.send(result);
    });
  
  export const ActorsRouter = router;
  