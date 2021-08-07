import React, {useEffect} from "react";
import Layout from "../../components/layout/layout";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    Typography
} from "@material-ui/core";
import {
    AccountCircle,
    CheckCircle,
    CreditCard,
    Email,
    Face,
    HourglassEmpty,
    Input,
    OfflineBolt,
    VerifiedUser
} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Skeleton} from "@material-ui/lab";
import {getInformation} from "../../redux/information/information-action-creators";
import {Link} from "react-router-dom";
import millify from "millify";

const DashboardPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {},
            divider: {
                marginTop: 16,
                marginBottom: 16
            },
            subDivider: {
                marginTop: 16,
                marginBottom: 16
            },
            gridContainer: {
                marginBottom: 32
            },
            title: {
                marginBottom: 32,
                textTransform: 'uppercase',
                color: theme.palette.text.secondary
            },
            btc: {
                fontSize: '80%',
                wordBreak: 'break-word'
            },
            email: {},
            link: {
                textDecoration: 'none'
            }
        }
    });

    const classes = useStyles();
    const dispatch = useDispatch();


    const {information, loading, error} = useSelector(state => state.information);
    const {token} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getInformation(token));
    }, [dispatch, token]);

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert variant="standard" severity="error" title={error}>{error}</Alert>}
                <Typography variant="h5" gutterBottom={true} className={classes.title}>Contact Information</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Email/>
                                    </Grid>
                                </Grid>
                                <Typography gutterBottom={true} variant="body2" align="center">Email</Typography>
                                {information && information.email ? (
                                    <Typography
                                        className={classes.email}
                                        variant="body1"
                                        align="center">
                                        {information && information.email}
                                    </Typography>
                                ) : (
                                    <Link className={classes.link} to="/information">
                                        <Button size="large" variant="outlined" fullWidth={true}>
                                            Edit Information
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <OfflineBolt/>
                                    </Grid>
                                </Grid>
                                <Typography variant="body2" gutterBottom={true} align="center">BTC Address</Typography>
                                {information && information.btcAddress ? (
                                    <Typography
                                        className={classes.btc}
                                        variant="body1"
                                        align="center">
                                        {information && information.btcAddress}
                                    </Typography>
                                ) : (
                                    <Link className={classes.link} to="/information">
                                        <Button size="large" variant="outlined" fullWidth={true}>
                                            Edit Information
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Users</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <VerifiedUser/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.superAdminsCount && millify(information.superAdminsCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">Super Admin</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <AccountCircle/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.adminsCount && millify(information.adminsCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">Admin</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Face/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.usersCount && millify(information.usersCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">Users</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Banks</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Email/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.usaBanksCount && millify(information.usaBanksCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">USA Banks</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Email/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.ukBanksCount && millify(information.ukBanksCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">UK Banks</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Email/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.canadaBanksCount && millify(information.canadaBanksCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">Canada Banks</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Products</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Input/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.loginsCount && millify(information.loginsCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">Bank Logins</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <CreditCard/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.dumpsCount && millify(information.dumpsCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">CC Dumps + Pins</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Orders</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <CheckCircle/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.ccDumpsOrdersCount && millify(information.ccDumpsOrdersCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">
                                    CC Dumps
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <HourglassEmpty/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.bankLoginsOrdersCount && millify(information.bankLoginsOrdersCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">
                                    Bank Logins
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Funds</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <HourglassEmpty/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.pendingFundsCount && millify(information.pendingFundsCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">Pending</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <CheckCircle/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.completedFundsCount && millify(information.completedFundsCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">Completed</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Cheques</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <HourglassEmpty/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.pendingChequesCount && millify(information.pendingChequesCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">Pending</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <CheckCircle/>
                                    </Grid>
                                </Grid>
                                {loading ? <Skeleton variant="text" animation="wave"/> :
                                    (<Typography variant="h3" align="center">
                                        {information && information.completedChequesCount && millify(information.completedChequesCount)}
                                    </Typography>)
                                }
                                <Typography variant="body2" align="center">Completed</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default DashboardPage;
