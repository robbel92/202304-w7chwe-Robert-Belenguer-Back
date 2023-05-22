import { Router } from "express";

const contactsRouter = Router();

contactsRouter.get("/", getConta);

export default contactsRouter;
