import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/register", {
                name,
                email,
                password,
            });
            console.log(res.data);
            alert("Register success");
            navigate("/");
        } catch (error) {
            console.log(error);
            alert("Register Failed");
        }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-center">Register</CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div>
                            <Label>Name</Label>
                            <Input
                                palceholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input
                                palceholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                palceholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className="text-sm text-center">
                            Already have an account?{" "}
                            <span className="text-blue-500 cursor-pointer"
                                onClick={() => navigate("/")}
                            >
                                Login
                            </span>
                        </p>
                        <Button className="w-full">Register</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register