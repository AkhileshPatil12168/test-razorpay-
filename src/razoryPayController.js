const instance = require("./razorpayConfigfile");
const crypto = require("crypto");
const getKey = async (req, res) => {
    try {
        return res.status(200).send({ key: process.env.RAZORPAY_API_KEY });
    } catch (error) {
        res.status(500).send({ error });
    }
};

const getOrder = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
            receipt: "order_rcptid_11",
        };
        const order = await instance.orders.create(options);

        return res.status(200).send({ order: order });
    } catch (error) {
        return res.status(500).send({ error });
    }
};

const paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex")

            // console.log("reci "+ razorpay_signature)
            // console.log("gen "+generated_signature)

        if (generated_signature == razorpay_signature) {
            return res.status(200).send({ success: true });
        }
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

module.exports = { getKey, getOrder, paymentVerification };
