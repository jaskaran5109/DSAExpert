import { Box } from '@mui/material'
import React from 'react'
import TopicList from '../../Components/TopicList/TopicList'
import LinearProgress from '@mui/material/LinearProgress';
const SdaBabbar = ({ SdaSheet }) => {
  let sum = 0;
  for (let i = 0; i < SdaSheet.length; i++) {
    SdaSheet[i].questions.map((item) => {
      if (item.Done === true) {
        sum += 1;
      }
    })

  }
  const avg = sum / SdaSheet.length;
  return (
    <div>
      <h2>
        Total Questions Solved : {sum} ({avg.toFixed(2)}% DONE)
      </h2>
      <LinearProgress value={avg} style={{ width: "80%", margin: "auto", marginTop: "20px", height: "15px", borderRadius: "10px" }} variant="determinate" />
      <Box display={'flex'} flexWrap="wrap" justifyContent={"center"} marginTop={'20px'}>
        {SdaSheet?.map((item, index) => (
          <TopicList item={item} key={item.position} />
        ))}
      </Box>
    </div>
  )
}

export default SdaBabbar