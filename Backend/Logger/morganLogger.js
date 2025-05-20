const morgan = require("morgan");
const timeResult = require("./timeHelper");

const morganLogger = morgan(function (tokens, req, res) {
    const { year, month, day, hr, min, sec } = timeResult();
    let message = [`[${day}/${month}/${year} ${hr}:${min}:${sec}]`, tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), "-", tokens["response-time"](req, res), "ms"].join(" ");

    return message;
});

module.exports = morganLogger;
