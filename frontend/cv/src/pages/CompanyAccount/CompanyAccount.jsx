import React from 'react'
import { useState } from 'react';
import Company from "../../components/AccountTypes/Company"

function CompanyAccount() {
  const [currCompany, setCurrCompany]=useState(null);
  return (
    <Company currCompany={currCompany} setCurrCompany={setCurrCompany} />
  )
}

export default CompanyAccount