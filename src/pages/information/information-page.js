import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    LinearProgress,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {updateInformation} from "../../redux/information/information-action-creators";
import {useSnackbar} from "notistack";
import {Alert} from "@material-ui/lab";

const InformationPage = () => {

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
                marginBottom: 16,
                textTransform: 'uppercase'
            },
            textField: {
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
        }
    });

    const classes = useStyles();


    const [info, setInfo] = useState({});
    const {btcAddress, email} = info;
    const [error, setError] = useState({});

    const {enqueueSnackbar} = useSnackbar();

    const dispatch = useDispatch();
    const history = useHistory();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleChange = event => {
        setInfo({...info, [event.target.name]: event.target.value});
    }

    const {token} = useSelector(state => state.auth);
    const {error: infoError, information, loading} = useSelector(state => state.information);

    useEffect(() => {
        if (information) {
            setInfo({...information});
        }
    }, [information]);

    const handleSubmit = event => {
        event.preventDefault();
        const updatedInfo = {};
        if (information.email !== email) {
            updatedInfo['email'] = email;
        }
        if (information.btcAddress !== btcAddress) {
            updatedInfo['btcAddress'] = btcAddress;
        }
        if (information.email !== email) {
            setError({...error, 'email': 'Field required'});
            return;
        }
        if (information.btcAddress !== btcAddress && !btcAddress) {
            setError({...error, btcAddress: 'Field required'});
            return;
        }
        dispatch(updateInformation(updatedInfo, token, history, showNotification));
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Grid container={true} justifyContent="center">
                    <Grid item={true} xs={12} md={8} lg={6}>
                        <Card elevation={1} variant="elevation">
                            {loading && <LinearProgress variant="buffer"/>}
                            <CardContent>

                                {infoError && <Alert title={infoError} severity="error">{infoError}</Alert>}

                                <Typography
                                    color="textSecondary"
                                    className={classes.title}
                                    gutterBottom={true}
                                    variant="h6"
                                    align="center">
                                    Update Information
                                </Typography>


                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        variant="outlined"
                                        label="Email"
                                        placeholder="Enter email"
                                        margin="normal"
                                        className={classes.textField}
                                        value={email}
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
                                        label="BTC Address"
                                        placeholder="Enter BTC Address"
                                        margin="normal"
                                        className={classes.textField}
                                        value={btcAddress}
                                        type="text"
                                        onChange={handleChange}
                                        name="btcAddress"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(error.btcAddress)}
                                        helperText={error.btcAddress}
                                    />
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        fullWidth={true}
                                        className={classes.button}
                                        variant="outlined"
                                        size="small">
                                        Update Information
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

export default InformationPage;
