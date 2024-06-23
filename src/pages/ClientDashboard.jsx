
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import {jwtDecode} from "jwt-decode";


const ClientDashboard = () => {

    const isLoggedIn = !!localStorage.getItem('token');
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    let username = decodedToken.username;
    let redirectURL = `/cart/${username}`
    return (
        <div>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to="/auth/login">Login</Link>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <Link to="/auth/register">Register</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <Link to={redirectURL}>Cart</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <button onClick={() => {
                                localStorage.removeItem('token');
                            }}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
            <h1>Client Dashboard</h1>
            <ProductList />
        </div>
    );
};

export default ClientDashboard;
