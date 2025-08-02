import express from 'express'
import { prismaClient as prisma } from 'db/client'
import { authMiddleware } from './middleware';
import cors from 'cors'
import { createWebsite, deleteWebsite, getWebsiteStatus } from './schema';

const app = express()
app.use(express.json())
app.use(cors())

app.post("/api/v1/website", async (req, res, next) => {
    await authMiddleware(req, res, next);
}, async (req, res) => {


    const parsedData = createWebsite.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({ error: parsedData.error });
        return
    }

    const userId = req.userId!;
    const { url } = parsedData.data

    const data = await prisma.website.create({
        data: {
            userId,
            url,
        },
         
    });

    res.status(201).json({ id: data.id });

});

    

app.get("/api/v1/website/status", async (req, res, next) => {
    await authMiddleware(req, res, next);
}, async (req, res) => {

    //add zod if possible -- ofcourse! here I go

    const parsedData = getWebsiteStatus.safeParse(req.query);

      if (!parsedData.success) {
          res.status(400).json({ error: parsedData.error.flatten() });
          return
  }
    const {websiteId} =parsedData.data
    const userId = req.userId;
    const data = await prisma.website.findFirst({
        where: {
            id: websiteId,
            userId
        },
        include: {
            ticks: true
        }
    })
    res.json(
        data
    )
})

app.get("/api/v1/websites", async (req, res, next) => {
    await authMiddleware(req, res, next);
}, async (req, res) => {

    const userId = req.userId!;

   const websites = await prisma.website.findMany({
        where: {
           userId,
            disabled: false
       }, 
       include: {
           ticks: true
       }
    })

    res.json (websites)
})

app.delete("/api/v1/website/", async (req, res, next) => {
    await authMiddleware(req, res, next);
}, async (req, res) => {

    const parsedData = deleteWebsite.safeParse(req.body);

    if (!parsedData.success) {
          res.status(400).json({ error: parsedData.error });
          return
    };

    const userId = req.userId!;
    const {websiteId} = parsedData.data
    await prisma.website.update({
        where: {
            id: websiteId,
            userId
        },
        data: {
            disabled: true
        }
    })

    res.json({
        message: "Deleted Website Successfully!"
    })
})


app.listen(process.env.PORT, () => {console.log(`app is listening @${process.env.PORT}`)})