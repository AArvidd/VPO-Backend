import { Elysia } from "elysia"
import mongoose from "mongoose"
import cors from "@elysiajs/cors";

await mongoose.connect("mongodb+srv://Arvid:mongodb_test@cluster0.nnblr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const article_schema = new mongoose.Schema({
    name: {type: String, require: true},
    faction: {type: String, requierd: true},
    points: {type: Number, require: true},
    description: String,
    tags: {type: [], require: true}
})
const factions_schema = new mongoose.Schema({
    name: {type: String, require: true},
    tegs: {type: [], require: true}
})

const article = mongoose.model("förmedling-article", article_schema)
const factions = mongoose.model("förmedling-factions", factions_schema)

new Elysia()
    .use(cors())
    .post("/article", async ({ body, set }) => {
        let obj = JSON.parse(body)
        console.log(obj)
        try {
            let save = new article(obj)
            await save.save()
        } catch (error) {
            set.status = 400
            return error
        }
    })
    .get("/article", async ({ body, set }) => {
        try {
            return await article.find(body)
        } catch (error) {
            set.status = 400
            return error
        }
    })
    .get("/factions", async ({ set }) => {
        try {
            return await factions.find({})
        } catch (error) {
            set.status = 400
            return error
        }
    })
    .listen(3030);

console.log("Server on")
