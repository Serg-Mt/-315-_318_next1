import { useState } from 'react'
import { UserCard } from './User-Card';
import { ShowError } from './ShowError';


export function LoadUsersByClick() {
  const
    [users, setUsers] = useState(null),
    [error, setError] = useState(null);
  async function loadUsers() {
    try {
      const
        responce = await fetch('https://jsonplaceholder.typicode.com/users/');
      if (!responce.ok)
        throw new Error(responce.status);
      setUsers(await responce.json());
    } catch (error) {
      setError(error);
    }
  }

  return <>
    <button onClick={loadUsers}>load</button>
    {error && <ShowError error={error} />}
    {users && users.map(user => <UserCard user={user} />)}
  </>
}

