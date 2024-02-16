import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Container, Box, Menu, MenuItem, IconButton, Stack, Typography, Grid} from '@mui/material';
import {getToken} from "../../services/Auth/JWTDecode";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import {BasicModal} from "../modals/modal";
import FolderIcon from '@mui/icons-material/Folder';
import {Loader} from "../loader/Loader";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import axios from "axios";

const Disk = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [createEl, setCreateEl] = useState(null);
    const openCreate = Boolean(createEl);
    const [modal, setModal] = useState(false);
    const [folders, setFolders] = useState([]);
    const [modalAction, setModalAction] = useState('create');
    const [editingFolder, setEditingFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);


    const modalOpen = (action = 'create', folder = null) => {
        setModal(true);
        setModalAction(action);
        setEditingFolder(folder);
    };


    const modalClose = () => {
        setModal(false);
    };


    const createButtonOpen = (event) => {
        setCreateEl(event.currentTarget);
    };

    const createButtonClose = () => {
        setCreateEl(null);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };



    const uploadFile = async (folderId) => {
        if (!selectedFile) {
            console.error('Файл не выбран');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('folderId', folderId); // Добавляем folderId в formData

        const url = `http://5.35.93.223:7000/drive/files/`;
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Файл успешно загружен:', response.data);
            // Вы можете добавить обновление состояния или вызов функции для обновления списка файлов
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error.response.status, error.response.data);
        }
    };


    const fetchFolderContent = async (folderId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://5.35.93.223:7000/drive/folder/${folderId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = response.data;
            console.log(response.data)
            if (data && data.data) {
                setSelectedFolder(data.data);
            } else {
                console.error('Ответ от API не содержит ожидаемых данных:', data);
            }
        } catch (error) {
            console.error('Ошибка при получении содержимого папки:', error);
        }
    };
    const handleFolderSelect = (folderId) => {
        fetchFolderContent(folderId);
    };



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (getToken(token)) {
            setIsAuthenticated(true)
            navigate('/disk');
        }
        else handleLogout()
    }, []);

    const fetchFolders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://5.35.93.223:7000/drive/folder/root', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = response.data;
            if (data && data.data) {
                setFolders(data.data);
            } else {
                console.error('Ответ от API не содержит ожидаемых данных:', data);
            }
        } catch (error) {
            console.error('Ошибка при получении папок:', error);
        }
    };
    useEffect(() => {

        fetchFolders();
    }, []);

    const deleteFolder = async (id) => {
        console.log(id)
        try {
            const token = localStorage.getItem("token");
            const url = `http://5.35.93.223:7000/drive/folder/${id}`;
            console.log(url)

            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log('Папка успешно удалена');
                fetchFolders()
            } else {
                console.error('Ошибка при удалении папки:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при удалении папки:', error);
        }
    };



    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };


    return (
        <Container maxWidth="lg" sx={{ boxShadow: 4, height: '910px', overflowY: 'auto' }} className={"containerStyle"}>
            <Grid container sx={{paddingTop: 3}}>
                <Grid item xs={3}>
                    {/* Левая часть грида */}
                    <Stack spacing={2} direction="column" width={"200px"}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={uploadFile}>
                            Загрузить файл
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>

                        <Button
                            component="label" color="inherit" variant="outlined" startIcon={<AddOutlinedIcon/>}
                            id="create-button"
                            aria-controls={openCreate ? 'create-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openCreate ? 'true' : undefined}
                            onClick={createButtonOpen}
                        >
                            Создать
                        </Button>
                        <Menu
                            id="create-menu"
                            anchorEl={createEl}
                            open={openCreate}
                            onClose={createButtonClose}
                            MenuListProps={{
                                'aria-labelledby': 'create-button',
                            }}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={() => modalOpen('create')}>
                                <IconButton aria-label="create-folder">
                                    <CreateNewFolderOutlinedIcon/>
                                </IconButton>
                                Папку
                            </MenuItem>

                        </Menu>

                        <BasicModal
                            modal={modal}
                            modalClose={modalClose}
                            action={modalAction}
                            folderData={editingFolder}
                            currentFolder={selectedFolder === null ? 'root' : selectedFolder.id}
                        />

                        {folders && folders.children && (
                            <div>
                                {folders.children.map((child) => (
                                    <Box key={child.id} sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                        <FolderIcon onClick={() => handleFolderSelect(child.id)} sx={{color: "orange", mr: 1, fontSize: 50}}/>
                                        <Typography sx={{fontSize: 25}}>{child.name}</Typography>
                                        <IconButton onClick={() => modalOpen('edit', child)}>
                                            <EditNoteOutlinedIcon sx={{fontSize: 20, color: "black"}}/>
                                        </IconButton>
                                        <IconButton onClick={() => deleteFolder(child.id)}>
                                            <DeleteSweepOutlinedIcon sx={{fontSize: 20, color: "red"}}/>
                                        </IconButton>
                                    </Box>
                                ))}
                            </div>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    {/* Центральная часть грида */}
                    <Typography sx={{fontSize: 20}}>{selectedFolder?.name}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Box className={"box"}>
                        <Button variant="outlined" color="error" onClick={handleLogout}>
                            Выйти
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Disk;