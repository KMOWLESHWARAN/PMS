import React, { useState } from 'react';
import axios from 'axios';
import API from '../../api/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await API.post(
                "/auth/login", { email, password },
                {
                    withCredentials: true,
                }
            );
            console.log("Response:", res.data);
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                alert("Login Success");
                navigate("/dashboard");
            } else {
                alert("No token received from server");
            }
        } catch (err) {
            console.error("Login error:", err);
            console.error("Error response:", err.response?.data);
            console.error("Error status:", err.response?.status);
            alert(`Login Failed: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action="" className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <Label>Email</Label>
                            <Input
                                placeholder="Enter email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className='text-sm text-center'>Don't have an account?{" "}<span className='text-blue-500 cursor-pointer' onClick={() => navigate("/register")}>Register</span></p>
                        <Button className="w-full">Login</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login