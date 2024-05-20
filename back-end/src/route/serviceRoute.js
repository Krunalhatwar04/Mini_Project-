import express from "express";
import { confirmBooking, getAllBookings, registerServiceCenter, servicecenter, updateServiceCenter } from "../controller/serviceCentre.js";

const service_route=express.Router();

// service_route.post('/',registerServiceCenter);
// service_route.post('/',servicecenter);
// service_route.put('/:id',updateServiceCenter);

service_route.get('/', servicecenter);
service_route.post('/', registerServiceCenter);
service_route.put('/:id', updateServiceCenter);
service_route.post('/booking', confirmBooking);
service_route.get('/bookingview', getAllBookings);


export default service_route;