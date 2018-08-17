import Login from '../containers/Login/Login';
import Dashboard from 'layouts/Dashboard/Dashboard';

const isLogedIn = localStorage.getItem("login");
console.log('isLoged', isLogedIn);

const indexRoutes = [
  isLogedIn ?
    { path: '/', component: Dashboard }
    :
    { path: '/', component: Login }
];

console.log(indexRoutes);

export default indexRoutes;
