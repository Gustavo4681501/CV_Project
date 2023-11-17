
import Signup from "../Signup/Signup";
import Login from '../Login/Login'
import Logout from '../Logout/Logout'
import { useState } from "react";
import PrivateText from "../PrivateText/PrivateText";


const User = ({currUser, setCurrUser}) => {
    const [show, setShow]=useState(true)
    if(currUser) 
    
        return (
            <div>

            Hello {currUser.email}
            <PrivateText currUser={currUser}/>
            <Logout setCurrUser={setCurrUser}/>
            </div>
        )
    return (
        <div>
            { show?
                <Login setCurrUser={setCurrUser} setShow={setShow}/>  
                :
                <Signup setCurrUser={setCurrUser}  setShow={setShow} />
            }
        </div>
    )
}
export default User