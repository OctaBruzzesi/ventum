import Login from '../views/Auth/Login';
import SignUp from '../views/Auth/SignUp';

const authRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signUp',
    component: SignUp,
  },
];

export default authRoutes;
