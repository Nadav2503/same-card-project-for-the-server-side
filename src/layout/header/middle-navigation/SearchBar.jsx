import React, { useState } from 'react';
import { Box, IconButton, TextField, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isLightMode = theme.palette.mode === 'light';
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const handleSearchChange = (event) => {
        const query = event.target.value;
        if (query) {
            setSearchParams({ search: query });
            navigate(`/cards?search=${encodeURIComponent(query)}`);
        } else {
            setSearchParams({});
            navigate('/cards');
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && !isOpen && (
                <IconButton onClick={() => setIsOpen(true)} sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            )}

            <TextField
                variant="outlined"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                sx={{
                    display: (isOpen || !isMobile) ? 'block' : 'none',
                    width: '100%',
                    maxWidth: isMobile ? 'calc(100vw - 64px)' : '400px',
                    transition: 'width 0.3s',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: isLightMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: isLightMode ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: isLightMode ? '#90caf9' : "#1976d2",
                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: isOpen && (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setIsOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}
