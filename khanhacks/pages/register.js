
const React = require("react");
export default function Register() {
    const [error, setError] = React.useState(null);
    return  ( <div className="w-[100vw] h-[100vh] absolute left-0 top-0">
        {error && <p className=" text-red-500">{error}</p>}
        <input type="text" id = "Username" placeholder="Username" className="w-[200px] h-[30px]"/>
        <input type="password" id= "Password" placeholder="Password" className="w-[200px] h-[30px]"/>
        <input type="password" id= "confirm" placeholder="Confirm Password" className="w-[200px] h-[30px]"/>
        <button className="w-[100px] h-[30px]" onClick={() => {
            if(document.getElementById("Password").value !== document.getElementById("confirm").value){
                setError("Passwords do not match")
                return
            }
            fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({ username: document.getElementById("Username").value, password: document.getElementById("Password").value}),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if(res.success){
                        localStorage.setItem("username", res.username)
                        localStorage.setItem("hash", res.hash)
                        window.location.href = "/"
                    }
                    else{
                        setError(res.message)
                    }
                });
        }}>Register</button>
        <a href="/login">Login</a>
        </div>)
}