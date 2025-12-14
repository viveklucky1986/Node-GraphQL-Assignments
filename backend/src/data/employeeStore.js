const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "employees.js");

function load() {
    delete require.cache[require.resolve("./employees")];
    return require("./employees");
}

function save(data) {
    const content =
        `module.exports = ${JSON.stringify(data, null, 2)};
`;
    fs.writeFileSync(DATA_FILE, content, "utf8");
}

module.exports = { load, save };
