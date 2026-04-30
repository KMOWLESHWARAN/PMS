import React, { useState } from 'react';
import API from '../../api/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import ForgetPasswordModel from '@/components/ForgetPasswordModel';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openForget, setOpenForgot] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Enter email and password");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post(
                "/auth/login",
                { email, password },
                { withCredentials: true }
            );

            if (res.data?.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user info including role
                setEmail("");
                setPassword("");

                alert("Login Success");

                navigate("/dashboard");
            } else {
                alert("Invalid response from server");
            }

        } catch (err) {
            console.error("Login error:", err);

            const message =
                err.response?.data?.message ||
                err.message ||
                "Login failed";

            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <Card className="w-[350px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Login</CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </div>

                        <p
                            className="text-sm text-blue-600 cursor-pointer"
                            onClick={() => setOpenForgot(true)}
                        >
                            Forgot Password?
                        </p>

                        <p className='text-sm text-center'>
                            Don't have an account?{" "}
                            <span
                                className='text-blue-500 cursor-pointer'
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </span>
                        </p>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    <ForgetPasswordModel
                        isOpen={openForget}
                        onClose={() => setOpenForgot(false)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
export default Login;