import { conn } from "../config/utility.js";
import { SERVICE_CENTER_BOOKING, SERVICE_CENTER_TABLE_NAME } from "../constrain/dbconstrain.js";
// import { compareSync, hashSync } from "bcrypt";
// import bcrypt from 'bcrypt';


// export const userAdd = async (req, res) => {
//     const { name, pass, email, phone, address, pin_code, city, state } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(pass, 10);
//         const query = 'INSERT INTO service_center (name, pass, email, phone, address, pin_code, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//         const [results] = await pool.execute(query, [name, hashedPassword, email, phone, address, pin_code, city, state]);
//         res.status(201).json({ message: 'Service Center registered successfully' });
//     } catch (error) {
//         if (error.code === 'ER_DUP_ENTRY') {
//             res.status(409).json({ message: 'Email already exists' });
//         } else {
//             res.status(500).json({ message: 'Something went wrong', error });
//         }
//     }

// }


export const registerServiceCenter = (req, res) => {
    const { name, pass, email, phone, address, pin_code, city, state } = req.body;
    const qry = `INSERT INTO ${SERVICE_CENTER_TABLE_NAME} (name, pass, email, phone, address, pin_code, city, state) VALUES ('${name}', '${pass}', '${email}', '${phone}', '${address}', '${pin_code}', '${city}', '${state}')`;

    console.log('Executing query:', qry); 

    conn.query(qry, (error, result) => {
        if (error) {
            console.error('Error executing query:', error); 
            res.status(500).send({ message: 'Something went wrong', error });
        } else {
            console.log(result);
            res.status(200).send({ message: 'Service Center registered successfully' });
        }
    });
};
export const confirmBooking=(req,res)=>{
    const { name, address, date, brand, service_type, description } = req.body;
    const qry=`INSERT INTO ${SERVICE_CENTER_BOOKING} (name, address, date, brand, service_type, description) VALUES ('${name}', '${address}', '${date}', '${brand}', '${service_type}', '${description}') `;

    console.log('Executing query:', qry); 

    conn.query(qry, (error, result) => {
        if (error) {
            console.error('Error executing query:', error); 
            res.status(500).send({ message: 'Something went wrong', error });
        } else {
            console.log(result);
            res.status(200).send({ message: 'Service Center registered successfully' });
        }
    });
};


export const servicecenter=async(req,res)=>{
    const qry=`select * from ${SERVICE_CENTER_TABLE_NAME} `;
    conn.query(qry,(error,results)=>{
        if(error){
            res.status(500).send({message:"Somthing went wrong"});

        }
        else{
            res.status(200).send(results);
        }
    })
}


// Function to update a service center
export const updateServiceCenter = (req, res) => {
    const serviceCenterId = req.params.id;
    const { name, email, phone, address } = req.body;

    const qry = `UPDATE service_center SET name=?, email=?, phone=?, address=? WHERE id=?`;

    conn.query(qry, [name, email, phone, address, serviceCenterId], (error, result) => {
        if (error) {
            console.error("Error updating service center:", error);
            return res.status(500).send({ message: "Something went wrong" });
        } else {
            console.log("Service center updated successfully");
            return res.status(200).send({ message: "Your Booking  Confirm successfully" });
        }
    });
};




export const getAllBookings = (req, res) => {
    const qry = 'SELECT * FROM bookings';
    conn.query(qry, (error, results) => {
        if (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).send({ message: "Something went wrong" });
        } else {
            return res.status(200).json(results);
        }
    });
};



