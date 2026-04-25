import API from "./axios";

export const forgotPassword = async (email) => {
    const res = await API.post("/auth/forgot-password", { email });
    return res.data;
};

export const verifyOtp = async (email, otp) => {
    const res = await API.post("/auth/verify-otp", { email, otp });
    return res.data;
};

export const resetPassword = async (email, otp, newPassword) => {
    const res = await API.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
    });
    console.log(res)
    return res.data;
};