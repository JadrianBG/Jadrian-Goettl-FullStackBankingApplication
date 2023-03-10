function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [user, setUser]     = React.useState('');
  const ctx                 = React.useContext(UserContext)  

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);  

  //function handle(){

    const user = ctx.users.find((user) => user.email == email);
    //console.log(user);
    //console.log(email, password);
    function handle(){
      console.log(email,password);
      const url = `/account/login/${email}/${password}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
        console.log("I'm here");
        if (user.password === password) {
          console.log('check')            
          props.setStatus('');
          props.setShow(false);
          return;      
        }
      })();
      props.setShow(false);
    }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}