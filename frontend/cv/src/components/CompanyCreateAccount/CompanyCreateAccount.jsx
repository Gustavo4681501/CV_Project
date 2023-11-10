import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link } from "react-router-dom";

const CompanyCreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeName = (e) => {
    const value = e.target.value;
    console.log(value);
    setName(value);
  };

  const changeEmail = (e) => {
    const value = e.target.value;
    console.log(value);
    setEmail(value);
  };

  const changePassword = (e) => {
    const value = e.target.value;
    console.log(value);
    setPassword(value);
  };

  const OnclickButton = () => {
    console.log("Name:", name);
    console.log("Name:", email);
    console.log("Name:", password);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={changeName}
          type="Text"
          placeholder="Enter name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={email}
          onChange={changeEmail}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={changePassword}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Link to="/home">
        <Button onClick={OnclickButton} variant="primary" type="submit">
          Submit
        </Button>
      </Link>
    </Form>
  );
};

export default CompanyCreateAccount;
