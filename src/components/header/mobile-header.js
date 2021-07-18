import React from "react";
import {Avatar, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Menu} from '@material-ui/icons';

const MobileHeader = ({handleDrawerOpen}) => {

    const useStyles = makeStyles(theme => {
        return {
            link: {
                textDecoration: 'none',
                color: theme.palette.text.secondary
            },
            toolbar: {
                backgroundColor: theme.palette.primary.dark
            },
            button: {
                color: theme.palette.text.primary,
                fontWeight: "bold",
                textTransform: 'uppercase'
            },
            menuButton: {
                color: theme.palette.text.primary
            },
            logo: {
                width: 30,
                height: 30
            },
            menu: {
                cursor: 'pointer'
            },
            image: {
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
            },
        }
    });

    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar} variant="regular">
            <Grid container={true} justifyContent="space-between" alignItems="center">
                <Grid item={true} xs={2}>
                    <Link className={classes.link} to="/">
                        <Avatar className={classes.logo} variant="rounded">
                            <img className={classes.image} alt="logo" src="/images/logo.png"/>
                        </Avatar>
                    </Link>
                </Grid>
                <Grid container={true} alignItems="center" justifyContent="flex-start" item={true} xs={8}>
                    <Grid item={true}>
                        <Typography
                            className={classes.button}
                            size="small"
                            variant="h6">Darkdocs</Typography>
                    </Grid>
                </Grid>
                <Grid item={true} xs={1}>
                    <Menu className={classes.menu} onClick={handleDrawerOpen}/>
                </Grid>
            </Grid>
        </Toolbar>
    )
}

export default MobileHeader;
