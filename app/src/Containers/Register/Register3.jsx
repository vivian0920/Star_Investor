import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import getApi from '../../Utils/Api/getApi';
import { history } from '../../Helper/history.js';
import { initWeb3 } from '../../Reducer/QuorumNodes/QuorumNodesSlice.js';
import { userRegister2 } from '../../Reducer/User/UserSlice.js';
import { Link } from 'react-router-dom';
import getDataLogic from './RegisterLogic.js';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const Register3 = () => {
        const dispatch = useDispatch()
        const handleRegister = e => {

                const data = {
                        name: e.target.name.value,
                        nick_name: e.target.nick_name.value,
                        email: e.target.email.value,
                        account: e.target.account.value,
                        password: e.target.password.value,
                        type: e.target.type.value,
                        frequency: e.target.frequency.value,
                        consider: e.target.consider.value,
                        experience: e.target.experience.value,
                        fluctuation: e.target.fluctuation.value,
                        action: e.target.action.value,
                        brokerIdAddress: e.target.brokerIdAddress.value,
                        brokerId: e.target.brokerId.value,
                        securitiesAccount: e.target.securitiesAccount.value,
                        birth: e.target.birth.value,


                };
                dispatch(userRegister(data))
                alert("??????????????????")
                history.push("/login")

        }
        const useStyles = makeStyles(theme => ({
                formControl: {
                        margin: theme.spacing(1),
                        minWidth: 530,
                },
                formControl2: {
                        margin: theme.spacing(1),
                        minWidth: 150,
                },
                selectEmpty: {
                        marginTop: theme.spacing(2),
                },
                container: {
                        display: 'flex',
                        flexWrap: 'wrap',
                },
                textField: {
                        marginLeft: theme.spacing(1),
                        marginRight: theme.spacing(1),
                        width: 180,
                },
        }));
        const classes = useStyles();


        return (
                <React.Fragment>
                        <div>
                                <form onSubmit={handleRegister}>
                                        <h3>REGISTER</h3>
                                        <div style={{
                                                backgroundColor: 'whitesmoke',
                                                width: '280px',
                                                height: '550px',
                                                float: 'left'
                                        }}>
                                                <h3>????????????:??????????????????</h3>
                                                <p>??????:</p>
                                                <input type="text" name="name" />
                                                <p>??????:</p>
                                                <input type="text" name="nick_name" />
                                                <p>??????: </p>

                                                <TextField
                                                        id="date"
                                                        label=" "
                                                        type="date"
                                                        name="birth"
                                                        defaultValue="2000-08-19"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                                shrink: true,
                                                        }}
                                                />
                                                <p>email:</p>
                                                <input type="text" name="email" />
                                                <p>????????????:</p>
                                                <input type="text" name="account" />
                                                <p>??????:</p>
                                                <input type="text" name="password" />
                                        </div>
                                        <div style={{
                                                backgroundColor: 'white',
                                                width: '80px',
                                                height: '550px',
                                                float: 'left'
                                        }}> </div>
                                        <div style={{
                                                backgroundColor: 'whitesmoke',
                                                width: '300px',
                                                height: '550px',
                                                float: 'left'
                                        }}>
                                                <h3>????????????:?????????????????????(optional!!!)</h3>
                                                <FormControl className={classes.formControl2}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                ???????????????
                                                        </InputLabel>
                                                        <NativeSelect name="brokerIdAddress">
                                                                <option value=""></option>
                                                                <option value="3">???</option>
                                                                <option value="2">???(????????????)</option>

                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <FormControl className={classes.formControl2}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                ????????????:
                                                        </InputLabel>
                                                        <NativeSelect name="brokerId">
                                                                <option value=""></option>
                                                                <option value="A">A</option>
                                                                <option value="B">B</option>

                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                {/* <p>????????????:</p>
                        <input type="text" name="brokerId" /> */}
                                                <p>????????????:</p>
                                                <input type="text" name="securitiesAccount" />
                                                <p>???????????????:</p>
                                                <input type="text" name="???" />
                                                <p>????????????:</p>
                                                <input type="text" name="??" />
                                        </div>
                                        <div style={{
                                                backgroundColor: 'white',
                                                width: '60px',
                                                height: '550px',
                                                float: 'left'
                                        }}> </div>

                                        <div style={{
                                                backgroundColor: 'whitesmoke',
                                                width: '550px',
                                                height: '460px',
                                                float: 'left'
                                        }}>
                                                <h3>????????????:????????????</h3>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q1:????????????????????????????
                                                        </InputLabel>
                                                        <NativeSelect name="type">
                                                                <option value=""></option>
                                                                <option value="??????">??????</option>
                                                                <option value="??????">??????</option>
                                                                <option value="??????">??????</option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q2:????????????????????????????
                                                        </InputLabel>
                                                        <NativeSelect name="frequency">
                                                                <option value=""></option>
                                                                <option value="??????????????????">??????????????????</option>
                                                                <option value="????????????????????????">????????????????????????</option>
                                                                <option value="???????????????">???????????????</option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q3:????????????????????????????????????????????????????????????
                                                        </InputLabel>
                                                        <NativeSelect name="consider">
                                                                <option value=""></option>
                                                                <option value="???????????????????????????">???????????????????????????</option>
                                                                <option value="???????????????????????????">???????????????????????????</option>
                                                                <option value="????????????????????????">???????????????????????? </option>
                                                                <option value="??????">?????? </option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q4:?????????????????????????????????
                                                        </InputLabel>
                                                        <NativeSelect name="experience">
                                                                <option value=""></option>
                                                                <option value="????????????">????????????</option>
                                                                <option value="1 ??? 3 ???">1 ??? 3 ???</option>
                                                                <option value="4 ??? 6 ???">4 ??? 6 ??? </option>
                                                                <option value="6 ?????????">6 ????????? </option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q5:??????????????????????????????????????????????????????????????????????????????
                                                        </InputLabel>
                                                        <NativeSelect name="fluctuation">
                                                                <option value=""></option>
                                                                <option value="??????????????????-5% ??? +5%??????">??????????????????-5% ??? +5%??????</option>
                                                                <option value="??????????????????-10% ??? +10%??????">??????????????????-10% ??? +10%??????</option>
                                                                <option value="??????????????????-15% ??? +15%?????? ">??????????????????-15% ??? +15%?????? </option>
                                                                <option value="????????????????????15% ">????????????????????15% </option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q6:?????????????????????????????????????????????????????????????????????????????????????????????
                                                        </InputLabel>
                                                        <NativeSelect name="action">
                                                                <option value=""></option>
                                                                <option value="????????????????????????">????????????????????????</option>
                                                                <option value="????????????????????????????????????">????????????????????????????????????</option>
                                                                <option value="???????????????????????????">??????????????????????????? </option>
                                                                <option value="????????????????????????????????? ">????????????????????????????????? </option>
                                                                <option value="????????????????????????????????????">????????????????????????????????????</option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div><br></br></div>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Button variant="contained" color="primary" component={Link} to='/registerchoose'>??????</Button>
                                                        <button type="summit" variant="contained" >Summit</button>
                                                </div>
                                        </div>
                                </form>

                                <br></br>
                        </div>
                </React.Fragment >
        )
};

export default Register3;
