const fs = require("fs/promises");
// const fs = require("fs").promises;
const filepath = "./files/file3.txt";

const fileOperation = async({action, data}) => {
    switch(action){
        case "read":
            const text = await fs.readFile(filepath, "utf-8");
            console.log(text);
            // const result = await fs.readFile(filepath);
            // const text = result.toString();
            // console.log(text);
            break;
        case "add":
            await fs.appendFile(filepath, data);
            break;
        case "replace":
            await fs.writeFile(filepath, data);
            break;
        default:
            console.log("Unknown action");
    }
}

// fileOperation({action: "read"});
// fileOperation({action: "add", data: "\nНе плюйся - никто не носит золота во рту"});
// fileOperation({action: "replace", data: "Записная книжка дьявола"});

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// fs.readFile("./files/file.txt", (error, data) => {
//     console.log(error);
//     console.log(data);
// });