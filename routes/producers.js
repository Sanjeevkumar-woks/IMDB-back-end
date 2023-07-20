import {
    getProducersByFilter,
    getProducerById,
    deleteProducerById,
    addProducers,
    updateProducerById,
  } from "../helper.js";
  import express from "express";
  import { auth } from "../middleware/auth.js";
  const router = express.Router();
  
  router.get("/", async (req, res) => {
    if (req.query.rating) {
      req.query.rating = +req.query.rating;
    }
    const Producers = await getProducersByFilter(req);
    res.send(Producers);
  });
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    //db.Producers.findOne({id:"102"})
    // var Producer=Producers.find((x)=>x.id===id)
    const Producer = await getProducerById(id);
    Producer
      ? res.send(Producer)
      : res.status(404).send({ message: "no Producers found" });
  });
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const Producer = await deleteProducerById(id);
    res.send(Producer);
  });
  
  router.post("/", async (req, res) => {
    const newProducers = req.body;
    const result = await addProducers(newProducers);
    res.send(result);
  });
  
  router.put("/:id", async (req, res) => {
      const { id } = req.params;
      const updateProducer = req.body;
      const result = await updateProducerById(id,updateProducer);
      res.send(result);
    });
  
  export const ProducersRouter = router;
  