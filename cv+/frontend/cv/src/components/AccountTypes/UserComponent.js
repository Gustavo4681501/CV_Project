


import Signup from "../Signup/Signup";
import Login from '../Login/Login'
import { useState } from "react";
import { useNavigate} from "react-router-dom";



const UserComponent = ({currUser, setCurrUser}) => {
    const navigate = useNavigate();
    const [show, setShow]=useState(true)
    if(currUser) 
        return (
            <div>
            Hello desde User {currUser.email}
            {navigate(`Profile/${currUser.id}`)}
            </div>
        )
    return (
        <div>
            { show?<>
                <Login setCurrUser={setCurrUser} setShow={setShow}/>  
            </>
                :
                <Signup setCurrUser={setCurrUser}  setShow={setShow} />
            }
        </div>
    )
}
export default UserComponent