const express = require("express");
const path = require("path");
const mainRoutes = require("./routes/main-routes");

const app = express();
const port = process.env.PORT || 3_000;
const dotenv = require("dotenv");

dotenv.config();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`http://localhost:${port}`));

app.use("/web", express.static(path.join(__dirname, "/web")));

app.use("/", mainRoutes);

app.use((error, request, response, next) => {
    response.status(500);
    response.render("error", { error });
});
