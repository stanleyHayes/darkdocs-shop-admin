import React, {useState} from "react";
import {Avatar, Button, Grid, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {ChevronRight, Edit, ExitToApp, Face, KeyboardArrowDown} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../redux/authentication/auth-action-creators";
import {useSnackbar} from "notistack";

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
                backgroundColor: 'white'
            },
            name: {
                color: theme.palette.text.primary
            },
            avatar: {
                height: 30,
                width: 30,
                color: 'white'
            },
            logo: {
                width: 50,
                height: 50
            },
            brand: {
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 24
            },
            image: {
                height: 50,
                width: 50,
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

    const {user, token} = useSelector(state => state.auth);

    const getInitials = name => {
        const names = name.split(' ');
        if (names.length === 1)
            return names[0][0];
        if (names.length === 2)
            return `${names[0][0]}${names[1][0]}`
        return 'S'
    }

    const dispatch = useDispatch();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    return (
        <Toolbar className={classes.toolbar} variant="dense">
            <Grid container={true} justifyContent="space-between" alignItems="center">
                <Grid container={true} item={true} lg={8} justifyContent="flex-start">
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

                <Grid item={true} lg={4} container={true} justifyContent="flex-end">
                    <Button
                        fullWidth={false}
                        className={classes.name}
                        onClick={handleProfileClick}
                        endIcon={<KeyboardArrowDown/>}
                        startIcon={<Avatar
                            className={classes.avatar}>
                            <Typography variant="body2" align="center">
                                {user && getInitials(user.name)}
                            </Typography>
                        </Avatar>}
                        variant="outlined">
                        {user && user.name}
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
                                <Button onClick={() => dispatch(signOut(token, history, showNotification))} startIcon={<ExitToApp/>} endIcon={<ChevronRight/>} variant="text" size="small"
                                        className={classes.button}>
                                    Logout
                                </Button>
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </Toolbar>
    )
}

export default DesktopHeader;
