import { useNavigate } from "react-router-dom";

const Logout =({setCurrUser})=>{
    const navigate = useNavigate();
    const logout=async (setCurrUser)=>{
        try {
            const response=await fetch("http://localhost:3001/logout",{
                method: "delete",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
            })
            const data=await response.json()
            if(!response.ok) throw data.error
            localStorage.removeItem("token")
            setCurrUser(null)
        } catch (error) {
            console.log("error", error)
        }
    }
    const handleClick=e=>{
        e.preventDefault()
        logout(setCurrUser)
        navigate('/');
    }
    return (
        <div>
            <input type="button" value='Logout' className="buttonForm" onClick={handleClick}/>
        </div>
    )
}
export default Logout