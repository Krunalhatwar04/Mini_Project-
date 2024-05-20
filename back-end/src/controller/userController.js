import { TABLE_NAME } from "../constrain/dbconstrain.js";
import { conn } from "../config/utility.js";
import { compareSync, hashSync } from "bcrypt";
import bcrypt from 'bcrypt';

// export const userAdd=async (req,res)=>{
    
//     const { username, email, password, city ,contact_no} = req.body;
//     const encryptedPassword=hashSync(password,10);
    // const qry=`insert into ${TABLE_NAME} values(${username},'${email}',${encryptedPassword},'${city}','${contact_no}')`;
    
    // conn.query(qry,(error,result)=>{
    //     if(error){
    //         res.status(500).send({message:'Somthing went wrong'});
    //     }//43 mins duplicate entry
    //     else{
    //         console.log(result);
    //         res.status(200).send({message:'Data inserted'})
    //     }
    // })
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const query = 'INSERT INTO users (username, email, password, city, contact_no) VALUES (?, ?, ?, ?, ?)';
//         db.execute(query, [username, email, hashedPassword, city, contact_no], (error, results) => {
//             if (error) {
//                 if (error.code === 'ER_DUP_ENTRY') {
//                     return res.status(409).json({ message: 'Email already exists' });
//                 }
//                 return res.status(500).json({ message: 'Something went wrong', error });
//             }
//             res.status(201).json({ message: 'User registered successfully' });
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }

// }


export const userAdd = async (req, res) => {
    const { username, email, password, city, contact_no } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (username, email, password, city, contact_no) VALUES (?, ?, ?, ?, ?)';
        conn.query(query, [username, email, hashedPassword, city, contact_no], (error, results) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'Email already exists' });
                }
                console.log(error);
                return res.status(500).json({ message: 'Something went wrong', error });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {

        res.status(500).json({ message: 'Server error', error });
    }
}

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const qry=`select * from ${TABLE_NAME} where email='${email}'`;
    conn.query(qry,(error,result)=>{
        if(error){
            res.status(500).send({message:'Somthing went wrong'});

        }
        else{
            if(result.length==0){
                res.status(400).send({message:'Invalid   email'})
            }
            else{
                const encryptedPassword=result[0].password;
                if(compareSync(password,encryptedPassword)){
                    res.status(200).send({message:'Login Successful'});
            }
            else{
                res.status(400).send({message:'Invalid password for the email'})
            }

        }
}})};


export const getusers=async(req,res)=>{
    const qry=`select * from ${TABLE_NAME} `;
    conn.query(qry,(error,results)=>{
        if(error){
            res.status(500).send({message:"Somthing went wrong"});

        }
        else{
            res.status(200).send(results);
        }
    })

    
}


    // export const updateUser = (req, res) => {
    //     const { username, email,city, contact_no   } = req.body;
    //     const qry = `UPDATE ${TABLE_NAME} SET username='${username}', email='${email}' , city='${city}', contact_no ='${contact_no}' WHERE id=${req.params.id}`;
    //     console.log(req.params.id);
    //     conn.query(qry, (error, result) => {
    //         if (error) {
    //             res.status(500).send({ message: "Something went wrong" });
    //             console.log(error);
    //         } else {
    //             res.status(200).send({ message: "User updated successfully" });
    //         }
    //     });
    // };


    
    // export const updateUser = (req, res) => {
    //     const { id,username, email,city, contact_no   } = req.body;
    //     const userId = req.params.id;
    //     console.log(userId);
    //     const qry = `UPDATE ${TABLE_NAME} SET id=?,username = ?, email = ?, city = ?, contact_no = ? WHERE id = ?`;

    //     conn.query(qry, [id,username, email,city ,contact_no, userId], (error, result) => {
    //         if (error) {
    //             res.status(500).send({ message: "Something went wrong" });
    //             console.log(error);
    //         } else {
    //             res.status(200).send({ message: "User updated successfully" });
    //             console.log(userId);
    //             console.log(username);
    //         }
    //     });


// };

// export const updateUser = (req, res) => {
//     const { id, username, email, city, contact_no } = req.body;
//     const userId = req.params.id;
//     console.log(userId);
//     const qry = `UPDATE ${TABLE_NAME} SET id=?, username=?, email=?, city=?, contact_no=? WHERE id=?`;

//     conn.query(qry, [id, username, email, city, contact_no, userId], (error, result) => {
//         if (error) {
//             res.status(500).send({ message: "Something went wrong" });
//             console.log(error);
//         } else {
//             res.status(200).send({ message: "User updated successfully" });
//             console.log(userId);
//             console.log(username);
//         }
//     });
// };

// Assuming you have imported necessary dependencies and defined the connection to the database (conn)

// export const updateUser = (req, res) => {
//     const userId = req.params.id;
//     console.log(userId);
//     const { username, email, city, contact_no } = req.body;

   
//     const qry = `UPDATE users SET username=?, email=?, city=?, contact_no=? WHERE id=?`;

//     conn.query(qry, [username, email, city, contact_no, userId], (error, result) => {
//         if (error) {
//             console.error("Error updating user:", error);
//             return res.status(500).send({ message: "Something went wrong" });
//         } else {
//             console.log("User updated successfully");
//             return res.status(200).send({ message: "User updated successfully" });
//         }
//     });
// };

export const updateUser = (req, res) => {
    const userId = req.params.id;
    const { username, email, city, contact_no } = req.body;

    const qry = `UPDATE users SET username=?, email=?, city=?, contact_no=? WHERE id=?`;

    conn.query(qry, [username, email, city, contact_no, userId], (error, result) => {
        if (error) {
            console.error("Error updating user:", error);
            return res.status(500).send({ message: "Something went wrong" });
        } else {
            console.log("User updated successfully...");
            return res.status(200).send({ message: "User updated successfully" });
        }
    });
};




 // // Check if required fields are provided
    // if (!userId || !username || !email || !city || !contact_no) {
    //     return res.status(400).send({ message: "All fields are required" });
    // }

    // Update query