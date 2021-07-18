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
                marginBottom: 32
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
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="body2" align="center">Email</Typography>
                                <Typography variant="body1" align="center">{information && information.email}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true}  xs={12} md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="body2" align="center">BTC Address</Typography>
                                <Typography noWrap={true} variant="body1" align="center">
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
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <VerifiedUser />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">5</Typography>
                                <Typography variant="body2" align="center">Super Admin</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <AccountCircle />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">16</Typography>
                                <Typography variant="body2" align="center">Admin</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Face />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">2000</Typography>
                                <Typography variant="body2" align="center">Users</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Banks</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">50</Typography>
                                <Typography variant="body2" align="center">USA Banks</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">16</Typography>
                                <Typography variant="body2" align="center">UK Banks</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">20</Typography>
                                <Typography variant="body2" align="center">Canada Banks</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Products</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Input />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">50</Typography>
                                <Typography variant="body2" align="center">Bank Logins</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <CreditCard />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">16</Typography>
                                <Typography variant="body2" align="center">CC Dumps + Pins</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Email />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">20</Typography>
                                <Typography variant="body2" align="center">Cheques</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Orders</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
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
                                <Typography variant="h1" align="center">50</Typography>
                                <Typography variant="body2" align="center">Completed</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <HourglassEmpty />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">16</Typography>
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
                                            <Cancel />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">20</Typography>
                                <Typography variant="body2" align="center">Cancelled</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.subDivider}/>

                <Typography variant="h5" gutterBottom={true} className={classes.title}>Funds</Typography>

                <Grid container={true} spacing={2} className={classes.gridContainer}>
                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <HourglassEmpty />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">50</Typography>
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
                                <Typography variant="h1" align="center">16</Typography>
                                <Typography variant="body2" align="center">Completed</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true}>
                                        <Avatar>
                                            <Cancel />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Typography variant="h1" align="center">20</Typography>
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
