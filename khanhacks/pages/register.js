
const React = require("react");
export default function Register() {
    const navigateToHome = () => {
        window.location.href = '/'; // Replace '/' with your home page URL
    };
    const [error, setError] = React.useState(null);
    return  ( 
        <>
        <style>{`
                .underline-button {
                    text-decoration: underline;
                }
                .input-username,
                .input-password {
                    background-color: #EDF2D4;
                    border: 0px solid #ccc;
                    border-radius: 13px;
                    outline: none;
                    filter: drop-shadow(0px 4px 6px rgba(237, 242, 212, 1)); 
                    font-weight: 700;
                    color: #36413E;
                }
                .login-button, .register-button {
                    font-weight: 700;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                }
                .page-title {
                    font-size: 2.5rem;
                    font-weight: bold;
                    text-align: center;
                    margin: 0 auto; /* Center the title horizontally */
                }
            `}</style>
 <div className="w-full h-full flex flex-col items-center">
                <div className="header w-full">
                    <button className="text-2xl underline-button ml-4" onClick={navigateToHome}>
                        <img src="/left-arrow.svg" alt="Back Arrow" className="w-6 h-6 mr-2 inline" />
                    </button>
                    <span className="absolute text-red-600 w-[100vw] text-center top-[15%] left-0 ">
                    {error}
                    </span>
                    <h1 className="page-title">Registration</h1>
                    <div className="w-6 h-6 mr-4"></div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-6 mt-12">
                    <div className="flex items-center input-password">
                        <img src="/user.svg" alt="Username Icon" className="w-6 h-6 ml-2" />
                        <input type="text" id="Username" placeholder="Username" className="w-[300px] h-[40px] text-lg p-2 input-password" />
                    </div>
                    <div className="flex items-center input-password">
                        <img src="/lock.svg" alt="Password Icon" className="w-6 h-6 ml-2" />
                        <input type="password" id="Password" placeholder="Password" className="w-[300px] h-[40px] text-lg p-2 input-password"/>
                    </div>
                    <div className="flex items-center input-password">
                        <img src="/lock.svg" alt="Password Icon" className="w-6 h-6 ml-2" />
                        <input type="password" id="Confirm Password" placeholder="Confirm Password" className="w-[300px] h-[40px] text-lg p-2 input-password"/>
                    </div>
                    <div className="flex space-x-6">
                        <button className="w-[120px] h-[40px] text-2xl underline-button login-button" onClick={() => {
                           if(document.getElementById("Password").value !== document.getElementById("Confirm Password").value){
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
                        <button className="w-[120px] h-[40px] text-2xl underline-button register-button" onClick={() => {
                            window.location.href = "/login";
                        }}>Login</button>
                    </div>
                </div>
            </div>
    {/* <div className="w-[100vw] h-[100vh] absolute left-0 top-0">
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
        </div> */}
        </>)
}

