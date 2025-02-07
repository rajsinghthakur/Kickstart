const generateOTP = () => {
    const otpLength = 4; // Length of the OTP
    const digits = '0123456789'; // Possible digits in the OTP
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
        otp += digits[Math.floor(Math.random() * 10)]; // Randomly select a digit
    }
    return otp;
};

export default generateOTP;