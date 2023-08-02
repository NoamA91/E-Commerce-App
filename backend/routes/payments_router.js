const router = require('express').Router();

router.post('/pay', (req, res) => {

    if (!req.body.credit_number) {
        return res.status(400).json({
            message: "Missing credit card number"
        });
    }

    const last_digits = req.body.credit_number.slice(-4);

    if (!last_digits || last_digits.length !== 4 || isNaN(last_digits)) {
        return res.status(400).json({
            message: "Invalid credit card digits"
        });
    }

    const terminal_number = Math.floor(Math.random() * 10000000);
    const transaction_number = terminal_number + Date.now();

    setTimeout(() => {
        res.status(200).json({
            message: "Payment processed successfully",
            terminal_number,
            transaction_number,
            last_digits
        });
    }, 2000);
});

module.exports = router;
