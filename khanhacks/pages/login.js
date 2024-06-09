


export default function Login() {
    const navigateToHome = () => {
        window.location.href = '/'; // Replace '/' with your home page URL
    };

    return (
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
                    margin-left: 10px;
                }
                .input-username::placeholder,.input-password::placeholder {
                    color: #36413E;
                    opacity: 0.55;
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
                @keyframes bobAnimation {
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
            <div className="w-full h-full flex flex-col items-center">
                <div className="header w-full">
                    <button className="text-2xl underline-button ml-4" onClick={navigateToHome}>
                        <img src="/left-arrow.svg" alt="Back Arrow" className="w-6 h-6 mr-2 inline" />
                    </button>
                    <h1 className="page-title">Login Page</h1>
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
                    <div className="flex space-x-6">
                        <button className="w-[120px] h-[40px] text-2xl underline-button login-button" onClick={() => {
                            // Apply the bobanimation to register button
                            document.querySelector(".register-button").style.animation = "bobAnimation 0.5s ease-in-out infinite alternate";
                            fetch("/api/login", {
                                method: "POST",
                                body: JSON.stringify({
                                    username: document.getElementById("Username").value,
                                    password: document.getElementById("Password").value
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                                .then((res) => res.json())
                                .then((res) => {
                                    document.querySelector(".register-button").style.animation = "none"; // Stop the bob animation
                                    if(res.success){
                                        localStorage.setItem("hash", res.hash);
                                        localStorage.setItem("username", document.getElementById("Username").value);
                                        window.location.href = "/";
                                    }
                                    else {
                                    }
                                });
                        }}>Login</button>
                        <button className="w-[120px] h-[40px] text-2xl underline-button register-button" onClick={() => {
                            window.location.href = '/register'; // Replace with your register page URL
                        }}>Register</button>
                    </div>
                </div>
            </div>
        </>
    );
}
