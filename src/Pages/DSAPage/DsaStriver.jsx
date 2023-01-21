import { Box, LinearProgress } from '@mui/material'
import React from 'react'
import TopicList2 from '../../Components/TopicList/TopicList2'

const DsaStriver = ({ DSASheet }) => {

    let doneQuestion = [];
    let totalQuestions=0
    DSASheet.map((item, index) => {
        for (let i = 0; i < item.categoryList.length; i++) {
            item.categoryList[i].questionList.filter(itm => {
                totalQuestions += 1;
                if (itm.isDone) {
                    doneQuestion.push(itm);
                }
            });
        }
    })

    const percentage = (doneQuestion.length / totalQuestions)*100;
    return (
        <div>
            <h2>
                Total Questions Solved : {doneQuestion.length} ({percentage.toFixed(2)}% DONE)
            </h2>
            <LinearProgress value={percentage} style={{ width: "80%", margin: "auto", marginTop: "20px", height: "15px", borderRadius: "10px" }} variant="determinate" />
            <Box display={'flex'} flexWrap="wrap" justifyContent={"center"} marginTop={'20px'}>
                {DSASheet?.map((item, index) => (
                    <TopicList2 item={item} key={index} />
                ))}
            </Box>
        </div>
    )
}

export default DsaStriver