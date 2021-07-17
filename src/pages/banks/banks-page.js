import React from "react";
import Layout from "../../components/layout/layout";
import {Container, makeStyles, Typography} from "@material-ui/core";

const BanksPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {

            }
        }
    });

    const classes = useStyles();

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography variant="h4" align="center">Banks</Typography>
            </Container>
        </Layout>
    )
}

export default BanksPage;
