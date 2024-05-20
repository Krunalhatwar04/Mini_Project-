import express from "express";
import { AdninUser } from "../controller/Admin.js";


const Admin_route=express.Router();

Admin_route.post('/',AdninUser);
export default Admin_route;