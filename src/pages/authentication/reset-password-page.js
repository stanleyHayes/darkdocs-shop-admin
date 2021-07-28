import React, {useState} from "react";
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
import {resetPassword} from "../../redux/authentication/auth-action-creators";
import {useSnackbar} from "notistack";
import {Alert} from "@material-ui/lab";

const ResetPasswordPage = () => {

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
                marginBottom: 8,
                paddingTop: 16,
                paddingBottom: 16,
                backgroundColor: theme.palette.primary.main
            },
            link: {
                textDecoration: 'none'
            },
            gridContainer: {
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            },
            title: {
                marginTop: 16,
                marginBottom: 16
            },
            image: {
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
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

    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const [visible, setVisible] = useState(false);

    const {loading, error: authError} = useSelector(state => state.auth);

    const handleChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const {enqueueSnackbar} = useSnackbar();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (!user.email) {
            setError({error, email: 'Field required'});
            return;
        } else {
            setError({error, email: null})
        }

        if (!user.newPassword) {
            setError({error, newPassword: 'Field required'});
            return;
        } else {
            setError({error, newPassword: null})
        }

        if (!user.confirmNewPassword) {
            setError({error, confirmNewPassword: 'Field required'});
            return;
        } else {
            setError({error, confirmNewPassword: null})
        }

        if (user.newPassword !== user.confirmNewPassword) {
            setError({...error, newPassword: 'Password mismatch', confirmNewPassword: 'Password mismatch'});
            return;
        } else {
            setError({error, newPassword: null, confirmNewPassword: null});
        }
        dispatch(resetPassword(user, history, showNotification));
    }

    const handleShowPassword = () => {
        setVisible(!visible);
    }


    return (
        <div className={classes.container}>
            <Container className={classes.gridContainer}>
                <Grid container={true} justifyContent="center" alignItems="center">
                    <Grid item={true}>
                        <Avatar className={classes.logo} variant="rounded">
                            <img className={classes.image} alt="logo" src="/images/logo.png"/>
                        </Avatar>
                    </Grid>
                </Grid>
                <Typography
                    color="textPrimary"
                    className={classes.title}
                    align="center"
                    gutterBottom={true}
                    variant="h4">
                    Darkdocs Shop
                </Typography>

                <Grid container={true} justifyContent="center" alignItems='center'>
                    <Grid item={true} xs={12} md={4}>
                        <Card variant="elevation" elevation={1}>
                            {loading && <LinearProgress variant="query"/>}
                            <CardContent>
                                {authError &&
                                <Alert variant="standard" severity="error">
                                    {authError}
                                </Alert>}
                                <form onSubmit={handleSubmit}>
                                    <Typography
                                        className={classes.title}
                                        gutterBottom={true}
                                        variant="h5"
                                        align="center">
                                        Reset Password
                                    </Typography>

                                    <TextField
                                        variant="outlined"
                                        label="Email"
                                        placeholder="Enter email"
                                        margin="normal"
                                        className={classes.textField}
                                        value={user.email}
                                        type="email"
                                        onChange={handleChange}
                                        name="email"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(error.email)}
                                        helperText={error.email}
                                    />

                                    <TextField
                                        variant="outlined"
                                        label="OTP"
                                        placeholder="Enter otp"
                                        margin="normal"
                                        className={classes.textField}
                                        value={user.otp}
                                        type="text"
                                        onChange={handleChange}
                                        name="otp"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(error.otp)}
                                        helperText={error.otp}
                                    />


                                    <TextField
                                        variant="outlined"
                                        label="New Password"
                                        placeholder="Enter new password"
                                        margin="normal"
                                        className={classes.textField}
                                        value={user.newPassword}
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
                                        value={user.confirmNewPassword}
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
                                        size="large">
                                        Reset Password
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ResetPasswordPage;
