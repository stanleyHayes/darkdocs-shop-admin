import React from "react";
import {Box, Hidden} from "@material-ui/core";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import TabletHeader from "./tablet-header";


const Header = ({handleDrawerOpen}) => {
    return (
        <Box>
            <Hidden mdDown={true}>
                <DesktopHeader/>
            </Hidden>
            <Hidden mdUp={true}>
                <MobileHeader handleDrawerOpen={handleDrawerOpen}/>
            </Hidden>
            <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                <TabletHeader/>
            </Hidden>
        </Box>
    )
}

export default Header;
