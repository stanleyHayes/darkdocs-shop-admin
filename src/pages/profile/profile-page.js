import React from "react";
import Layout from "../../components/layout/layout";
import {Button, Card, CardContent, Container, Divider, Grid, LinearProgress, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Skeleton} from "@material-ui/lab";

const ProfilePage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },
            divider: {
                marginTop: 8,
                marginBottom: 8
            },
            gridContainer: {
                marginBottom: 32
            },
            title: {
                textTransform: 'uppercase'
            },
            link: {
                textDecoration: 'none'
            },
            button: {
                paddingTop: 8,
                paddingBottom: 8
            },
            deleteButton: {
                color: 'white',
                backgroundColor: '#DC2626',
                paddingTop: 8,
                paddingBottom: 8
            }
        }
    });

    const classes = useStyles();

    const {loading, user} = useSelector(state => state.auth);

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                <Grid className={classes.gridContainer} container={true} justifyContent="center">
                    <Grid item={true} xs={12} md={8} lg={6}>
                        <Card elevation={1} variant="elevation">
                            <CardContent>
                                <Typography className={classes.title} gutterBottom={true} variant="h5">
                                    User Profile
                                </Typography>

                                <Divider variant="fullWidth" className={classes.divider}/>
                                <Typography variant="caption">
                                    Name
                                </Typography>
                                {loading ? <Skeleton variant="text"/> : (
                                    <Typography variant="body1">
                                        {user && user.name}
                                    </Typography>
                                )}

                                <Divider variant="fullWidth" light={true} className={classes.divider}/>

                                <Typography variant="caption">
                                    Email
                                </Typography>
                                {loading ? <Skeleton variant="text"/> : (
                                    <Typography variant="body1">
                                        {user && user.email}
                                    </Typography>
                                )}
                                <Divider variant="fullWidth" light={true} className={classes.divider}/>

                                <Typography variant="caption">
                                    Username
                                </Typography>
                                {loading ? <Skeleton variant="text"/> : (
                                    <Typography variant="body1">
                                        {user && user.username}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid className={classes.gridContainer} container={true} justifyContent="center">
                    <Grid item={true} xs={12} md={8} lg={6}>
                        <Card elevation={1} variant="elevation">
                            <CardContent>
                                <Link className={classes.link} to="/edit-profile">
                                    <Button
                                        className={classes.button}
                                        fullWidth={true}
                                        variant="text"
                                        size="small">
                                        Edit Profile
                                    </Button>
                                </Link>

                                <Divider variant="fullWidth" light={true} className={classes.divider}/>

                                <Link className={classes.link} to="/auth/change-password">
                                    <Button
                                        className={classes.button}
                                        fullWidth={true}
                                        variant="text"
                                        size="small">
                                        Change Password
                                    </Button>
                                </Link>

                                <Divider variant="fullWidth" light={true} className={classes.divider}/>
                                <Button
                                    fullWidth={true}
                                    className={classes.button}
                                    variant="text"
                                    size="small">
                                    Logout
                                </Button>

                                <Divider variant="fullWidth" light={true} className={classes.divider}/>

                                <Button
                                    fullWidth={true}
                                    className={classes.deleteButton}
                                    variant="outlined"
                                    size="small">
                                    Delete Account
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Layout>
    )
}

export default ProfilePage;
