import path from "path";
import dotenv from "dotenv";

const cwd = process.cwd();

dotenv.config({
  path: path.join(cwd, "environments", "base.env"),
  override: true,
});

dotenv.config({
  path: path.join(cwd, "environments", `${process.env.NODE_ENV}.env`),
  override: true,
});
