import express from "express";
import { PreInterviewBody } from "./types";
import { scrapeGithub } from "./scrapers/github";
import cors from "cors";
import {prisma} from "./db";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/pre-interview" , async (req, res) => {

    const { success, data } = PreInterviewBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Incorrect links provided"
        })
        return;
    }

    const githubUrl = data.github.endsWith("/") ? data.github.slice(0,-1) : data.github;
    const githubUsername = githubUrl.split("/").pop()!;
    const githubData = await scrapeGithub(githubUsername);

    const interview = await prisma.interview.create({
        data: {
            githubMetaData: JSON.stringify(githubData),
            status: "Pre"
        }
    })

    res.json({id :interview.id});
})

app.listen(3001, () => {
    console.log("backend is running on 3001")
});