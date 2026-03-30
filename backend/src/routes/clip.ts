import { Request, Response, Router } from "express";
import redisClient from "../config/redis";

export const tinyRouter = Router();

tinyRouter.get('/clip/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const unique_id = req.params.id ?? null;

        if (!unique_id || unique_id.trim() === '') {
            console.error("No id found");
            res.status(500).json({ success: false, message: "Please provide a valid URL." });
            return;
        }

        const url: string | null = await redisClient.get(unique_id);

        if (!url || url.trim() === '') {
            res.status(404).json({ success: false, message: 'URL not found or expired.' });
            return;
        }

        res.redirect(url);

    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ success: false, message: "No URL mapping found, Please try again." });
    }
});