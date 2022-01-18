var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const app = express();
app.get('/', (req, res) => {
    res.send("Hello World!");
});
app.use(require("morgan")("dev"));
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json({ extended: true }));
//initialize routs
app.use("/api/auth", require("./routes/auth.routes"));
const PORT = process.env.PORT || config.get("port");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(config.get("mongoUri"), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            app.listen(process.env.PORT || 5000, () => console.log(`App has been started on port ${PORT}...`));
        }
        catch (e) {
            console.log("Server Error", e.message);
            process.exit(1);
        }
    });
}
start();
//# sourceMappingURL=app.js.map