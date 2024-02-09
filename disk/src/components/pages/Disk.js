import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Container, Box, Menu, MenuItem, IconButton, Stack, Typography} from '@mui/material';
import {getToken} from "../../services/Auth/JWTDecode";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import {BasicModal} from "../modals/modal";
import FolderIcon from '@mui/icons-material/Folder';
import {orange} from "@mui/material/colors";
import {Loader} from "../loader/Loader";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
const Disk = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [modal, setModal] = useState(false);
    const [folders, setFolders] = useState([]);


    const modalOpen = () => {
        setModal(true);
    };

    const modalClose = () => {
        setModal(false);
    };



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);

    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (getToken(token)) {
            setIsAuthenticated(true)
            navigate('/disk');
        }
        else handleLogout()
    }, []);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://5.35.93.223:7000/drive/folder/root', {
                    headers: {
                        'Authorization': token
                    }
                });
                if (!response.ok) {
                    throw new Error('Ошибка при получении папок');
                }
                const data = await response.json();
                if (data && data.data) {
                    setFolders(data.data); // Установка объекта папки в состояние
                } else {
                    console.error('Ответ от API не содержит ожидаемых данных:', data);
                }
            } catch (error) {
                console.error('Ошибка при получении папок:', error);
            }
        };

        fetchFolders();
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };


    return (

        <Container maxWidth="lg" sx={{boxShadow: 4, height: '910px', overflowY: 'auto'}} className={"containerStyle"}>
            <Box className={"box"}>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Выйти
                </Button>
            </Box>

            <Stack spacing={2} direction="column" width={"200px"}>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
                    Загрузить файл
                </Button>
                <Button
                    component="label" color="inherit" variant="outlined" startIcon={<AddOutlinedIcon/>}
                    id="create-button"
                    aria-controls={open ? 'create-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Создать
                </Button>
                <Menu
                    id="create-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'create-button',
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <MenuItem onClick={modalOpen}>
                        <IconButton aria-label="create-folder" >
                            <CreateNewFolderOutlinedIcon />
                        </IconButton>
                        Папку
                    </MenuItem>
                    <BasicModal modal = {modal} modalClose={modalClose}/>
                </Menu>
                {folders && folders.children && (
                    <div>
                        {folders.children.map((child, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <FolderIcon sx={{ color: orange[500], mr: 1, fontSize: 50 }} />
                                    <Typography sx={{fontSize: 25}}>{child.name}</Typography>
                                    <IconButton>
                                        <MoreVertOutlinedIcon sx={{ fontSize: 23 }} />
                                    </IconButton>
                                </Box>
                        ))}
                    </div>
                )}
            </Stack>
        </Container>
    );
};

export default Disk;