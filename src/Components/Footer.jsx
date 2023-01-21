import { Typography } from '@mui/material'
import React from 'react'
import Logo from '../../public/favicon.ico'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate()
    return (
        <div style={{
            display: 'flex',
            padding: '10px',
            boxShadow: '0px 0px 5px 5px #8185EA',
            textAlign:"center",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <img src={Logo} alt="DSAExpert" style={{ width: "40px", height: "40px",marginRight:"10px" }} onClick={() => navigate("/")}/>
            <Typography fontSize={'20px'} fontFamily={'sans'} onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Track your DSA progress with our personalized Love Babbar and Strivers DSA Sheet, designed to help you conquer your DSA problems with ease.</Typography>
        </div>
    )
}

export default Footer