import React, {useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    LinearProgress,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {verifyAccount} from "../../redux/authentication/auth-action-creators";

const VerifyAccountPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                backgroundColor: theme.palette.background.default,
                minHeight: '100vh'
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
                paddingBottom: 16,
                paddingTop: 16,
                backgroundColor: theme.palette.primary.main
            },
            link: {
                textDecoration: 'none'
            },
            gridContainer: {
                minHeight: '100vh'
            },
            title: {
                marginTop: 32,
                marginBottom: 32
            },
            logo: {
                width: 100,
                height: 100
            }
        }
    });

    const [otp, setOTP] = useState("");
    const [error, setError] = useState("");
    const {token, loading, error: authError} = useSelector(state => state.auth);

    const handleChange = event => {
        setOTP(event.target.value);
    }

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        if(!otp){
            setError('OTP required');
        }else {
            dispatch(verifyAccount(otp, token, history));
        }
    }

    return (
        <div className={classes.container}>
            <Grid className={classes.gridContainer} container={true} justifyContent="center" alignItems='center'>
                <Grid item={true} xs={12} md={4}>
                    <Container>
                        <Card variant="elevation" elevation={1}>
                            {loading && <LinearProgress variant="query"/>}
                            <CardContent>
                                {authError &&
                                <Typography variant="body2" color="error" align="center">{authError}</Typography>}
                                <form onSubmit={handleSubmit}>
                                    <Grid container={true} spacing={4} justifyContent="center" alignItems="center">
                                        <Grid item={true}>
                                            <Avatar className={classes.logo} src="/images/logo.png" />
                                        </Grid>
                                    </Grid>

                                    <Typography className={classes.title} gutterBottom={true} variant="h4" align="center">
                                        Verify Account
                                    </Typography>

                                    <Typography gutterBottom={true} variant="body2" align="center">
                                        Enter the code you received in the provided email to verify your account.
                                    </Typography>

                                    <TextField
                                        variant="outlined"
                                        label="OTP"
                                        placeholder="Enter your otp"
                                        margin="normal"
                                        className={classes.textField}
                                        value={otp}
                                        type="number"
                                        onChange={handleChange}
                                        name="otp"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(error)}
                                        helperText={error}
                                    />

                                    <Button
                                        disabled={loading}
                                        type="submit"
                                        onClick={handleSubmit}
                                        fullWidth={true}
                                        className={classes.button}
                                        variant="outlined"
                                        size="small">
                                        Verify Account
                                    </Button>

                                    <Link className={classes.link} to="/auth/login">
                                        <Button fullWidth={true} variant="text" size="small">
                                            Go back to login
                                        </Button>
                                    </Link>
                                </form>
                            </CardContent>
                        </Card>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}

export default VerifyAccountPage;
