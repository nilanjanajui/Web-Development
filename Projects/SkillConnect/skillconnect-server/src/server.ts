import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
    console.log(`SkillConnect API running on port ${env.PORT} [${env.NODE_ENV}]`);
});