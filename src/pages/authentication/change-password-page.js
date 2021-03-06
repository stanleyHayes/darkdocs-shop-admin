import React, {useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    Grid,
    LinearProgress,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../../redux/authentication/auth-action-creators";
import {useSnackbar} from "notistack";
import {Alert} from "@material-ui/lab";

const ChangePasswordPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                backgroundColor: theme.palette.background.default,
                minHeight: '83vh'
            },
            textField: {
                marginTop: 8,
                marginBottom: 8
            },
            divider: {
                marginTop: 8,
                marginBottom: 8
            },
            button: {
                marginTop: 8,
                paddingTop: 16,
                paddingBottom: 16,
                backgroundColor: theme.palette.primary.main
            },
            link: {
                textDecoration: 'none'
            },
            gridContainer: {
                paddingTop: 32
            },
            title: {
                marginTop: 16,
                marginBottom: 16,
                textTransform: 'uppercase'
            },
            logo: {
                width: 100,
                height: 100
            }
        }
    });

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [passwords, setPasswords] = useState({});
    const [error, setError] = useState({});
    const [visible, setVisible] = useState(false);

    const {loading, error: authError, token} = useSelector(state => state.auth);

    const {enqueueSnackbar} = useSnackbar();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleChange = event => {
        setPasswords({...passwords, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (!passwords.currentPassword) {
            setError({error, "currentPassword": 'Field required'});
            return;
        } else {
            setError({error, "currentPassword": null});
        }

        if (!passwords.newPassword) {
            setError({error, "newPassword": 'Field required'});
            return;
        } else {
            setError({error, "newPassword": null});
        }

        if (!passwords.confirmNewPassword) {
            setError({error, "confirmNewPassword": 'Field required'});
            return;
        } else {
            setError({error, "confirmNewPassword": null});
        }

        if (passwords.newPassword !== passwords.confirmNewPassword) {
            setError({error, "currentPassword": 'Password mismatch', "confirmNewPassword": 'Password mismatch'});
            return;
        } else {
            setError({error, "currentPassword": null, confirmNewPassword: null});
        }
        dispatch(changePassword(passwords, token, history, showNotification));
    }

    const handleShowPassword = () => {
        setVisible(!visible);
    }


    return (
        <Layout>
            <Container className={classes.container}>
                <Grid className={classes.gridContainer} container={true} justifyContent="center" alignItems='center'>
                    <Grid item={true} xs={12} md={6}>
                        <Card variant="elevation" elevation={1}>
                            {loading && <LinearProgress variant="query"/>}
                            <CardContent>
                                {authError &&
                                <Alert
                                    title={authError}
                                    variant="standard"
                                    severity="error">
                                    {authError}
                                </Alert>}
                                <form onSubmit={handleSubmit}>

                                    <Grid container={true} justifyContent="center" alignItems="center">
                                        <Grid item={true}>
                                            <Avatar className={classes.logo} src="/images/logo.png"/>
                                        </Grid>
                                    </Grid>

                                    <Typography
                                        className={classes.title}
                                        gutterBottom={true}
                                        variant="h5"
                                        align="center">
                                        Change Password
                                    </Typography>

                                    <TextField
                                        variant="outlined"
                                        label="Current password"
                                        placeholder="Enter your current password"
                                        margin="normal"
                                        className={classes.textField}
                                        value={passwords.currentPassword}
                                        type={visible ? 'text' : 'password'}
                                        onChange={handleChange}
                                        name="currentPassword"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(error.currentPassword)}
                                        helperText={error.currentPassword}
                                    />

                                    <TextField
                                        variant="outlined"
                                        label="New Password"
                                        placeholder="Enter new password"
                                        margin="normal"
                                        className={classes.textField}
                                        value={passwords.newPassword}
                                        type={visible ? 'text' : 'password'}
                                        onChange={handleChange}
                                        name="newPassword"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(error.newPassword)}
                                        helperText={error.newPassword}
                                    />

                                    <TextField
                                        variant="outlined"
                                        label="Confirm Password"
                                        placeholder="Confirm new password"
                                        margin="normal"
                                        className={classes.textField}
                                        value={passwords.confirmNewPassword}
                                        type={visible ? 'text' : 'password'}
                                        onChange={handleChange}
                                        name="confirmNewPassword"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(error.confirmNewPassword)}
                                        helperText={error.confirmNewPassword}
                                    />

                                    <Grid container={true} spacing={2} alignItems="center">
                                        <Grid item={true}>
                                            <Checkbox checked={visible} onChange={handleShowPassword}/>
                                        </Grid>
                                        <Grid item={true}>
                                            <Typography variant="body2" gutterBottom={true}>
                                                {visible ? 'Hide' : 'Show'}
                                            </Typography>
                                        </Grid>
                                    </Grid>


                                    <Button
                                        disabled={loading}
                                        type="submit"
                                        onClick={handleSubmit}
                                        fullWidth={true}
                                        className={classes.button}
                                        variant="outlined"
                                        size="small">
                                        Change Password
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default ChangePasswordPage;
