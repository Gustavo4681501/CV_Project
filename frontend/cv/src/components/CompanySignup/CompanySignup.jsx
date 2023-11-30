import Form from "react-bootstrap/Form";
import { useRef } from "react"
const CompanySignup = ({ setCurrCompany, setShow }) => {
    const formRef = useRef()
    const CompanySignup = async (ComapanyInfo, setCurrCompany) => {
        const url = "http://localhost:3001/companies/signup"
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    "content-type": 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(ComapanyInfo)
            })
            const data = await response.json()
            if (!response.ok) throw data.error
            localStorage.setItem('token', response.headers.get("Authorization"))
            setCurrCompany(data)
        } catch (error) {
            console.log("error", error)
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)
        const ComapanyInfo = {
            "company": { email: data.email, password: data.password }
        }
        CompanySignup(ComapanyInfo, setCurrCompany)
        e.target.reset()
    }
    const handleClick = e => {
        e.preventDefault()
        setShow(true)
    }
    return (
        <div className="d-flex justify-content-center">
            <Form ref={formRef} onSubmit={handleSubmit} className="formContainer">
                <center>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        fill="currentColor"
                        className="bi bi-buildings-fill"
                        viewBox="0 0 16 16">
                        <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V.5ZM2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-1 2v1H2v-1h1Zm1 0h1v1H4v-1Zm9-10v1h-1V3h1ZM8 5h1v1H8V5Zm1 2v1H8V7h1ZM8 9h1v1H8V9Zm2 0h1v1h-1V9Zm-1 2v1H8v-1h1Zm1 0h1v1h-1v-1Zm3-2v1h-1V9h1Zm-1 2h1v1h-1v-1Zm-2-4h1v1h-1V7Zm3 0v1h-1V7h1Zm-2-2v1h-1V5h1Zm1 0h1v1h-1V5Z" />
                    </svg>
                </center>
                <Form.Label className="title">Email:</Form.Label>
                <Form.Control type="email" name='email' placeholder="email" />
                <br />
                <Form.Label className="title">Password:</Form.Label>
                <Form.Control type="password" name='password' placeholder="password" />
                <br />
                <input type='submit' value="Submit" className="buttonForm" />
                <div>Already registered, <a href="#login" onClick={handleClick} >Login</a> here.</div>
            </Form>
            <br />
        </div>
    )
}
export default CompanySignup