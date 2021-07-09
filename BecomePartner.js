import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Lottie from 'react-lottie';
import './BecomePartner.css';
import VerifiedShield from '../../assets/images/svg/verifiedEmail.svg';
import Verified from '../../assets/images/png/successIcon.png';
import '../../components/common/Input/Input.css';
import MuiOtpInput from '../../components/common/OTP/MuiOtpInputForm';
import AdminActions from '../../reducer/AdminDashboardRedux';
import PartnerActions from '../../reducer/PartnerDashboardRedux';
import AuthActions from '../../reducer/AuthRedux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import becomePartnerIntro from '../../assets/images/svg/becomePartnerIntro.svg';
import theme from '../../theme.js';
import instantConversionAnimation from './instantConversionAnimation.json';
import reduceCacTtvAnimation from './reduceCacTtvAnimation.json';
import superchargedDiscoveryAnimation from './superchargedDiscoveryAnimation.json';
import testItOutAnimation from './testItOutAnimation.json';
import CheckIcon from '@material-ui/icons/Check';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Strip } from '../../components/common/Strip.js';
import BecomePartnerBg from '../../assets/images/svg/becomePartnerBg.svg';
import {segmentEventTrack} from '../../utils/event'

const PartnerHeading = ({ bold, children, color, component='h3', inline, noWrap, textAlign, variant }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return <Typography
    variant={variant || component}
    component={component}
    color={color || 'inherit'}
    style={{
      display: inline ? 'inline' : 'block',
      fontWeight: bold ? 'bold' : undefined,
      textAlign: textAlign || (isMobile ? 'center' : 'left'),
    }}
    noWrap={noWrap}
  >{children}</Typography>;
};
const PartnerContent = ({ children, color, inline, mt, textAlign, variant="body1" }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const marginTop = mt ? theme.spacing(mt) : undefined; // remove this and add mt prop directly when it starts working
  return <Typography
    variant={variant}
    component="p"
    color={color || 'inherit'}
    style={{
      display: inline ? 'inline' : 'block',
      marginTop,
      textAlign: textAlign || (isMobile ? 'center' : 'left'),
    }}
  >{children}</Typography>;
};
const PartnerButton = ({ children, onClick, color, fullWidth, style={} }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fullWidthStyles = { width: '100%' };
  const StyledButton = withStyles({
    root: { ...((isMobile || fullWidth) ? fullWidthStyles : {}), ...style },
    label: { textAlign: 'center' },
  })(Button);
  return (
    <StyledButton variant="contained" color={color} size="large" onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const BecomePartner = ({ createPartner, addNewUser, uploadEmailOtpPartner, verifyOtp, login }) => {
  const [step, updateStep] = useState('CREATE');
  const [emailOtp, setEmailOtp] = useState('');
  const [partner, updatePartner] = useState({ partnerOverview: {} });
  const [addedPartnerInfo, updateAddedPartnerInfo] = useState({});
  const [isBackButtonClicked, setBackbuttonPress] = useState(false);
  const [partnerUser, updatePartnerUser] = useState({});
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    window.onbeforeunload = function() {
      return 'Data will be lost if you leave the page, are you sure?';
    };
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
      window.onbeforeunload = null;
    };
  }, []);

  const onBackButtonEvent = e => {
    e.preventDefault();
    if (!isBackButtonClicked) {
      if (window.confirm('Do you want to Leave the onboarding process')) {
        setBackbuttonPress(true);
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setBackbuttonPress(false);
      }
    }
  };

  const handlePartnerChange = name => event => {
    const tempPartner = { ...partner };
    tempPartner[name] = event.target.value;
    updatePartner(tempPartner);
  };

  const handlePartnerUser = name => event => {
    const tempUser = { ...partnerUser };
    tempUser[name] = event.target.value;
    updatePartnerUser(tempUser);
  };

  const renderCreatePartner = () => {
    return (
      <>
        <Grid item xs={12} md={6}>
          <TextField label="Name" placeholder="Enter your name" color="secondary" variant="filled" required fullWidth onChange={handlePartnerChange('contactPerson')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Company Name" placeholder="Enter your company name" color="secondary" variant="filled" required fullWidth onChange={handlePartnerChange('name')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Company Website" placeholder="www.example.com" color="secondary" variant="filled" required fullWidth onChange={handlePartnerChange('websiteUrl')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Work Email" placeholder="example@mail.com" color="secondary" type="email" variant="filled" required fullWidth onChange={handlePartnerChange('contactEmail')} />
        </Grid>
      </>
    );
  };

  const renderEnterPassword = () => {
    return (
      <>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone Number"
            placeholder="Mobile Number"
            type="tel"
            variant="filled"
            color="secondary"
            required
            fullWidth
            onChange={handlePartnerUser('msisdn')}
            InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Create Password" placeholder="Enter password" color="secondary" type="password" variant="filled" required fullWidth onChange={handlePartnerUser('password')} />
        </Grid>
      </>
    );
  };

  const renderVerifyEmail = () => {
    return (
      <>
        <Grid item xs={12} container direction="column" spacing={4}>
          <Grid item container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <CheckIcon style={{ fill: theme.palette.success.main }} />
              <PartnerContent variant="h6" inline> {partner.contactEmail} </PartnerContent>
              <PartnerContent variant="h6" color="textSecondary" inline>is yet to be verified</PartnerContent>
            </Grid>
            <Grid item>
              <PartnerContent variant="body2">A mail containing OTP is sent to your email id: {partner.contactEmail}</PartnerContent>
            </Grid>
          </Grid>
          <Grid item>
            <MuiOtpInput inputSize={4} callback={setEmailOtp} otp={emailOtp} />
          </Grid>
        </Grid>
      </>
    );
  };

  const renderVerified = () => {
    return (
      <Grid item xs={12} contianer direction="column" spacing={4} style={{ textAlign: 'center' }}>
        <img className="verifiedShield" src={VerifiedShield} />
        <Grid contianer direction="column" spacing={2} style={{ textAlign: 'center' }}>
          <PartnerContent variant="body2" inline>{partner.contactEmail} </PartnerContent>
          <VerifiedUserIcon style={{ fill: theme.palette.success.main }} />
          <PartnerContent variant="body2" color="theme.palette.success.main" inline> Verified</PartnerContent>
        </Grid>
      </Grid>
    );
  };

  const renderPartnerActions = () => {
    switch (step) {
      case 'CREATE':
        return renderCreatePartner();
      case 'PASSWORD':
        return renderEnterPassword();
      case 'VERIFY':
        return renderVerifyEmail();
      case 'VERIFIED':
        return renderVerified();
    }
  };

  const continueToNextStep = () => {
    // uncomment to test UI flow
    // const stepArr = ['CREATE', 'PASSWORD', 'VERIFY', 'VERIFIED'];
    // updateStep(stepArr[stepArr.indexOf(step) + 1]);
    // return;
    switch (step) {
      case 'CREATE':
        createPartner(partner, data => {
          updateAddedPartnerInfo(data);
          updateStep('PASSWORD');
        });
        break;
      case 'PASSWORD':
        const payload = {
          email: partner.contactEmail,
          msisdn: `+91${partnerUser.msisdn}`,
          name: partner.name,
          password: partnerUser.password,
          partnerId: addedPartnerInfo.id
        };
        addNewUser(payload);
        updateStep('VERIFY');
        break;
      case 'VERIFY':
        const verifyPayload = {
          otp: emailOtp,
          identifier: partner.contactEmail
        };
        uploadEmailOtpPartner(verifyPayload, () => updateStep('VERIFIED'));
        
        break;
     
      case 'VERIFIED':
        debugger
        const loginPayload = {
          identifier: `+91${partnerUser.msisdn}`,
          password: partnerUser.password
        };
        const trackSegmentEvent=async({userId,name,id,user})=>{
          // debugger
          let Segementpayload={
            id:partner.contactEmail,
            name:partner.name,
            partner_id:addedPartnerInfo.id,
            contact_no:`+91-${partnerUser.msisdn}`
          };
          debugger
          await  segmentEventTrack('Partner User SignUp',Segementpayload);
        }
        login(loginPayload,() => {
          history.push('/partner/company-profile/content-management');
        });
        trackSegmentEvent(()=>{});
    
        
        break;
    }
   
    
  };


  let gridSpacing = 5;
  gridSpacing = useMediaQuery(theme.breakpoints.up('xs')) ? 5 : gridSpacing; // > 0
  gridSpacing = useMediaQuery(theme.breakpoints.up('sm')) ? 5 : gridSpacing; // > 600
  gridSpacing = useMediaQuery(theme.breakpoints.up('md')) ? 5 : gridSpacing; // > 960
  gridSpacing = useMediaQuery(theme.breakpoints.up('lg')) ? 5 : gridSpacing; // > 1280
  gridSpacing = useMediaQuery(theme.breakpoints.up('xl')) ? 5 : gridSpacing; // > 1920

  return (
    <>
      <main className="becomePartnerContainer">
        <Strip className="intro" bg="secondary" style={{ backgroundImage: `url(${BecomePartnerBg})` }}>
          <Grid container direction="column" alignItems="center" spacing={gridSpacing}>
            <Grid item>
              <PartnerHeading textAlign="center">Become A Partner</PartnerHeading>
            </Grid>
            <Grid item>
              <PartnerContent textAlign="center">
                We are creating a mycelium network of Fintech Platforms and would love for you to be a part of it.
              </PartnerContent>
            </Grid>
            <Hidden smDown>
              <Grid item>
                <Box mb={3}><img src={becomePartnerIntro} alt="partner slides" /></Box>
              </Grid>
            </Hidden>
            <Grid item>
              <Box component="h4" textAlign="center" m={0}>
                <PartnerHeading component="span" variant="h4" color="primary" inline bold>
                  WE spend&nbsp;
                  <MonetizationOnIcon style={{ fill: theme.palette.primary.light, verticalAlign: 'middle' }} />
                  &nbsp;on CAC, let’s fund our tech instead
                </PartnerHeading>
                <PartnerHeading component="span" variant="h4" inline bold noWrap>&#32;Take back control</PartnerHeading>
              </Box>
            </Grid>
            <Grid item>
              <PartnerButton color="primary" onClick={() => {}}>Get started for FREE</PartnerButton>
            </Grid>
          </Grid>
        </Strip>
        <Strip className={`offering ${isMobile ? 'mobile' : ''}`}>
          <Grid container direction="column" alignItems="center" spacing={gridSpacing}>
            <Grid item>
              <PartnerHeading component="h4" textAlign="center" bold>What’s in it for Fintech platforms?</PartnerHeading>
            </Grid>
            <Grid className="listing" item container direction={isMobile ? 'column' : 'row-reverse'} alignItems="center" justify="space-between" spacing={5}>
              <Grid item style={{ flex: '0 0 50%', maxWidth: 450 }}>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: superchargedDiscoveryAnimation,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                />
              </Grid>
              <Grid item style={{ flex: '1 1 50%', maxWidth: 450 }}>
                <Box style={{ maxWidth: 450, width: '100%' }} textAlign={isMobile ? 'center' : 'left'}>
                  <PartnerHeading component="h5" inline bold>Supercharged discovery</PartnerHeading>
                  <PartnerContent mt={2}>
                    Tchyon will host platforms from every financial vertical. This would allow for cross-pollination of users, who are likely to use your product.
                  </PartnerContent>
                </Box>
              </Grid>
            </Grid>
            <Grid className="listing" item container direction={isMobile ? 'column' : 'row'} alignItems="center" justify="space-between" spacing={5}>
              <Grid item style={{ flex: '1 1 50%', maxWidth: 450 }}>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: instantConversionAnimation,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                />
              </Grid>
              <Grid item style={{ flex: '0 0 50%', maxWidth: 450 }}>
                <Box style={{ maxWidth: 450, width: '100%' }} textAlign={isMobile ? 'center' : 'left'}>
                  <PartnerHeading component="h5" inline bold>Instant Conversion</PartnerHeading>
                  <PartnerContent mt={2}>Tchyon's APIs would allow you to retrieve pre-vetted data from interested users, allowing you to skip the onboarding process and let the user experience your masterpiece in under 60 seconds.</PartnerContent>
                </Box>
              </Grid>
            </Grid>
            <Grid className="listing" item container direction={isMobile ? 'column' : 'row-reverse'} alignItems="center" justify="space-between" spacing={5}>
              <Grid item style={{ flex: '0 0 50%', maxWidth: 450 }}>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: testItOutAnimation,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                />
              </Grid>
              <Grid item style={{ flex: '1 1 50%', maxWidth: 450 }}>
                <Box style={{ maxWidth: 450, width: '100%' }} textAlign={isMobile ? 'center' : 'left'}>
                  <PartnerHeading component="h5" inline bold>Test it out</PartnerHeading>
                  <PartnerContent mt={2}>Launch new products to a KYC ready audience and get instant feedback. Iterate</PartnerContent>
                </Box>
              </Grid>
            </Grid>
            <Grid className="listing" item container direction={isMobile ? 'column' : 'row'} alignItems="center" justify="space-between" spacing={5}>
              <Grid item style={{ flex: '1 1 50%', maxWidth: 450 }}>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: reduceCacTtvAnimation,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                />
              </Grid>
              <Grid item style={{ flex: '0 0 50%', maxWidth: 450 }}>
                <Box style={{ maxWidth: 450, width: '100%' }} textAlign={isMobile ? 'center' : 'left'}>
                  <PartnerHeading component="h5" inline bold>Reduce CAC &amp; TTV</PartnerHeading>
                  <PartnerContent mt={2}>User journey doesn't have to start from a Google search or Ads. Tchyon is a watercooler, where digital enablers and financially astute peers would discover, recommend and use new fintech solutions.</PartnerContent>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Strip>
        <Strip className="join" bg="primary">
          <Grid container direction="column" alignItems="center" spacing={gridSpacing}>
            <Grid item>
              <PartnerHeading component="h4" textAlign="center" bold>Let’s give people what they want! Endless options + Instant Gratification</PartnerHeading>
            </Grid>
            <Grid item container spacing={5} className="form">
              {renderPartnerActions()}
              <Grid item xs={12}>
                <PartnerButton style={{ background: '#fff' }} onClick={continueToNextStep} fullWidth>JOIN NOW</PartnerButton>
              </Grid>
            </Grid>
          </Grid>
        </Strip>
      </main>
    </>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  createPartner: AdminActions.createPartner,
  addNewUser: PartnerActions.addNewUser,
  verifyOtp: AuthActions.verifyOtp,
  login: AuthActions.login,
  uploadEmailOtpPartner: AuthActions.uploadEmailOtpPartner
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BecomePartner);
