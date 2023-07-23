const { StatusCodes } = require('http-status-codes');
const {BookingService} = require('./../services/index');

const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.CREATED).json({
            message: "Successfuly completed booking",
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        return res.status(error.StatusCode).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        })
    }
}

module.exports = {
    create
}