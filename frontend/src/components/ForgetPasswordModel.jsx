import React, { useState, useEffect } from 'react';
import { forgotPassword, verifyOtp, resetPassword } from '@/api/auth';

function ForgetPasswordModel({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setEmail("");
            setOtp("");
            setNewPassword("");
        }
    }, [isOpen]);

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!email) {
            alert("Enter email");
            return;
        }

        try {
            const data = await forgotPassword(email);
            alert(data.message || "OTP Sent");
            setStep(2);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (!otp) {
            alert("Enter OTP");
            return;
        }

        try {
            const data = await verifyOtp(email, otp);
            alert(data.message || "OTP Verified");
            setStep(3);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            alert("Enter new password");
            return;
        }
        console.log("Resetting password with:", { email, otp, newPassword });
        try {
            const data = await resetPassword(email, otp, newPassword);
            alert(data.message || "Password reset successful");
            onClose();
        } catch (err) {
            console.log("Reset password error:", err);
            alert(err.response?.data?.message || err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded w-96 shadow-lg">

                <h2 className="text-xl font-bold mb-4 text-center">
                    {step === 1 && "Forgot Password"}
                    {step === 2 && "Verify OTP"}
                    {step === 3 && "Reset Password"}
                </h2>

                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <input
                            className='w-full border p-2 mb-4 rounded'
                            type="email"
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className='flex justify-end gap-2'>
                            <button type='button' onClick={onClose}>
                                Cancel
                            </button>
                            <button type='submit' className='bg-blue-600 text-white px-3 py-1 rounded'>
                                Send OTP
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <input
                            className='w-full border p-2 mb-4 rounded'
                            type="text"
                            placeholder='Enter OTP'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <div className='flex justify-between'>
                            <button type='button' onClick={() => setStep(1)}>
                                Change Email
                            </button>

                            <div className='flex gap-2'>
                                <button type='button' onClick={onClose}>
                                    Cancel
                                </button>
                                <button type='submit' className='bg-green-600 text-white px-3 py-1 rounded'>
                                    Verify OTP
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <input
                            className='w-full border p-2 mb-4 rounded'
                            type="password"
                            placeholder='Enter new password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <div className='flex justify-end gap-2'>
                            <button type='button' onClick={onClose}>
                                Cancel
                            </button>
                            <button className='bg-purple-600 text-white px-3 py-1 rounded'>
                                Reset Password
                            </button>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
}

export default ForgetPasswordModel;