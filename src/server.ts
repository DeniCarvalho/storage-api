import { app } from "./app";
const port: number = parseInt(process.env.PORT || process.env.API_PORT);
app.listen(port);
