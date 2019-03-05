// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
// import ContentPaste from '@material-ui/icons/ContentPaste';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import Pool from '@material-ui/icons/Pool';
// core components/views
import DashboardPage from 'views/Dashboard/Dashboard';
import TableList from 'views/TableList/TableList';
import Maps from 'views/Maps/Maps';
import Water from 'views/Water/Water';

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: '/water',
    sidebarName: 'Agua',
    navbarName: 'Agua',
    icon: Pool,
    component: Water,
  },
  {
    path: '/environment',
    sidebarName: 'Impacto Ambiental',
    navbarName: 'Impacto Ambiental',
    icon: 'content_paste',
    component: TableList,
  },
  {
    path: '/soil',
    sidebarName: 'Tierra y Suelo',
    navbarName: 'Tierra y Suelo',
    icon: BubbleChart,
    component: TableList,
  },
  {
    path: '/biodiversity',
    sidebarName: 'Biodiversidad',
    navbarName: 'Biodiversidad',
    icon: LocationOn,
    component: Maps,
  },
  {
    path: '/climate',
    sidebarName: 'Clima',
    navbarName: 'Clima',
    icon: Notifications,
    component: Maps,
  },
  {
    path: '/production',
    sidebarName: 'Producción y Consumo Sustentable',
    navbarName: 'Producción y Consumo Sustentable',
    icon: Unarchive,
    component: TableList,
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' }
];

export default dashboardRoutes;
