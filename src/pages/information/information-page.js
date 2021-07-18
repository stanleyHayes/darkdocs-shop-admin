import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {updateInformation} from "../../redux/information/information-action-creators";

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
    const [hasError, setHasError] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = event => {
        setInfo({...info, [event.target.name]: event.target.value});
    }

    const {loading, user: data, token} = useSelector(state => state.auth);

    useEffect(() => {
        if (data) {
            setInfo({...data});
        }
    }, [data]);

    const handleSubmit = event => {
        event.preventDefault();
        const updatedInfo = {};
        if(data.email !== email){
            updatedInfo['username'] = email;
        }
        if(data.btcAddress !== btcAddress){
            updatedInfo['name'] = btcAddress;
        }
        if(data.email !== email){
            setHasError(true);
            setError({...error, 'email': 'Field required'});
        }
        if(data.btcAddress !== btcAddress && !btcAddress){
            setHasError(true);
            setError({...error, 'BTC Address': 'Field required'});
        }
        if(hasError){

        }else {
            dispatch(updateInformation(updatedInfo, token, history));
        }
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Grid container={true} justifyContent="center">
                    <Grid item={true} xs={12} md={8} lg={6}>
                        <Card elevation={1} variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" className={classes.title} gutterBottom={true} variant="h6" align="center">
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
