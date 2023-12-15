import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyLogin from "../CompanyLogin/CompanyLogin";
import CompanySignup from "../CompanySignup/CompanySignup";
import CompanyLogout from '../CompanyLogout/CompanyLogout';

const CompanyComponent = ({currCompany, setCurrCompany}) => {
    const navigate = useNavigate();
    const [show, setShow]=useState(true)
    if(currCompany) 
        return (
            <div>
            Hello {currCompany.email}
            {navigate(`Profile/${currCompany.id}`)}
            <CompanyLogout setCurrCompany={setCurrCompany}/>
            </div>
        )
    return (
        <div>
            { show?
                <CompanyLogin setCurrCompany={setCurrCompany} setShow={setShow}/>  
                :
                <CompanySignup setCurrCompany={setCurrCompany}  setShow={setShow} />
            }
        </div>
    )
}
export default CompanyComponent