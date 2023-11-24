
import UserComponent from '../../components/AccountTypes/UserComponent';
import { useUser } from '../../components/AccountTypes/UserContext';
function UserAccount() {
    const { currUser, setCurrUser } = useUser();
  return (
    <UserComponent currUser={currUser} setCurrUser={setCurrUser} />
  )
}

export default UserAccount