
"use client"
import React,{useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
const ProfilePage = () => {
    const router = useRouter();
    const [data,setData] = useState("nothing");
    const getUserDetails = async()=>{
        try{
            const res = await axios.post("/api/users/me");
            console.log(res.data.data);
            setData(res.data.data.email);
        }catch(error:any){
            console.log(error.message);
            toast.error(error.message);
        }

        
    }
    const logout = async()=>{
        try{
            const res = await axios.get('/api/users/logout');
            toast.success("logout Success");
            router.push("/login");


        }catch(error:any){
            toast.error("Logout failed");
        }

    }
  return (
     <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile Page</h1>
        <hr/>
        <h2>{data === "nothing" ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'onClick={logout}>Logout </button>
        <button className='bg-yellow-500 mt-4 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded'onClick={getUserDetails}>Get Details</button>
     </div>
  )
}

export default ProfilePage