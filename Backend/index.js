const express = require("express");
const app = express();

// ALL ROUTES IMPORT
const UserRoutes=require("./Router/User");
const ProfileRoutes=require("./Router/Profile");
const PaymentRoutes=require("./Router/Payment");
const CourseRoutes=require("./Router/Course");

// OTHER MIDDLEWARES OR UTILITIES
const database=reuire("./config/database");
const cookieParser=require("cookie-parse");
const cors=require("cors");
const{cloudinaryConnect}=require("./config/cloudinary");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");


dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

//cloudinary connection
cloudinaryConnect();


//connect to database
database.connectDB();

//
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
);

// ROUTES
app.use("/api/v1/User",UserRoutes);
app.use("/api/v1/Profile",ProfileRoutes);
app.use("/api/v1/Payment",PaymentRoutes);
app.use("/api/v1/Course",CourseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});