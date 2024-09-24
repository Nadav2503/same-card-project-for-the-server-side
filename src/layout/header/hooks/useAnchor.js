import { useState, useCallback } from 'react';

export default function useAnchor() {
    const [anchorEl, setAnchorEl] = useState(null);

    const openAnchor = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const closeAnchor = useCallback(() => {
        setAnchorEl(null);
    }, []);

    return {
        anchorEl,
        open: Boolean(anchorEl),
        openAnchor,
        closeAnchor
    };
}