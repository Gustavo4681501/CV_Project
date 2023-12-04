import React from 'react'
import { useState } from 'react';
import CompanyComponent from '../../components/AccountTypes/CompanyComponent';
import { useCompany } from '../../components/AccountTypes/CompanyContext';


function Company() {
  const { currCompany, setCurrCompany } = useCompany();
  return (
    <CompanyComponent currCompany={currCompany} setCurrCompany={setCurrCompany} />
  )
}


export default Company