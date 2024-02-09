import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const BasicModal = ({ modal, modalClose }) => {
    const [folderName, setFolderName] = useState('');
    const [parentId, setParentId] = useState('root'); // По умолчанию устанавливаем parentId как 'root'
    const navigate = useNavigate();

    const handleCreateFolder = async () => {
        const url = 'http://5.35.93.223:7000/drive/folder';
        const data = {
            parentId: parentId,
            name: folderName,
        };

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': token,
        };

        try {
            const response = await axios.post(url, data, { headers });
            console.log('Папка успешно создана:', response.data);
            navigate('/')

        } catch (error) {
            console.error('Ошибка при создании папки:', error);

        }
    };


    return (
        <Modal
            open={modal}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box className={"modalStyle"}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ p: 1 }}>
                    Укажите название папки
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        required
                        id="foldername"
                        label="Название папки"
                        fullWidth
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="text"
                        color="inherit"
                        onClick={handleCreateFolder}
                        disabled={!folderName}
                    >
                        Сохранить
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export {BasicModal};