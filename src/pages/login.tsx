import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch('/users.json');

    const users = await response.json();

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    setError('Invalid Credentials');
  }
};


  return (
    <div className="login">
      <div className="login__left">
        <img src="/assets/logo.png" alt="Lendsqr Logo" className="login__logo" />
        <img src="/assets/illustration.png" alt="Illustration" className="login__illustration" />
      </div>

      <div className="login__right">
        <div className="login__form-container">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <form className="login__form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="login__password">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'HIDE' : 'SHOW'}
              </span>
            </div>
            <a href="#" className="login__forgot">FORGOT PASSWORD?</a>
            <button type="submit">LOG IN</button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 