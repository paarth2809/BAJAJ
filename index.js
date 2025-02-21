const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors());

dotenv.config();

const app = express();
app.use(express.json());

const user_id = process.env.USER_ID;
const email = process.env.EMAIL;
const roll_number = process.env.ROLL_NUMBER;

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        let numbers = [];
        let alphabets = [];

        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
            }
        });

        let highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }))[0]] : [];

        return res.status(200).json({
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        return res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

app.get("/bfhl", (req, res) => {
    return res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
