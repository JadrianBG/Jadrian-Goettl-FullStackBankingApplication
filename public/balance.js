function Balance(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [user, setUser]       = React.useState('');
  //const ctx = useUserContext();
  //const currentUser = useCurrentUser();
  
 
  function validate(field, label){
    if (!field) {
      setStatus('Error');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function handle() {
  if (!validate(email,    'email'))    return;
  const url = `/account/balance/${email}`;
  (async () => {
    var res = await fetch(url);
    var data = await res.json();
    console.log(data);
    setUser(data);
  })();
  setShow(false);
}

function clearForm(){
  setEmail('');
  setUser('');
  setShow(true);
}

  
return (
  <Card
    bgcolor="secondary"
    header="Balance"
    status={status}
    body={show ? (  
            <>
            Email address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" onClick={handle} disabled={!email}>Submit</button>
            </>
          ):(
            <>
            <h1>Balance</h1>
            Current Balance: $100<br/><br/>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Check another balance</button>
            </>
          )}
  />
  )
}