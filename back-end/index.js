import express from "express";
import { conn } from "./src/config/utility.js";
import { getusers, loginUser, updateUser, userAdd } from "./src/controller/userController.js";
import  cors from 'cors'
import { registerServiceCenter, servicecenter, updateServiceCenter } from "./src/controller/serviceCentre.js";
import { AdninUser } from "./src/controller/Admin.js";
import userRouter from "./src/route/userRoute.js";
import serviceCenterRouter from "./src/route/serviceRoute.js"
import Admin_route from "./src/route/AdminRoute.js";
import service_route from "./src/route/serviceRoute.js";
const PORT=6800;
const app=express();


app.use(cors());
app.use(express.json())
// app.use('/signup',userAdd);
// app.use('/login',loginUser);
// app.use('/service',registerServiceCenter);
// app.use('/admin',AdninUser);
// app.use('/getusers',getusers);
// app.use('/servicecenter',servicecenter);
// app.use('/users',updateUser);
// app.use('/updateservice',updateServiceCenter);

app.use('/users', userRouter);
app.use('/servicecenters', service_route);
app.use('/admin', Admin_route);

app.delete('/deleteuser', (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM users WHERE id = ?';
    conn.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send('User deleted successfully');
    });
});

app.listen(PORT,()=>{
    conn.connect((error)=>{
        if(error){
            console.log("Error in DB connection");
            console.log(error);
        }
        else{
            console.log("Database connected !");
        }
    });
    console.log(`Server running on port ${PORT}`);
 })








