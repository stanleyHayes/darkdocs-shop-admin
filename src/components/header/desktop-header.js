import React, {useState} from "react";
import {Avatar, Button, Grid, Menu, MenuItem, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {KeyboardArrowDown} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const DesktopHeader = () => {

    const useStyles = makeStyles(theme => {
        return {
            link: {
                textDecoration: 'none',
                color: theme.palette.text.primary
            },
            button: {
                color: theme.palette.text.primary
            },
            searchButton: {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.main
            },
            toolbar: {
                backgroundColor: theme.palette.primary.dark
            },
            name: {
                color: theme.palette.text.primary
            },
            avatar: {},
            logo: {
                width: 50,
                height: 50
            },
            brand: {
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 32
            },
            image: {
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
            }
        }
    });
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const handleProfileClick = event => {
        setMenuOpen(true);
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setMenuOpen(false);
        setAnchorEl(null);
    }

    const {user} = useSelector(state => state.auth);

    const getInitials = name => {
        const names = name.split(' ');
        if (names.length === 1)
            return names[0][0];
        if (names.length === 2)
            return `${names[0][0]}${names[1][0]}`
        return 'S'
    }

    return (
        <Toolbar className={classes.toolbar} variant="dense">
            <Grid container={true} justifyContent="space-between" alignItems="center">
                <Grid container={true} item={true} lg={8} justifyContent="flex-start">
                    <Link to="/" className={classes.link}>
                        <Button
                            startIcon={
                                <Avatar className={classes.logo} variant="rounded">
                                    <img className={classes.image} alt="logo" src="/images/logo.png"/>
                                </Avatar>
                            }
                            display="inline"
                            className={classes.brand}
                            variant="text"
                            align="center">
                            Darkdocs Shop
                        </Button>
                    </Link>
                </Grid>

                <Grid item={true} lg={4} container={true} justifyContent="flex-end">
                    <Button
                        fullWidth={false}
                        className={classes.name}
                        onClick={handleProfileClick}
                        endIcon={<KeyboardArrowDown/>}
                        startIcon={<Avatar className={classes.avatar}>{user && getInitials(user.name)}</Avatar>}
                        variant="outlined">
                        {/*{user && user.name}*/}
                        Stanley Hayford
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        variant="menu"
                        elevation={1}
                        open={menuOpen}
                        onClose={handleClose}>
                        <MenuItem onClick={handleClose}>
                            <Link className={classes.link} to="/profile">
                                <Button variant="text" size="small" className={classes.button}>
                                    Profile
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link className={classes.link} to="/edit-profile">
                                <Button variant="text" size="small" className={classes.button}>
                                    Edit Profile
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link
                                className={classes.link}
                                to="/auth/login">
                                <Button variant="text" size="small" className={classes.button}>
                                    Logout
                                </Button>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </Toolbar>
    )
}

export default DesktopHeader;
