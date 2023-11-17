import React, { useState } from 'react'
import User from '../../components/AccountTypes/User'
import { useUser } from '../../components/AccountTypes/UserContext';
function UserAccount() {

    const { currUser, setCurrUser } = useUser();
  return (
    <User currUser={currUser} setCurrUser={setCurrUser} />
  )
}

export default UserAccount