import { useState } from 'react'
import './LoginForm.css'

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  function btnShowPassword() {
    // setShowPassword(!showPassword);
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }
  return (
    <>
      <div>
        <input className="inputEmail" type="email" placeholder="Email" />
      </div>
      <div>
        <input className="inputPassword" type={showPassword ? 'text' : 'password'} placeholder="Password" />
        <button onClick={btnShowPassword}>{showPassword ? 'Hide' : 'Show'}</button>
      </div>
      <div>
        <button className="btn-submit">Login</button>
        <button className="btn-submit">Sign Up</button>
      </div>
    </>
  )
}

export default LoginForm