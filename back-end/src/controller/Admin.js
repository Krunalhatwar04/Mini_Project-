const adminLogin = {
    email: 'admin@gmail.com',
    password: 'admin@12345'
};

export const AdninUser=async(req,res)=>{
    const {email,password}=req.body;

if (email === adminLogin.email && password === adminLogin.password) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }

}