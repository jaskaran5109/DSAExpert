import React from 'react'
import { useNavigate } from 'react-router-dom'
import DarkMode from '../DarkMode'
import Logo from '../../public/favicon.ico'
import { Typography } from '@mui/material'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      boxShadow: '1px 3px 5px 1px #8185EA',
      textAlign:"center",
      alignContent:"center",
      alignItems: 'center',
    }}>
      <img src={Logo} alt="DSAExpert" style={{width:"40px",height:"40px"}}/>
      <Typography fontSize={'20px'} fontFamily={'sans'} onClick={() => navigate("/")} style={{ cursor: "pointer"}}>DSA ☰xpertz</Typography>
      <DarkMode />
    </div>
  )
}

export default Header