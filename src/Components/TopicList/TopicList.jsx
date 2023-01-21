import { Button, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const TopicList = ({ item }) => {
  let doneQuestion = [];
  item.questions.filter(itm => {
    if (itm.Done) {
      doneQuestion.push(itm);
    }
  });
  const percentage = (doneQuestion.length / item.questions.length) * 100;
  return (
    <div
      style={{
        padding: '20px',
        margin: '10px',
        width: '350px',
        borderRadius: '10px',
        boxShadow: '1px 2px 4px 1px #8185EA',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography style={{fontWeight:"bold",textTransform:"uppercase"}}>{item.topicName}</Typography>
        {doneQuestion.length > 0 ? (
          <Link to={`/${item.topicName.replace(/ /g, "").toLowerCase()}`} style={{ textDecoration: "none" }}>
            <Button variant='contained' color="success" style={{width:"120px"}}>Solve Now</Button>
          </Link>
        ) : (
          <Link to={`/${item.topicName.replace(/ /g, "").toLowerCase()}`} style={{ textDecoration: "none" }}>
            <Button variant='contained' style={{width:"120px"}}>Start Now</Button>
          </Link>
        )}
      </div>
      <Typography textAlign={'left'} marginTop={'20px'}>
        Total Question {item.questions.length}
      </Typography>
      {doneQuestion.length > 0 ? (
        <>
          <Typography textAlign={'left'} marginTop={'20px'}>
            {Math.ceil(percentage.toFixed(2))}% Done
          </Typography>
          <LinearProgress value={percentage} color="success"  style={{width:"90%",margin:"auto",marginTop:"20px",height:"15px",borderRadius:"10px"}} variant="determinate"/>
        </>
      ) : (
        <Typography textAlign={'left'} marginTop={'20px'} fontStyle={'italic'}>
          Not Yet Started
        </Typography>
      )}
    </div>
  );
};

export default TopicList;
