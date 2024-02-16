import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BasicModal = ({ modal, modalClose, action, folderData, currentFolder }) => {
    const [folderName, setFolderName] = useState(folderData ? folderData.name : '');
    const [parentId, setParentId] = useState(folderData ? folderData.parentId : 'root');
    const navigate = useNavigate();

    console.log(folderData)
    useEffect(() => {
        setFolderName(folderData ? folderData.name : '');
        setParentId(folderData ? folderData.parentId : 'root');
    }, [folderData]);

    const handleAction = async () => {
        let url = 'http://5.35.93.223:7000/drive/folder/';
        if (action === 'edit') {
            url += folderData.id;
        }


        const data = {
            parentId: currentFolder,
            name: folderName,

        };

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        try {
            let response;
            if (action === 'edit') {
                response = await axios.patch(url, data, { headers });
            } else {
                response = await axios.post(url, data, { headers });
            }
            console.log(`Папка успешно ${action === 'edit' ? 'отредактирована' : 'создана'}:`, response.data);
            navigate('/');
        } catch (error) {
            console.error(`Ошибка при ${action === 'edit' ? 'редактировании' : 'создании'} папки:`, error);
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
                    {action === 'edit' ? 'Редактировать папку' : 'Создать новую папку'}
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
                        onClick={handleAction}
                        disabled={!folderName}
                    >
                        {action === 'edit' ? 'Сохранить изменения' : 'Создать папку'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export { BasicModal };