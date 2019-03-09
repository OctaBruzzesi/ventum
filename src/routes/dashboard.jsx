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
import WaterNew from 'views/Water/WaterNew';

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    visible: true,
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: '/water',
    sidebarName: 'Agua',
    navbarName: 'Agua',
    visible: true,
    icon: Pool,
    component: Water,
  },
  {
    path: '/water/new',
    visible: false,
    component: WaterNew,
  },
  {
    path: '/environment',
    sidebarName: 'Impacto Ambiental',
    navbarName: 'Impacto Ambiental',
    visible: true,
    icon: 'content_paste',
    component: TableList,
  },
  {
    path: '/soil',
    sidebarName: 'Tierra y Suelo',
    navbarName: 'Tierra y Suelo',
    visible: true,
    icon: BubbleChart,
    component: TableList,
  },
  {
    path: '/biodiversity',
    sidebarName: 'Biodiversidad',
    navbarName: 'Biodiversidad',
    visible: true,
    icon: LocationOn,
    component: Maps,
  },
  {
    path: '/climate',
    sidebarName: 'Clima',
    navbarName: 'Clima',
    visible: true,
    icon: Notifications,
    component: Maps,
  },
  {
    path: '/production',
    sidebarName: 'Producción y Consumo Sustentable',
    navbarName: 'Producción y Consumo Sustentable',
    visible: true,
    icon: Unarchive,
    component: TableList,
  },
  {
 redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' 
},
];

export default dashboardRoutes;
