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
import {forgotPassword} from "../../redux/authentication/auth-action-creators";
import {Alert} from "@material-ui/lab";

const ForgotPasswordPage = () => {

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
            logo: {
                width: 100,
                height: 100
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
        }
    });

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const {loading, error: authError} = useSelector(state => state.auth);

    const handleChange = event => {
        setEmail(event.target.value);
    }

    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        if (!email) {
            setError("Field required");
        }
        if (error) {
            return;
        } else {
            dispatch(forgotPassword(email, history));
        }
    }

    return (
        <div className={classes.container}>
            <Container className={classes.gridContainer} container={true} justifyContent="center" alignItems='center'>
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
                                <Alert title="Error">
                                    {authError}
                                </Alert>
                                }
                                <form onSubmit={handleSubmit}>
                                    <Typography className={classes.title} gutterBottom={true} variant="h5"
                                                align="center">
                                        Forgot Password
                                    </Typography>

                                    <Typography gutterBottom={true} variant="body2" align="center">
                                        Enter te email address associated with your account and we'll send you a link to
                                        reset your password
                                    </Typography>

                                    <TextField
                                        variant="outlined"
                                        label="Email"
                                        placeholder="Enter your email"
                                        margin="normal"
                                        className={classes.textField}
                                        value={email}
                                        type="email"
                                        onChange={handleChange}
                                        name="email"
                                        fullWidth={true}
                                    />


                                    <Button
                                        disabled={loading}
                                        type="submit"
                                        onClick={handleSubmit}
                                        fullWidth={true}
                                        className={classes.button}
                                        variant="outlined"
                                        size="small">
                                        Continue
                                    </Button>

                                    <Link className={classes.link} to="/auth/login">
                                        <Button fullWidth={true} variant="text" size="small">
                                            Go back to login
                                        </Button>
                                    </Link>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ForgotPasswordPage;
