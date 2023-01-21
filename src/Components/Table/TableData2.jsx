import { Box, Button, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GFG from '../../assets/gfg.png'
import Youtube from '../../assets/youtube.png'
import Leetcode from '../../assets/leetcode.png'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DescriptionIcon from '@mui/icons-material/Description';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import SearchIcon from '@mui/icons-material/Search';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const TableData2 = ({ data, handleQuestionComplete2, handleBokmark2, handleNote2 }) => {
    const [selectionModel, setSelectionModel] = useState([]);
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState('');
    const [questionName, setQuestionName] = useState('')
    const [search, setSearch] = useState('')
    const [bookmark, setBookmark] = useState(false)
    const columns = [
        {
            field: "done",
            headerName: "",
            headerAlign: "center",
            minWidth: 60,
            flex: 0.1,
            align: "center",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isDone ? <Button onClick={() => handleQuestionComplete2(params.row.Problem, params.row.isDone, data.position)}><CheckBoxIcon /></Button> : <Button onClick={() => handleQuestionComplete2(params.row.Problem, params.row.isDone, data.position)}><CheckBoxOutlineBlankIcon /></Button>}

                    </Box>
                );
            },
        },
        // { field: "id", headerName: "Id", minWidth: 50, flex: 0.1 },
        { field: "Problem", headerName: "Questions", minWidth: 400, headerAlign: "left", flex: 0.5 },

        {
            field: "actions",
            headerName: "Links",
            minWidth: 160,
            headerAlign: "center",
            align: "center",
            flex: 0.2,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>

                        {params.row.gfgLink.length > 0 && <a href={`${params.row.gfgLink}`} target="_blank"><Button><img src={GFG} width={"20px"} height={'20px'} alt={params.row.gfgLink} /></Button></a>}
                        {params.row.leetCodeLink.length > 0 && <a href={`${params.row.leetCodeLink}`} target="_blank"><Button><img src={Leetcode} width={"20px"} height={'20px'} alt={params.row.leetCodeLink} /></Button></a>}
                        {params.row.youTubeLink.length > 0 && <a href={`${params.row.youTubeLink}`} target="_blank"><Button><img src={Youtube} width={"25px"} height={'25px'} alt={params.row.youTubeLink} /></Button></a>}
                    </Box>
                );
            },
        }, {
            field: "note",
            headerName: "Actions",
            headerAlign: "center",
            minWidth: 130,
            flex: 0.2,
            align: "center",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        {params.row.isBookmarked ? <Tooltip title="Remove Bookmark" placement="left"><Button onClick={() => handleBokmark2(params.row.Problem, params.row.isBookmarked, data.position)}><BookmarkIcon /></Button></Tooltip> : <Tooltip title="Add Bookmark" placement="left"><Button onClick={() => handleBokmark2(params.row.Problem, params.row.isBookmarked, data.position)}><BookmarkBorderIcon /></Button></Tooltip>}

                        {params.row.userNotes ? <Tooltip title="View Note" placement="left"><Button onClick={() => {
                            setQuestionName(params.row.Problem)
                            setOpen(true)
                            setNote(params.row.userNotes)
                        }}><DescriptionIcon /></Button></Tooltip> : <Tooltip title="Add Note" placement="left"><Button onClick={() => {
                            setQuestionName(params.row.Problem)
                            setOpen(true)
                            setNote(params.row.userNotes)
                        }}><DescriptionOutlinedIcon /></Button></Tooltip>}
                    </Box>
                );
            },
        },
    ];
    const rows = [];
    let ind = 0
    data &&
        data.categoryList.forEach((item, index) => {
            item.questionList.forEach((dt) => {
                rows.push({
                    id: ind++,
                    Problem: dt.questionHeading[0].toUpperCase() + dt.questionHeading.slice(1),
                    gfgLink: dt.gfgLink,
                    leetCodeLink: dt.leetCodeLink,
                    youTubeLink: dt.youTubeLink,
                    isDone: dt.isDone,
                    isBookmarked: dt.isBookmarked,
                    userNotes: dt.userNotes,
                })
            })
        });
    const selRow = rows.filter((row) => {
        if (search === "")
            return rows;
        else if (row.Problem.toLowerCase().includes(search)) {
            return row;
        }
    })
    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "30px",marginBottom:"30px" }}>
            <Typography fontSize={'30px'} textAlign="center">Striver’s SDE Sheet</Typography>
            <Typography fontSize={'20px'} textAlign="center"><Link to="/" style={{ textDecoration: "none" }}>Topics</Link> / {data.contentHeading}</Typography>
            <Box sx={{ display: 'flex',textAlign:"center",alignItems: 'flex-end',justifyContent:"center", width: "90%",margin:"auto", alignItems: 'flex-end', width: "98%", backgroundColor: "white", boxShadow: '1px 3px 5px 1px #8185EA', padding: "10px", marginTop: "20px" }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.1 }} />
                <TextField id="input-with-sx" label="Search" variant="standard" sx={{ width: "100%" }} value={search} onChange={(e) => setSearch(e.target.value)} />
                {bookmark ? <Tooltip title="All Rows" placement="left"><Button onClick={() => setBookmark(false)}><BookmarkIcon /></Button></Tooltip> : <Tooltip title="All Bookmarks" placement="left"><Button onClick={() => setBookmark(true)}><BookmarkBorderIcon /></Button></Tooltip>}
            </Box>
            <div style={{ marginTop: "30px", height: "500px", width: "100%" }}>
                <DataGrid columns={columns} rows={selRow.filter((row) => {
                    if (bookmark) {
                        if (row.isBookmarked === true) {
                            return row;
                        }
                    } else
                        return selRow
                })}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }} selectionModel={selectionModel}

                    style={{ width: '100%',backgroundColor: "white" }}
                />
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h1" >
                        Add Note
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {questionName}
                    </Typography>
                    <TextField sx={{ mt: 2, width: "100%" }} variant="outlined" value={note} onChange={(e) => setNote(e.target.value)} />
                    <Box sx={{ mt: 2, ml: "57%" }} >
                        <Button variant="contained" onClick={() => {
                            handleNote2(questionName, note, data.position)
                            setOpen(false)
                        }}>Save</Button>
                        <Button variant="contained" sx={{ ml: "10%" }} onClick={() => setOpen(false)}>Close</Button>
                    </Box>
                </Box>
            </Modal>

        </div>
    )
}

export default TableData2