const { verifyToken } = require("./jwt");
const config = require("config");

const tokenGenerator = config.get("TOKEN_GENERATOR");
const Auth = (req, res, next) => {
    if (tokenGenerator === "jwt") {
        try {
            const token = req.header("x-auth-token");
            if (!token) {
                throw new Error("Authentication Error: Please Login");
            }
            const userData = verifyToken(token);
            if (!userData) {
                throw new Error("Authenticatin Error: Unauthorized User!");
            }
            req.user = userData;
            return next();
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
};

module.exports = Auth;
