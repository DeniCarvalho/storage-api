import { app } from "./app";
const port: number = parseInt(process.env.API_PORT || process.env.PORT);
app.listen(port);
