import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Master } from "./Database/index.js";
const yargs = _yargs(hideBin(process.argv));
yargs.version("1.1.0");
const log = console.log;
yargs.command({
  command: "1",
  describe: "1. Create Master Table",
  handler() {
    Master.sync({
      alter: true,
    })
      .then(() => log("Master table created."))
      .catch(log);
  },
});
yargs.parse();
