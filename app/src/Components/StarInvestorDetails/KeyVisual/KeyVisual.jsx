import React, { useState, useEffect } from 'react';
import contract from '@truffle/contract';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { quorumNodesSelector } from '../../../Reducer/QuorumNodes/QuorumNodesSlice';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import LoadImage from '../../General/image/LoadImage';
import NickName from '../../General/NickName/NickName';
import { GeneralButton, LinkButton } from '../../General/CustomButton/CustomButton';
import getArticleNumber from '../../StarInvestorDetails/Article/Article.js';
import getFollowersNumber from '../../StarInvestorManagement/Revenue/Revenu2.js';
import CancelSubscribeShareAccountButton from '../../../Components/StarInvestorDetails/Button/CancelSubscribeShareAccountButton.js';
import CancelSubscribeShareArticleButton from '../Button/CancelSubscribeShareArticleButton.js';
import { makeStyles } from '@material-ui/core/styles';
import getApi from '../../../Utils/Api/getApi';
import PublicInvestmentDataSharingPlatform from '../../../contracts/PublicInvestmentDataSharingPlatform.json';
import ListeningCancelSubscribeShareAccount from '../../../Utils/Listening/ListeningSubscribeShareAccount';
import styles from './KeyVisualStyle';

const useStyle = makeStyles(styles);

const followLinks = [
    { icon: <FacebookIcon />, link: '' },
    { icon: <InstagramIcon />, link: '' },
    { icon: <LinkedInIcon />, link: '' },
    { icon: <TwitterIcon />, link: '' },
];

const KeyVisual = ({ id }) => {
    const classes = useStyle();
    const [articleNum, setArticleNum] = useState('');
    const [followers, setFollowers] = useState('');
    const [subscribed, setSubscribed] = useState();
    const [subscribedPost, setSubscribedPost] = useState();
    const { userid, brokerId, securitiesAccount } = useSelector(userSelector);
    const { currentProvider, brokerIdAddress, web3 } = useSelector(quorumNodesSelector);
    const [publicInvestment, setPublicInvestment] = useState('');
    const [starData, setStarData] = useState('');
    const FollowLinks = followLinks.map((link, index) => (
        <IconButton key={index} className={classes.followlink}>
            {link.icon}
        </IconButton>
    ));

    useEffect(() => {
        getArticleNumber(id).then((result) => {
            const num = result.data.length;
            setArticleNum(num);
        });
        getFollowersNumber(id).then((result) => {
            const { num } = result.data[0];
            setFollowers(num);
        });
    }, [id]);

    useEffect(() => {
        const getStarData = async () => {
            const starId = {
                id: id,
            };
            // console.log('??????????', starId);
            const starResponse = await getApi.post('getData/starData', starId);
            setStarData(starResponse.data);
            // console.log('???????????????', starResponse.data);
        };
        getStarData();

        const getIfSubscribed = async () => {
            const data = {
                userid: userid,
                shareID: id,
            };
            const response = await getApi.post('getData/subscribe', data);
            setSubscribed(response.data);
            // console.log('???????????????', response.data);
        };
        getIfSubscribed();
        const getIfSubscribedPost = async () => {
            const data = {
                userid: userid,
                shareID: id,
            };
            const response = await getApi.post('getData/subscribePost', data);
            console.log('??????????????????????????????~~~', response.data);
            setSubscribedPost(response.data);
            // console.log('???????????????', response.data);
        };
        getIfSubscribedPost();
    }, []);

    const getContract = async () => {
        const MyContract = contract(PublicInvestmentDataSharingPlatform);
        MyContract.setProvider(currentProvider);
        const MyContractInstance = await MyContract.deployed();
        setPublicInvestment(MyContractInstance);
    };

    useEffect(() => {
        if (brokerIdAddress) {
            getContract();
        }
    }, [brokerIdAddress]);

    useEffect(() => {
        if (publicInvestment) {
            ListeningCancelSubscribeShareAccount(publicInvestment.address, web3);
        }
        return () => {
            web3.eth.clearSubscriptions();
        };
    }, [publicInvestment]);

    return (
        <div className={classes.root}>
            <div className={classes.starBackground}></div>
            <LoadImage userid={id} className={classes.imgCircle} />
            <div className={classes.content}>
                <div className={classes.popularity}>
                    <div className={classes.popularityItem}>
                        <Typography variant='h2'>{articleNum}</Typography>
                        Posts
                    </div>
                    <div className={classes.popularityItem}>
                        <Typography variant='h2'>{followers}</Typography>
                        Followers
                    </div>
                </div>
                <div className={classes.details}>
                    <Typography variant='h1'>
                        <NickName id={id} />
                    </Typography>
                    <div className={classes.buttonsWrap}>
                        {subscribedPost ? (
                            subscribedPost == 'True' ? (
                                <CancelSubscribeShareArticleButton
                                    shareID={id}
                                    userid={userid}
                                ></CancelSubscribeShareArticleButton>
                            ) : (
                                <LinkButton category='normal' to={`/postpayment/${id}`}>
                                    ???????????????????????????
                                </LinkButton>
                            )
                        ) : (
                            <GeneralButton disableRipple>
                                ????????????????????????????????????
                            </GeneralButton>
                        )}
                        {/* <GeneralButton disableRipple>Button2</GeneralButton> */}
                        {subscribed ? (
                            subscribed == 'True' ? (
                                <CancelSubscribeShareAccountButton
                                    publicInvestment={publicInvestment}
                                    brokerIdAddress={brokerIdAddress}
                                    subscribeBrokerId={brokerId}
                                    subscriberSecuritiesAccount={securitiesAccount}
                                    shareBrokerId={starData.brokerId}
                                    shareSecuritiesAccount={starData.securitiesAccount}
                                    shareID={id}
                                    userid={userid}
                                ></CancelSubscribeShareAccountButton>
                            ) : (
                                <LinkButton category='normal' to={`/payment/${id}`}>
                                    ?????????????????????
                                </LinkButton>
                            )
                        ) : (
                            <GeneralButton disableRipple>
                                ???????????????????????????????????????????????????
                            </GeneralButton>
                        )}
                    </div>
                    <div>
                        <Typography variant='body1'>
                            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????CB???????????????????????????????????????????????????
                            ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </Typography>
                    </div>
                </div>
                <div className={classes.links}>
                    <GeneralButton category='normal'>Follow</GeneralButton>
                    <div className={classes.linksWrap}>{FollowLinks}</div>
                </div>
            </div>
        </div>
    );
};

export default KeyVisual;
