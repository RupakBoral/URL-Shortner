import { Router } from "express";
import { coreRouter } from "./core/url";

export const router = Router();

router.use('/api/v1', coreRouter);