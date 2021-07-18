import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {Button, Card, CardContent, Container, Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {updateProfile} from "../../redux/authentication/auth-action-creators";

const EditProfilePage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
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
            logo: {
                width: 100,
                height: 100
            },
            title: {
                marginBottom: 8,
                textTransform: 'uppercase',
            }
        }
    });
    const classes = useStyles();

    const [user, setUser] = useState({});
    const {username, email, name, city, country, postalCode} = user;
    const [error, setError] = useState({});
    const [hasError, setHasError] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const {loading, user: data, token} = useSelector(state => state.auth);

    useEffect(() => {
        if (data) {
            setUser({...data});
        }
    }, [data]);

    const handleSubmit = event => {
        event.preventDefault();
        const updatedUser = {};
        if (data.username !== username) {
            updatedUser['username'] = username;
        }
        if (data.email !== email) {
            updatedUser['email'] = email;
        }
        if (data.name !== name) {
            updatedUser['name'] = name;
        }
        if (city) {
            updatedUser['city'] = city;
        }
        if (country) {
            updatedUser['country'] = country;
        }
        if (postalCode) {
            updatedUser['postalCode'] = postalCode;
        }
        if (data.username !== username && !username) {
            setHasError(true);
            setError({...error, 'username': 'Field required'});
        }
        if (data.email !== email) {
            setHasError(true);
            setError({...error, 'email': 'Field required'});
        }
        if (data.name !== name) {
            setHasError(true);
            setError({...error, 'name': 'Field required'});
        }
        if (hasError) {

        } else {
            dispatch(updateProfile(updatedUser, token, history));
        }
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Grid container={true} justifyContent="center">
                    <Grid item={true} xs={12} md={8} lg={6}>
                        <Card elevation={1} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} gutterBottom={true} variant="h6" align="center">
                                    Edit Profile
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        variant="outlined"
                                        label="Username"
                                        placeholder="Enter Username"
                                        margin="normal"
                                        className={classes.textField}
                                        value={username}
                                        type="text"
                                        onChange={handleChange}
                                        name="username"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(error.username)}
                                        helperText={error.username}
                                    />

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
                                        label="Name"
                                        placeholder="Enter Name"
                                        margin="normal"
                                        className={classes.textField}
                                        value={name}
                                        type="text"
                                        onChange={handleChange}
                                        name="name"
                                        fullWidth={true}
                                        required={true}
                                        error={Boolean(error.name)}
                                        helperText={error.name}
                                    />

                                    <TextField
                                        variant="outlined"
                                        label="Country"
                                        placeholder="Enter country"
                                        margin="normal"
                                        className={classes.textField}
                                        value={country}
                                        type="text"
                                        onChange={handleChange}
                                        name="country"
                                        fullWidth={true}
                                        error={Boolean(error.country)}
                                        helperText={error.country}
                                    />

                                    <TextField
                                        variant="outlined"
                                        label="City"
                                        placeholder="Enter city"
                                        margin="normal"
                                        className={classes.textField}
                                        value={city}
                                        type="text"
                                        onChange={handleChange}
                                        name="city"
                                        fullWidth={true}
                                        error={Boolean(error.city)}
                                        helperText={error.city}
                                    />

                                    <TextField
                                        variant="outlined"
                                        label="Postal Code"
                                        placeholder="Enter postal code"
                                        margin="normal"
                                        className={classes.textField}
                                        value={postalCode}
                                        type="number"
                                        onChange={handleChange}
                                        name="postalCode"
                                        fullWidth={true}
                                        error={Boolean(error.postalCode)}
                                        helperText={error.postalCode}
                                    />

                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        fullWidth={true}
                                        className={classes.button}
                                        variant="outlined"
                                        size="small">
                                        Update Profile
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

export default EditProfilePage;
