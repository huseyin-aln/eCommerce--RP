import styles from "./Auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { useState } from "react";
import { signIn, signUpProvider } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signIn(email, password, navigate);
    // setIsLoading(false);
  };

  const handleProviderLogin = () => {
    signUpProvider(navigate);
  };

  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400px" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">
                  <span className={styles.registerLink}>Forgot Password?</span>{" "}
                </Link>
              </div>
              <p>-- or --</p>
            </form>

            <button
              className="--btn --btn-danger --btn-block"
              onClick={handleProviderLogin}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>

              <Link to="/register">
                <span className={styles.registerLink}>Register</span>
              </Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
