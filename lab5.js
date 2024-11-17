const express = require('express');
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();
program
  .requiredOption('-h, --host <host>', 'Server host address')
  .requiredOption('-p, --port <port>', 'Server port', parseInt)
  .requiredOption('-c, --cache <path>', 'Path to cache directory')
  .parse(process.argv);

const options = program.opts();

if (!fs.existsSync(options.cache)) {
  console.error('Error: Cache directory does not exist.');
  process.exit(1);
}


const app = express();
app.use(express.json()); 


app.listen(options.port, options.host, () => {
  console.log(`Server is running on http://${options.host}:${options.port}`);
});
