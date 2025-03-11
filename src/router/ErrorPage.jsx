import { Link, useNavigate } from 'react-router';
import { useGlobalStore } from '../hooks/useGlobalStore';

function ErrorPage() {
  const { store } = useGlobalStore();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (store.user.isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1>Oh, Something happened!</h1>
      <p>Uh, I guess you don't have anything to show yet on Error Page?</p>
      <div className="text-center btn-group">
        <button
          className="text-decoration-none btn btn-primary btn-sm"
          onClick={handleHomeClick}
        >
          Home
        </button>
        <Link className="text-decoration-none btn btn-primary btn-sm" to="/about">
          About
        </Link>
        <Link className="text-decoration-none btn btn-primary btn-sm" to="/demo">
          Demo
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;