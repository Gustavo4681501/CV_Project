
import Signup from "../CompanySignup/CompanySignup";
import Login from '../CompanyLogin/CompanyLogin'
import Logout from '../CompanyLogout/CompanyLogout'
import { useState } from "react";
import PrivateText from "../PrivateText/PrivateText";

const Company = ({currCompany, setCurrCompany}) => {
    const [show, setShow]=useState(true)
    if(currCompany) 
        return (
            <div>
            Hello {currCompany.email}
            <PrivateText currCompany={currCompany}/>
            <Logout setCurrCompany={setCurrCompany}/>
            </div>
        )
    return (
        <div>
            { show?
                <Login setCurrCompany={setCurrCompany} setShow={setShow}/>  
                :
                <Signup setCurrCompany={setCurrCompany}  setShow={setShow} />
            }
        </div>
    )
}
export default Company