import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Typography, Paper } from '@mui/material';
import {useNavigate} from "react-router-dom";

const AuthForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            navigate('/disk');
        }
    }, []);

    const fetchAuth = async (url) =>{
        const response = await axios.post(url, { login, password });
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin ? 'http://5.35.93.223:7000/auth/login' : 'http://5.35.93.223:7000/auth/register';
            await fetchAuth(url)
            navigate('/disk');
        } catch (error) {
            console.error(error);
        }
    };

    const handleModeChange = () => {
        setIsLogin(!isLogin);
        setLogin('');
        setPassword('');
    };

    return (
        <Paper className="auth-form" elevation={6}>
            <Typography variant="h6" align="center">
                {isLogin ? 'Авторизация' : 'Регистрация'}
            </Typography>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="login"
                            label="Login"
                            fullWidth
                            autoComplete="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            label="Пароль"
                            fullWidth
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="text" color="secondary" onClick={handleModeChange}>
                            {isLogin ? 'Нет аккаунта? Зарегистрируйтесь!' : 'Уже есть аккаунт? Войдите!'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AuthForm;