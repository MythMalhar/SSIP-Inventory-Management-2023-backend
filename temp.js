import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Notification from './pages/Notification';
import Layout from './components/Layout/Layout';
import PlacedOrderList from './pages/PlacedOrderList';
import CartItems from './pages/CartItems';
import UserProfile from './pages/UserProfile';
import AuthContext from './store/auth-context';
import Inventory from './pages/Inventory';
import ROLES from './constants/ROLES';
import RegisterUser from './UserPanel/Admin/RegisterUser';
import AddProducts from './UserPanel/Admin/AddProducts';
import AddProductsEmp from './UserPanel/Employee/AddProductsEmp';
import ItemRequests from './UserPanel/StoreManager/ItemRequests';

import axios from './api/AxiosUrl';
import HeadRequestedOrders from './pages/HeadRequestedOrders/HeadRequestedOrders';
import StoreManagerRequestedOrders from './pages/StoreManagerRequestedOrders/StoreManagerRequestedOrders';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './UserPanel/Admin/AdminDashboard';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import SbsmEmpOrders from './UserPanel/StoreManager/SbsmEmpOrders';
import BudgetPlanning from './pages/BudgetPlanning/BudgetPlanning';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`api/user`)
        .then((response) => {
          const userDataFromAPI = response.data.user;
          setUserRole(userDataFromAPI.role);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
    setIsLoading(false);
  }, [isLoggedIn]);

  return (
    <Layout>
      <ToastContainer />
      <Routes>
        {!isLoggedIn && <Route path='/login' element={<Login />} />}
        {!isLoggedIn && <Route path='/' element={<Login />} />}
        {/* {!isLoggedIn && <Route path='/forgot-password' element={<ForgotPassword />} />} */}

        {/* admin */}
        {isLoggedIn && (userRole === ROLES.ADMIN || !isLoading) && (
          <Route path='/register-user' element={<RegisterUser />} />
        )}
        {isLoggedIn && (userRole === ROLES.ADMIN || !isLoading) && (
          <Route path='/add-products' element={<AddProducts />} />
        )}
        {isLoggedIn && (userRole === ROLES.EMPLOYEE || !isLoading) && (
          <Route path='/add-products-emp' element={<AddProductsEmp />} />
        )}
        {isLoggedIn && userRole === ROLES.ADMIN && (
          <Route path='/dashboard' element={<AdminDashboard />} />
        )}
        {isLoggedIn && userRole === ROLES.ADMIN && (
          <Route path='/' element={<AdminDashboard />} />
        )}
        {isLoggedIn && (userRole === ROLES.ADMIN || !isLoading) && (
          <Route path='/reset-password' element={<ResetPassword />} />
        )}

        {/* --- */}
        {isLoggedIn && <Route path='/user' element={<UserProfile />} />}

        {isLoggedIn && (
          <Route path='/budget-planning' element={<BudgetPlanning />} />
        )}

        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/dashboard' element={<Dashboard />} />
        )}
        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/' element={<Dashboard />} />
        )}

        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/products' element={<Products />} />
        )}
        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/cart' element={<CartItems />} />
        )}
        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/notification' element={<Notification />} />
        )}
        {isLoggedIn  && (
          <Route path='/item-requests' element={<ItemRequests />} />
        )}

        {isLoggedIn &&
          userRole !== ROLES.ADMIN &&
          (userRole === ROLES.SUB_BRANCH_STORE_MANAGER ||
            userRole === ROLES.BRANCH_STORE_MANAGER ||
            userRole === ROLES.DEPARTMENT_STORE_MANAGER ||
            !isLoading) && <Route path='/inventory' element={<Inventory />} />}

        {isLoggedIn &&
          (userRole === ROLES.SUB_BRANCH_STORE_MANAGER ||
            ROLES.SUB_BRANCH_HEAD ||
            !isLoading) && (
            <Route path='/emp-orders' element={<SbsmEmpOrders />} />
          )}
        {isLoggedIn &&
          (userRole === ROLES.SUB_BRANCH_STORE_MANAGER || !isLoading) && (
            <Route path='/sbsm-emp-orders' element={<SbsmEmpOrders />} />
          )}

        {/* {isLoggedIn && (userRole === ROLES.SUB_BRANCH_HEAD || !isLoading) && (
          <Route path='/head-emp-orders' element={<SbsmEmpOrders />} />
        )} */}

        {isLoggedIn &&
          userRole !== ROLES.ADMIN &&
          (userRole === ROLES.SUB_BRANCH_STORE_MANAGER ||
            userRole === ROLES.BRANCH_STORE_MANAGER ||
            userRole === ROLES.DEPARTMENT_STORE_MANAGER ||
            !isLoading) && (
            <Route
              path='/store-manager-requested-orders'
              element={<StoreManagerRequestedOrders />}
            />
          )}

        {isLoggedIn &&
          userRole !== ROLES.ADMIN &&
          (userRole === ROLES.SUB_BRANCH_HEAD ||
            userRole === ROLES.BRANCH_HEAD ||
            userRole === ROLES.DEPARTMENT_HEAD ||
            !isLoading) && (
            <Route
              path='/head-requested-orders'
              element={<HeadRequestedOrders />}
            />
          )}

        {isLoggedIn && userRole !== ROLES.ADMIN && (
          <Route path='/placed-orders' element={<PlacedOrderList />} />
        )}

        {!isLoading && <Route path='*' element={<NotFound />} />}
      </Routes>
    </Layout>
  );
}
export default App;







import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const EmployeeNavbar = () => {
  const location = useLocation();

  return (
    <>
      {/* part-2: main elements */}
      <div
        className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
        id='navbar-user'
      >
        <ul className='flex flex-col font-medium text-lg p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
          <li>
            <Link
              to='/products'
              className={`${
                location.pathname === '/products'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to='/placed-orders'
              className={`${
                location.pathname === '/placed-orders'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Placed orders
            </Link>
          </li>
          <li>
            <Link
              to='/dashboard'
              className={`${
                location.pathname === '/dashboard' || location.pathname === '/'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to='/add-products-emp'
              className={`${
                location.pathname === '/add-products-emp'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Add Products
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default EmployeeNavbar;






import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/AxiosUrl';

import { useLocation } from 'react-router-dom';
import ROLES from '../../constants/ROLES';

const StoreManagerNavbar = () => {
  const location = useLocation();
  const [currentUserRole, setCurrentUserRole] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('api/user');
        setCurrentUserRole(res.data.user.role);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <>
      {/* part-2: main elements */}
      <div
        className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
        id='navbar-user'
      >
        <ul className='flex flex-col font-medium text-lg p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
          <li>
            <Link
              to='/products'
              className={`${
                location.pathname === '/products'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to='/store-manager-requested-orders'
              className={`${
                location.pathname === '/store-manager-requested-orders'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Requested orders
            </Link>
          </li>
          <li>
            <Link
              to='/placed-orders'
              className={`${
                location.pathname === '/placed-orders'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Placed orders
            </Link>
          </li>
          <li>
            <Link
              to='/inventory'
              className={`${
                location.pathname === '/inventory'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Inventory
            </Link>
          </li>
          {currentUserRole && (
            <li>
              <Link
                to='/item-requests'
                className={`${
                  location.pathname === '/item-requests'
                    ? 'active-navbar-element'
                    : 'navbar-element'
                }`}
              >
                Item Requests
              </Link>
            </li>
          )}

          <li>
            <Link
              to='/sbsm-emp-orders'
              className={`${
                location.pathname === '/sbsm-emp-orders'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Emp-orders
            </Link>
          </li>
          <li>
            <Link
              to='/dashboard'
              className={`${
                location.pathname === '/dashboard' || location.pathname === '/'
                  ? 'active-navbar-element'
                  : 'navbar-element'
              }`}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default StoreManagerNavbar;







