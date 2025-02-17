const express = require("express");
const customerRoutes = require("./src/routes/customerRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/customers", customerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
