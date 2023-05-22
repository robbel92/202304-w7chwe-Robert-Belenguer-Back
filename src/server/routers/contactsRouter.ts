import { Router } from "express";
import { getContacts } from "../controllers/contacts/contactsController.js";

const contactsRouter = Router();

contactsRouter.get("/", getContacts);

export default contactsRouter;
