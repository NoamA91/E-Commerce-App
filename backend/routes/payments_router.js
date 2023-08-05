const router = require('express').Router();

const colors = require("colors");

colors.setTheme({
    new_request: "magenta",
    success_request: "green",
    failed_request: "red",
    step_done: "blue",
});

router.post('/pay', (req, res) => {
    console.log("API POST : Payment request".new_request);

    if (!req.body.credit_number) {
        console.log('Missing credit card number'.failed_request);
        return res.status(400).json({
            message: "Missing credit card number"
        });
    }

    const last_digits = req.body.credit_number.slice(-4);

    if (!last_digits || last_digits.length !== 4 || isNaN(last_digits)) {
        console.log('Invalid credit card digits'.failed_request);
        return res.status(400).json({
            message: "Invalid credit card digits"
        });
    }

    const terminal_number = Math.floor(Math.random() * 10000000);
    const transaction_number = terminal_number + Date.now();

    setTimeout(() => {
        console.log('Successfully processed payment'.success_request);
        res.status(200).json({
            message: "Payment processed successfully",
            terminal_number,
            transaction_number,
            last_digits
        });
    }, 2000);
});

module.exports = router;
