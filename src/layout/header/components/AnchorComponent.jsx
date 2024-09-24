import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useAnchor from '../hooks/useAnchor';

const AnchorComponent = ({ buttonComponent, menuItems }) => {
    const { anchorEl, open, openAnchor, closeAnchor } = useAnchor();

    return (
        <div>
            {React.cloneElement(buttonComponent, { onClick: openAnchor })}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={closeAnchor}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={item.onClick || closeAnchor}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default AnchorComponent;
