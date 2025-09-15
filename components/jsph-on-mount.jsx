import { useEffect, useState } from 'react';
import { UserCard } from './User-Card';
import { ShowError } from './ShowError';

export function LoadUserOnMount() {
  const
    [userId, setUserId] = useState(1),
    [user, setUser] = useState(null),
    [error, setError] = useState(null);

  async function loadUsers() {
    try {
      setUser(null);
      setError(null);
      const
        responce = await fetch('https://jsonplaceholder.typicode.com/users/' + userId + '?' + Math.random());
      if (!responce.ok)
        throw new Error(responce.status);
      setUser(await responce.json());
    } catch (error) {
      setError(error);

    }
  }
  useEffect(() => {
    loadUsers();
  }, [userId]);

  return <>
    <input type="number" value={userId} onInput={event => setUserId(event.target.value)} />
    {(!error && !user) && <Spinner />}
    {error && <ShowError error={error} />}
    {user && <UserCard user={user} />}
  </>
}


function Spinner() {
  return <div>loading...</div>
}