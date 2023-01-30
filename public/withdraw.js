function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [amount, setAmount]     = React.useState('');
  const [errors, setError]      = React.useState('');
  const [user, setUser]         = React.useState('');

  function validate(field, label){
      setError('');
      const url = `/account/balance/${email}/`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        if(data.name === 'Error'){
          alert(user.balance);
          return false;
        }
        setUser(data);
        console.log(data);
      })();
      if (!field) {
        setStatus('Error');
        setTimeout(() => setStatus(''),2000);
        return false;
      }
      console.log(field);
      if (label === 'amount'){
      if (Number.isNaN(Number(field))) {
        setStatus('Error');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      else if (parseInt(user.balance) < field) {
        setStatus('Error');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
    }
      return true;
  }

  function handle(){
    if (!validate(amount, 'amount'))    return;
    const url = `/account/withdraw/${email}/${amount}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      if (!data.value){
        setStatus('ERROR');
        setTimeout(() => setStatus(''),3000);
        setShow(true);
        return;
      }
    })();
    setTimeout(() => setStatus(''),3000);
    setShow(false);
  }    

  function clearForm(){
    setAmount('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="Withdraw"
      status={status}
      body={show ? (  
              <>
              Email:<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Amount:<br/>
              <input type="text" className="form-control" id="amount" placeholder="Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/>
              <div style={{color:'red'}}>{errors}</div><br/>
              <button type="submit" className="btn btn-light" onClick={handle} disabled={!amount}>Withdraw</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make another withdrawal</button>
              </>
            )}
    />
  )
}