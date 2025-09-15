export function ShowError({ error }) {
  return <div className='error'>
    Error : {error.toString()}
  </div>;
}
