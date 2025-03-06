const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

let saldoUtilizador = 100; 

app.post("/pay", async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency,
            payment_method_types: ["card"],
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/update-balance", (req, res) => {
    const { amount } = req.body;
    saldoUtilizador += amount;
    res.json({ saldo: saldoUtilizador });
});

app.get("/saldo", (req, res) => {
    res.json({ saldo: saldoUtilizador });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
