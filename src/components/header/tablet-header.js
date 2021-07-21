import React, {useState} from "react";
import {Avatar, Button, Grid, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {ChevronRight, Edit, ExitToApp, Face, KeyboardArrowDown} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const TabletHeader = () => {

    const useStyles = makeStyles(theme => {
        return {
            link: {
                textDecoration: 'none',
                color: theme.palette.text.primary
            },
            button: {
                color: theme.palette.text.primary
            },
            toolbar: {
                backgroundColor: 'white'
            },
            logo: {
                width: 40,
                height: 40
            },
            name: {
                color: theme.palette.text.primary
            },
            image: {
                maxHeight: 50,
                maxWidth: 50,
                objectFit: 'cover',
                objectPosition: 'center'
            },
            brand: {
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 24
            },
            avatar: {
                height: 30,
                width: 30,
                color: 'white'
            }
        }
    });
    const classes = useStyles();
    const {user} = useSelector(state => state.auth);

    const getInitials = name => {
        const names = name.split(' ');
        if (names.length === 1)
            return names[0][0];
        if (names.length === 2)
            return `${names[0][0]}${names[1][0]}`
        return 'S'
    }

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

    return (
        <Toolbar className={classes.toolbar} variant="dense">
            <Grid container={true} justifyContent="center" alignItems="center">
                <Grid container={true} item={true} md={6} justifyContent="flex-start">
                    <Link to="/" className={classes.link}>
                        <Button
                            startIcon={
                                <img className={classes.image} alt="logo" src="/images/logo.png"/>
                            }
                            display="inline"
                            className={classes.brand}
                            variant="text"
                            align="center">
                            Darkdocs Shop
                        </Button>
                    </Link>
                </Grid>
                <Grid item={true} md={6} container={true} justifyContent="flex-end">
                    <Button
                        fullWidth={false}
                        className={classes.name}
                        onClick={handleProfileClick}
                        endIcon={<KeyboardArrowDown/>}
                        startIcon={<Avatar className={classes.avatar}>
                            {user && getInitials(user.name)}
                            <Typography variant="body2" align="center">SH</Typography>
                        </Avatar>}
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
                                <Button startIcon={<Face/>} endIcon={<ChevronRight/>} variant="text" size="small"
                                        className={classes.button}>
                                    Profile
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link className={classes.link} to="/edit-profile">
                                <Button startIcon={<Edit/>} endIcon={<ChevronRight/>} variant="text" size="small"
                                        className={classes.button}>
                                    Edit Profile
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link
                                className={classes.link}
                                to="/auth/login">
                                <Button startIcon={<ExitToApp/>} endIcon={<ChevronRight/>} variant="text" size="small"
                                        className={classes.button}>
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

export default TabletHeader;
