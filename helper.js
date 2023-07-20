import { client } from "./index.js";
import  bcrypt from "bcrypt";
import { ObjectId } from "mongodb";


// users login and signup
export async function genPassword(password){
  const salt= await bcrypt.genSalt(10) //bcrypt.genSalt(no. of rounds)
  const hashedPassword=await bcrypt.hash(password,salt);
  return hashedPassword;
}

export async function addUser(username,hashPassword) {
  const newuser={
    "username":username,
    "password": hashPassword
  }
  return await client.db("imdb").collection("users").insertOne(newuser);
}

export async function getUserByName(username) {
 return await client.db("imdb").collection("users").findOne({"username":username});
}

//movies 

export function getMoviesByFilter(req) {
  return client.db("imdb").collection("movies").find(req.query).toArray();
}
export function getMovieById(id) {
  return client.db("imdb").collection("movies").findOne({ _id: ObjectId(id)});
}
export function deleteMovieById(id) {
  return client.db("imdb").collection("movies").deleteOne({ _id: ObjectId(id) });
}
export function updateMovieById(id,updateMovie) {
    return client.db("imdb").collection("movies").updateOne({ _id: ObjectId(id) },{$set:updateMovie});
  }
export async function addMovies(newmovies) {
  return await client.db("imdb").collection("movies").insertMany(newmovies);
}

//actors
export function getActorsByFilter(req) {
  return client.db("imdb").collection("Actors").find(req.query).toArray();
}
export function getActorById(id) {
  return client.db("imdb").collection("Actors").findOne({ _id: ObjectId(id)});
}
export function deleteActorById(id) {
  return client.db("imdb").collection("Actors").deleteOne({ _id: ObjectId(id) });
}
export function updateActorById(id,updateActor) {
    return client.db("imdb").collection("Actors").updateOne({ _id: ObjectId(id) },{$set:updateActor});
  }
export async function addActors(newActors) {
  return await client.db("imdb").collection("Actors").insertMany(newActors);
}

//Producers

export function getProducersByFilter(req) {
  return client.db("imdb").collection("Producers").find(req.query).toArray();
}
export function getProducerById(id) {
  return client.db("imdb").collection("Producers").findOne({ _id: ObjectId(id)});
}
export function deleteProducerById(id) {
  return client.db("imdb").collection("Producers").deleteOne({ _id: ObjectId(id) });
}
export function updateProducerById(id,updateProducer) {
    return client.db("imdb").collection("Producers").updateOne({ _id: ObjectId(id) },{$set:updateProducer});
  }
export async function addProducers(newProducers) {
  return await client.db("imdb").collection("Producers").insertMany(newProducers);
}