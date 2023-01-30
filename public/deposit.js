function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [amount, setAmount]     = React.useState('');
  const [user, setUser]         = React.useState('')

  
  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (label === 'amount'){
        if (Number.isNaN(Number(field))) {
          setStatus('Error');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        else if ((Number(field)) < 1){
          setStatus('Error');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
      }

      return true;
  }

  function handle(){
    console.log(amount);
    if (!validate(amount,    'amount'))    return;
    if (!validate(email,    'email'))    return;

    const url = `/account/update/${email}/${amount}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      if (!data.value){
        setStatus('Error');
        setTimeout(() => setStatus(''),3000);
        setShow(true);
        return;
      } else {
        setStatus('Success');
        setTimeout(() => setStatus(''),3000);
      }
    })();

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
      header="Deposit"
      status={status}
      body={show ? (  
              <>
              Email:<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Amount:<br/>
              <input type="" className="form-control" id="amount" placeholder="Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/>
              <br/>
              <button type="submit" className="btn btn-light" onClick={handle} disabled={!amount}>Deposit</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit</button>
              </>
            )}
    />
  )
}
