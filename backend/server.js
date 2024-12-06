const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/dbConnect");
const adminAuthRoutes = require("./routes/auth/adminAuthRoutes");
const employeeAuthRoutes = require("./routes/auth/employeeAuthRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// >>=======Routes for auth ===========>>
app.use("/api/auth/admin", adminAuthRoutes);  //done
app.use("/api/auth/employee", employeeAuthRoutes); //done

// >>=======Routes for admin and employee ===========>>
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/employee", employeeRoutes);

app.get("/", (req, res) => {
  res.status(200).json("Server is Running....Home Route");
});


// >>=======Start the server ===========>>
app.listen(process.env.PORT, () =>
  console.log(`Server running on port http://localhost:${process.env.PORT}`)
);
