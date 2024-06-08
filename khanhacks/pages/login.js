export default function login() {
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
                }
                .login-button, .register-button {
                    font-weight: 700;
                }
            `}</style>
            <div className="w-[100vw] h-[100vh] absolute left-0 top-0 flex flex-col items-center">
                <h1 className="text-5xl font-bold mt-8 mb-[2lh]">Login Page</h1>
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="flex items-center">
                        <img src="/user.svg" alt="Username Icon" className="w-6 h-6 mr-2" />
                        <input type="text" id="Username" placeholder="Username" className="w-[300px] h-[40px] text-lg p-2 input-username" />
                    </div>
                    <div className="flex items-center">
                        <img src="/lock.svg" alt="Password Icon" className="w-6 h-6 mr-2" />
                        <input type="password" id="Password" placeholder="Password" className="w-[300px] h-[40px] text-lg p-2 input-password" />
                    </div>
                    <div className="flex space-x-6">
                        <button className="w-[120px] h-[40px] text-2xl underline-button login-button" onClick={() => {
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
                                    // Handle response
                                });
                        }}>Login</button>
                        <button className="w-[120px] h-[40px] text-2xl underline-button register-button" onClick={() => {
                            window.location.href = "/register";
                        }}>Register</button>
                    </div>
                </div>
            </div>
        </>
    );
}
