import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../Helper/history.js';
import { quorumNodeSettings } from '../../Reducer/QuorumNodes/QuorumNodesSlice.js';
import { userLogin, userSelector } from '../../Reducer/User/UserSlice.js';
import {
    LinkButton,
    GeneralButton,
} from '../../Components/General/CustomButton/CustomButton.jsx';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getImage } from '../../Config/images.js';
import styles from './LogInStyle';
// import getApi from '../../Utils/Api/getApi.js';

const useStyles = makeStyles(styles);

const LogIn = () => {
    const { userid, isLogin, isStarInvestor, isError, errorMessage } =
        useSelector(userSelector);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        password: '',
        account: '',
        showPassword: false,
    });
    const classes = useStyles();
    const handleLogIn = (e) => {
        e.preventDefault();
        const data = {
            account: e.target.account.value,
            password: e.target.password.value,
        };
        dispatch(userLogin(data));
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (isLogin) {
            isStarInvestor ? history.push('/star/home') : history.push('/normal/home');
        }
    }, [isLogin]);

    useEffect(() => {
        if (userid) {
            const data = { userid: userid };
            dispatch(quorumNodeSettings(data));
        }
    }, [userid]);
    // const handleClick = async () => {
    //     const data = { user_id: '1' };
    //     // const data = { content: JSON.stringify(JSON.parse(content)), post_id: postId, user_id: userid }
    //     const response = await getApi.post(
    //         '/getData/post-upload-investment-performance-send-email',
    //         data
    //     );
    // };

    // if (isFetching) {
    //     return <div>?????????...</div>;
    // }

    return (
        <div className={classes.root}>
            <div className={classes.section1}>
                <img
                    className={classes.image}
                    src={getImage('general', 'logo', 'type2')}
                />
                <Typography variant='h1' align='center'>
                    ??????????????????Tangee?????????
                </Typography>
                <Typography variant='h2' align='center'>
                    ????????????????????????????
                </Typography>
                <Typography variant='h2' align='center'>
                    ?????????????????????!
                </Typography>
            </div>
            <div className={classes.section2}>
                <div className={classes.loginBox}>
                    <Typography variant='h3'>???????????????????????????</Typography>
                    <form onSubmit={handleLogIn} className={classes.form}>
                        <FormControl variant='outlined' fullWidth>
                            <InputLabel
                                error={isError}
                                htmlFor='outlined-adornment-account'
                            >
                                ??????
                            </InputLabel>
                            <OutlinedInput
                                name='account'
                                id='outlined-adornment-account'
                                type='text'
                                value={values.account}
                                onChange={handleChange('account')}
                                labelWidth={32}
                                error={isError}
                            />
                        </FormControl>
                        <FormControl variant='outlined' fullWidth>
                            <InputLabel
                                error={isError}
                                htmlFor='outlined-adornment-password'
                            >
                                ??????
                            </InputLabel>
                            <OutlinedInput
                                name='password'
                                id='outlined-adornment-password'
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge='end'
                                        >
                                            {values.showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={32}
                                error={isError}
                            />
                        </FormControl>
                        {isError && <div>{errorMessage}</div>}
                        <GeneralButton
                            type='submit'
                            category='normal'
                            className={classes.loginButton}
                        >
                            ??????
                        </GeneralButton>
                    </form>
                    {/* <Button variant='contained' color='inherant' onClick={handleClick}>
                        ????????????
                    </Button> */}
                    <Divider className={classes.divider} />
                    <Typography variant='body1' align='center'>
                        ????????????????
                    </Typography>
                    <LinkButton to='/registerchoose' category='outline'>
                        ??????
                    </LinkButton>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
