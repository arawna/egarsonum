import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { AuhMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import AuthWrapper from './AuthWrapper';
import CafesService from 'services/api/cafesService';
import { userLogin } from 'redux/actions/AuthNew';
import { useHistory } from 'react-router';
import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
}));
//variant = 'default', 'standard'
const SignIn = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const cafesService = new CafesService();
  const history = useHistory();

  const onSubmit = () => {
    cafesService
      .login({ email: email, pass: password })
      .then(res => {
        localStorage.setItem('token', res.data.data.token);
        dispatch(
          userLogin({
            email: res.data.data.email,
            id: res.data.data.id,
            lastDate: res.data.data.last_date,
            name: res.data.data.name,
            pass: res.data.data.password,
            tableAmount: res.data.data.table_amount,
            token: res.data.data.token,
          }),
        );
        history.push('/');
      })
      .catch(result => {
        NotificationManager.error(result.response.data.message, 'Hata', 3000);
      });
    // dispatch(AuhMethods[method].onLogin({ email, password }));
  };

  // let [first, setFirst] = useState(true);

  // useLayoutEffect(() => {
  //   const cafesService = new CafesService();
  //   const handleOpen = () => {
  //     if (localStorage.getItem('token')) {
  //       cafesService.getCafeDetailsByToken({ token: localStorage.getItem('token') }).then(res => {
  //         dispatch(
  //           userLogin({
  //             email: res.data.email,
  //             id: res.data.cafeId,
  //             lastDate: res.datalastDate,
  //             name: res.data.name,
  //             pass: res.data.pass,
  //             tableAmount: res.data.tableAmount,
  //             token: localStorage.getItem('token'),
  //           }),
  //         );
  //       });
  //     }
  //   };
  //   if (first) {
  //     handleOpen();
  //     setFirst(false);
  //   }
  // }, [first, dispatch]);

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/login-img.png'} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src={'/images/logo.png'} />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Giriş Yap
        </Typography>
        <form>
          <Box mb={2}>
            <TextField
              label="Email"
              fullWidth
              onChange={event => setEmail(event.target.value)}
              defaultValue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label="Şifre"
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          {/* <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <FormControlLabel
              className={classes.formcontrolLabelRoot}
              control={<Checkbox name="checkedA" />}
              label="Remember me"
            />
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">
                <IntlMessages id="appModule.forgotPassword" />
              </NavLink>
            </Box>
          </Box> */}

          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Button onClick={onSubmit} variant="contained" color="primary">
              Giriş
            </Button>

            {/* <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/signup">
                <IntlMessages id="signIn.signUp" />
              </NavLink>
            </Box> */}
          </Box>
        </form>

        {dispatch(AuhMethods[method].getSocialMediaIcons())}

        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignIn;
