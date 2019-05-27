import React from 'react';
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
// import ContentPaste from '@material-ui/icons/ContentPaste';
import BubbleChart from '@material-ui/icons/BubbleChart';
import Cloud from '@material-ui/icons/Cloud';
import Terrain from '@material-ui/icons/Terrain';
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
import WaterUpdate from 'views/Water/WaterUpdate';
import WaterDetail from 'views/Water/WaterDetail';
import Guide from 'views/Guide/Guide';
import Environment from 'views/Environment/Environment';
import EnvironmentNew from 'views/Environment/EnvironmentNew';
import EnvironmentUpdate from 'views/Environment/EnvironmentUpdate';
import EnvironmentDetail from 'views/Environment/EnvironmentDetail';
import Biodiversity from 'views/Biodiversity/Biodiversity';
import BiodiversityNew from 'views/Biodiversity/BiodiversityNew';
import BiodiversityUpdate from 'views/Biodiversity/BiodiversityUpdate';
import BiodiversityDetail from 'views/Biodiversity/BiodiversityDetail';
import Soil from 'views/Soil/Soil';
import SoilNew from 'views/Soil/SoilNew';
import SoilUpdate from 'views/Soil/SoilUpdate';
import SoilDetail from 'views/Soil/SoilDetail';
import Production from 'views/Production/Production';
import ProductionNew from 'views/Production/ProductionNew';
import ProductionUpdate from 'views/Production/ProductionUpdate';
import ProductionDetail from 'views/Production/ProductionDetail';
import Climate from 'views/Climate/Climate';
import ClimateNew from 'views/Climate/ClimateNew';
import ClimateUpdate from 'views/Climate/ClimateUpdate';
import ClimateDetail from 'views/Climate/ClimateDetail';

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
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <WaterNew {...props} />,
  },
  {
    path: '/water/update',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <WaterUpdate {...props} />,
  },
  {
    path: '/water/:id',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <WaterDetail {...props} />,
  },
  {
    path: '/environment',
    sidebarName: 'Impacto Ambiental',
    navbarName: 'Impacto Ambiental',
    visible: true,
    icon: 'content_paste',
    component: Environment,
  },
  {
    path: '/environment/new',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <EnvironmentNew {...props} />,
  },
  {
    path: '/environment/update',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <EnvironmentUpdate {...props} />,
  },
  {
    path: '/environment/:id',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <EnvironmentDetail {...props} />,
  },
  {
    path: '/biodiversity',
    sidebarName: 'Biodiversidad',
    navbarName: 'Biodiversidad',
    visible: true,
    icon: LocationOn,
    component: Biodiversity,
  },
  {
    path: '/biodiversity/new',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <BiodiversityNew {...props} />,
  },
  {
    path: '/biodiversity/update',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <BiodiversityUpdate {...props} />,
  },
  {
    path: '/biodiversity/:id',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <BiodiversityDetail {...props} />,
  },
  {
    path: '/soil',
    sidebarName: 'Tierra y Suelo',
    navbarName: 'Tierra y Suelo',
    visible: true,
    icon: Terrain,
    component: Soil,
  },
  {
    path: '/soil/new',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <SoilNew {...props} />,
  },
  {
    path: '/soil/update',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <SoilUpdate {...props} />,
  },
  {
    path: '/soil/:id',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <SoilDetail {...props} />,
  },
  {
    path: '/production',
    sidebarName: 'Produccion y Consumo Sustentable',
    navbarName: 'Produccion y Consumo Sustentable',
    visible: true,
    icon: Unarchive,
    component: Production,
  },
  {
    path: '/production/new',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <ProductionNew {...props} />,
  },
  {
    path: '/production/update',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <ProductionUpdate {...props} />,
  },
  {
    path: '/production/:id',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <ProductionDetail {...props} />,
  },
  {
    path: '/climate',
    sidebarName: 'Clima',
    navbarName: 'Clima',
    visible: true,
    icon: Cloud,
    component: Climate,
  },
  {
    path: '/climate/new',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <ClimateNew {...props} />,
  },
  {
    path: '/climate/update',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <ClimateUpdate {...props} />,
  },
  {
    path: '/climate/:id',
    sidebarName: '',
    navbarName: '',
    icon: Pool,
    visible: false,
    component: props => <ClimateDetail {...props} />,
  },
  {
    path: '/guide',
    sidebarName: 'Guia de Usuario',
    navbarName: 'Guia de Usuario',
    visible: true,
    icon: Unarchive,
    component: Guide,
  },
  {
    redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect',
  },
];

export default dashboardRoutes;
