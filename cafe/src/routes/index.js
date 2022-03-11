import React, { useLayoutEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SamplePage from './Pages/SamplePage';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import Tables from './Pages/Tables/Tables';
import CafesService from 'services/api/cafesService';
import { userLogin } from 'redux/actions/AuthNew';
import Categories from './Pages/Categories/Categories';
import Products from './Pages/Products/Products';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Orders from './Pages/Orders/Orders';
import TablesBill from './Pages/TablesBill/TablesBill';
// import Register from './Auth/Register';
// import ForgotPasswordPage from './Auth/ForgotPassword';

// const RestrictedRoute = ({ component: Component, ...rest }) => {
//   const { authUser } = useSelector(({ auth }) => auth);
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         authUser ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/signin',
//               state: { from: props.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

const Routes = () => {
  // const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();
  // const { authItem } = useSelector(({ authNew }) => authNew);

  // if (!authItem[0].loggedIn) {
  //   return <Redirect to={'/signin'} />;
  // } else if (location.pathname === '' || location.pathname === '/') {
  //   return <Redirect to={'/sample-page'} />;
  // } else if (authItem[0].loggedIn && location.pathname === '/signin') {
  //   return <Redirect to={'/sample-page'} />;
  // };
  const history = useHistory();

  let [first, setFirst] = useState(true);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const cafesService = new CafesService();
    const handleOpen = () => {
      if (localStorage.getItem('token')) {
        cafesService
          .getCafeDetailsByToken({ token: localStorage.getItem('token') })
          .then(res => {
            dispatch(
              userLogin({
                email: res.data.data.email,
                id: res.data.data.cafeId,
                lastDate: res.data.data.lastDate,
                name: res.data.data.name,
                pass: res.data.data.pass,
                tableAmount: res.data.data.tableAmount,
                token: localStorage.getItem('token'),
              }),
            );
          })
          .catch(result => {
            localStorage.removeItem('token');
            history.push('/signin');
          });
      }
    };
    if (first) {
      handleOpen();
      setFirst(false);
    }
  }, [first, dispatch, history]);

  if (!localStorage.getItem('token') && location.pathname !== '/signin') {
    history.push('/signin');
  } else if (localStorage.getItem('token') && location.pathname === '/signin') {
    return <Redirect to={'/sample-page'} />;
  }

  // if (localStorage.getItem('token')) {
  //   if (!authItem[0].loggedIn) {
  //     cafesService.getCafeDetailsByToken({ token: localStorage.getItem('token') }).then(res => {
  //       dispatch(
  //         userLogin({
  //           email: res.data.data.email,
  //           id: res.data.data.cafeId,
  //           lastDate: res.data.data.lastDate,
  //           name: res.data.data.name,
  //           pass: res.data.data.pass,
  //           tableAmount: res.data.data.tableAmount,
  //           token: localStorage.getItem('token'),
  //         }),
  //       );
  //     });
  //     history.push('/sample-page');
  //   }
  // }

  return (
    <React.Fragment>
      <NotificationContainer />
      <Switch>
        <Route path="/sample-page" component={SamplePage} />
        <Route path="/signin" component={Login} />
        <Route path="/tables" component={Tables} />
        <Route path="/categories" component={Categories} />
        <Route path="/products" component={Products} />
        <Route path="/orders" component={Orders} />
        <Route path="/table-bill" component={TablesBill} />
        {/* <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} /> */}
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
