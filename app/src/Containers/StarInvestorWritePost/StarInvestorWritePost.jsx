import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Editor from '../../Components/StarInvestorWritePost/Editor/Editor';
import { userSelector } from '../../Reducer/User/UserSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import PaperBlock from '../../Components/General/PaperBlock/PaperBlock';
import SetTitle from '../../Components/StarInvestorWritePost/Editor/SetTitle';
import UploadImage from '../../Components/General/image/UploadImage';
import UpdatePostTag from '../../Components/General/Tag/UpdatePostTag';
import { GeneralButton } from '../../Components/General/CustomButton/CustomButton';
import { history } from '../../Helper/history.js';
import style from './StarInvestorWritePostStyle';
import SetPostSingleAmount from '../../Components/StartInvestorPost/SetPostSubscribedAmount/SetPostSingleAmount';

const useStyles = makeStyles(style);

const StarInvestorWritePost = () => {
    const classes = useStyles();
    const { userid } = useSelector(userSelector);
    let { PostId } = useParams();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [selectedInputSection, setSelectedInputSection] = useState();

    const handleClose = () => {
        setOpen(false);
        setOpen2(false);
        setOpen3(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpen2 = () => {
        setOpen2(true);
    };
    const handleOpen3 = () => {
        setOpen3(true);
    };

    const handleBack = () => {
        history.goBack();
    };
    const handleSelectedInput = (value) => {
        setSelectedInputSection(value);
    };

    return (
        <>
            <div
                className={classes.fakeBackground}
                onClick={() => handleSelectedInput(4)}
            />
            <div className={classes.title}>
                <GeneralButton
                    category='normal'
                    onClick={handleBack}
                    className={classes.backButton}
                >
                    <ArrowBackIcon />
                </GeneralButton>
                <Typography variant='h2'>????????????</Typography>
            </div>
            <div className={classes.root}>
                <div
                    onClick={() => handleSelectedInput(2)}
                    className={clsx({
                        [classes.inputSection]: true,
                        [classes.selectedInputSection]: selectedInputSection === 2,
                    })}
                >
                    <Typography variant='body1'>??????</Typography>
                    <div className={classes.buttonsWrap}>
                        {/* <Button onClick={handleOpen2}>??????????????????</Button> */}
                        <GeneralButton category='normal' onClick={handleOpen2}>
                            ??????????????????
                        </GeneralButton>
                        <Dialog
                            open={open2}
                            onClose={handleClose}
                            aria-labelledby='alert-dialog-title'
                            aria-describedby='alert-dialog-description'
                        >
                            <DialogActions className={classes.closeBtn}>
                                <GeneralButton category='normal' onClick={handleClose}>
                                    x
                                </GeneralButton>
                            </DialogActions>
                            <DialogTitle id='alert-dialog-title'>????????????</DialogTitle>
                            <DialogContent>
                                <DialogContentText id='alert-dialog-description'>
                                    <UploadImage id={PostId} type={2} />
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                        <GeneralButton category='normal' onClick={handleOpen}>
                            ??????TAG
                        </GeneralButton>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby='alert-dialog-title'
                            aria-describedby='alert-dialog-description'
                        >
                            <DialogActions className={classes.closeBtn}>
                                <GeneralButton category='normal' onClick={handleClose}>
                                    x
                                </GeneralButton>
                            </DialogActions>
                            <DialogTitle id='alert-dialog-title'>??????TAG</DialogTitle>
                            <DialogContent>
                                <DialogContentText id='alert-dialog-description'>
                                    <UpdatePostTag
                                        key={'updateTag' + PostId}
                                        id={PostId}
                                    />
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                        <GeneralButton category='normal' onClick={handleOpen3}>
                            ?????????????????????
                        </GeneralButton>
                        <Dialog
                            open={open3}
                            onClose={handleClose}
                            aria-labelledby='alert-dialog-title'
                            aria-describedby='alert-dialog-description'
                        >
                            <DialogActions className={classes.closeBtn}>
                                <GeneralButton category='normal' onClick={handleClose}>
                                    X
                                </GeneralButton>
                            </DialogActions>
                            <DialogTitle id='alert-dialog-title'>
                                ??????????????????
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id='alert-dialog-description'>
                                    <SetPostSingleAmount id={PostId} />
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div
                    className={clsx({
                        [classes.inputSection]: true,
                        [classes.selectedInputSection]: selectedInputSection === 0,
                    })}
                >
                    <Typography variant='body1'>??????</Typography>
                    <SetTitle
                        key={PostId}
                        postId={PostId}
                        handleSelectedInput={handleSelectedInput}
                    />
                </div>
                <div
                    onClick={() => handleSelectedInput(1)}
                    className={clsx({
                        [classes.inputSection]: true,
                        [classes.selectedInputSection]: selectedInputSection === 1,
                    })}
                >
                    <Typography variant='body1'>??????</Typography>
                    <Editor key={PostId} postId={PostId} />
                </div>
            </div>

            {/* <UpdatePostTag key={"updateTag" + PostId} id={PostId} /> */}
            {/* <PaperBlock className={classes.barGraph2}> */}
            {/* <Typography variant='h3' align='center'>
            ??????????????????:
        </Typography> */}
            {/* key={PostId} type={2} */}
            {/* <div className={classes.lineGraph}>
            <UploadImage id={PostId} type={2} />
        </div> */}
            {/* </PaperBlock> */}
        </>
    );
};

export default StarInvestorWritePost;
