import { useEffect } from "react";


export default function Logout() {
    useEffect(() => {
        
    localStorage.removeItem("hash");
    localStorage.removeItem("username");
    window.location.href = "/login";;
    }, []);
}