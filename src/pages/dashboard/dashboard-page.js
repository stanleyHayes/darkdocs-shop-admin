import React from "react";
import Layout from "../../components/layout/layout";
import {Avatar, Card, CardContent, Container, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import {
    AccountCircle,
    Cancel,
    CheckCircle,
    CreditCard,
    Email,
    Face,
    HourglassEmpty,
    Input,
    VerifiedUser
} from "@material-ui/icons";
import {useSelector} from "react-redux";
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
                fontWeight: 'bold'
            },
            email: {
                fontWeight: 'bold'
            }
        }
    });

    const classes = useStyles();

    const {information} = useSelector(state => state.information);

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography variant="h5" gutterBottom={true} className={classes.title}>Contact Information</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true}  xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography gutterBottom={true}  variant="body2" align="center">Email</Typography>
                                <Typography className={classes.email} variant="body1" align="center">{information && information.email}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true}  xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="body2" gutterBottom={true} align="center">BTC Address</Typography>
                                <Typography gutterBottom={true}  className={classes.btc} variant="caption" display="block" align="center">
                                    {information && information.btcAddress}
                                </Typography>
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
                                        <Avatar>
                                            <VerifiedUser />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">
                                    {millify(5)}
                                </Typography>
                                <Typography variant="body2" align="center">Super Admin</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <AccountCircle />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(16)}</Typography>
                                <Typography variant="body2" align="center">Admin</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Face />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(10000)}</Typography>
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
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(45)}</Typography>
                                <Typography variant="body2" align="center">USA Banks</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(35)}</Typography>
                                <Typography variant="body2" align="center">UK Banks</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(20)}</Typography>
                                <Typography variant="body2" align="center">Canada Banks</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Products</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Input />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(5000)}</Typography>
                                <Typography variant="body2" align="center">Bank Logins</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <CreditCard />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(50000)}</Typography>
                                <Typography variant="body2" align="center">CC Dumps + Pins</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(789065)}</Typography>
                                <Typography variant="body2" align="center">Cheques</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Orders</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <CheckCircle />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(57484757)}</Typography>
                                <Typography variant="body2" align="center">Completed</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <HourglassEmpty />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(4565)}</Typography>
                                <Typography variant="body2" align="center">Pending</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Cancel />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(678 )}</Typography>
                                <Typography variant="body2" align="center">Cancelled</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Funds</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <HourglassEmpty />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(46 )}</Typography>
                                <Typography variant="body2" align="center">Pending</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <CheckCircle />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(6345643 )}</Typography>
                                <Typography variant="body2" align="center">Completed</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Cancel />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h3" align="center">{millify(54467 )}</Typography>
                                <Typography variant="body2" align="center">Cancelled</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Layout>
    )
}

export default DashboardPage;
