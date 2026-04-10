import React ,{useState}from 'react';
import axios from 'axios';
import { Card,CardContent,CardHeader,CardTitle} from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function handleLogin(e){
        e.prevetDefault();
        try{
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {email,password},
                {
                    withCredentials : true,
                }
            );
            alert("Login Success");
        }catch(err){
            console.log(err);
            alert("Login Failed");
        }
    };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle  className="text-center">Login</CardTitle>
            </CardHeader>

            <CardContent>
                <form action="" className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <Label>Email</Label>
                        <Input 
                        placeholder="Enter email" 
                        type="email"
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Password</Label>
                        <Input 
                        type="password" 
                        placeholder="Enter password"
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <Button className="w-full">Login</Button>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default Login