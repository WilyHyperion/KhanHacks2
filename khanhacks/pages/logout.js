

export default function Logout() {
    localStorage.removeItem("hash");
    localStorage.removeItem("username");
    window.location.href = "/login";
}