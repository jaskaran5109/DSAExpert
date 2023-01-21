import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, InputBase, TextField, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GFG from '../../assets/gfg.png'
import CodingNinjas from '../../assets/coding-ninjas.png'
import Leetcode from '../../assets/leetcode.png'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DescriptionIcon from '@mui/icons-material/Description';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';

import '../../index.css'

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



const TableData = ({ data, handleQuestionComplete, handleBokmark, handleNote }) => {
    const [selectionModel, setSelectionModel] = useState([]);
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState('');
    const [noteId, setNoteId] = useState('');
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
                        {params.row.done ? <Button onClick={() => handleQuestionComplete(params.row.id, params.row.done, data.position)}><CheckBoxIcon /></Button> : <Button onClick={() => handleQuestionComplete(params.row.id, params.row.done, data.position)}><CheckBoxOutlineBlankIcon /></Button>}

                    </Box>
                );
            },
        },
        // { field: "id", headerName: "Id", minWidth: 50, flex: 0.1 },
        { field: "Problem", headerName: "Questions", minWidth: 400, headerAlign: "left", flex: 0.5 },
        {
            field: "actions",
            headerName: "Links",
            minWidth: 130,
            headerAlign: "center",
            align: "center",
            flex: 0.2,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                        <a href={`${params.row.link1}`} target="_blank">{params.row.link1.includes("leetcode") ? <Button><img src={Leetcode} width={"20px"} height={'20px'} alt={params.row.link1} /></Button> : <Button><img src={GFG} width={"20px"} height={'20px'} alt={params.row.link1} /></Button>}</a>

                        <a href={`${params.row.link2}`} target="_blank">{params.row.link2 && <Button><img src={CodingNinjas} width={"20px"} height={'20px'} alt={params.row.link2} /></Button>}</a>
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
                        {params.row.bookmark ? <Tooltip title="Remove Bookmark" placement="left"><Button onClick={() => handleBokmark(params.row.id, params.row.bookmark, data.position)}><BookmarkIcon /></Button></Tooltip> : <Tooltip title="Add Bookmark" placement="left"><Button onClick={() => handleBokmark(params.row.id, params.row.bookmark, data.position)}><BookmarkBorderIcon /></Button></Tooltip>}

                        {params.row.notes ? <Tooltip title="View Note" placement="left"><Button onClick={() => {
                            setOpen(true)
                            setQuestionName(params.row.Problem)
                            setNote(params.row.notes)
                            setNoteId(params.row.id)
                        }}><DescriptionIcon /></Button></Tooltip> : <Tooltip title="Add Note" placement="left"><Button onClick={() => {
                            setOpen(true)
                            setQuestionName(params.row.Problem)
                            setNote(params.row.notes)
                            setNoteId(params.row.id)
                        }}><DescriptionOutlinedIcon /></Button></Tooltip>}
                    </Box>
                );
            },
        },
    ];
    const rows = [];
    data &&
        data.questions.forEach((item, index) => {

            rows.push({
                id: index,
                Problem: item.Problem[0].toUpperCase() + item.Problem.slice(1),
                link1: item.URL,
                link2: item.URL2,
                bookmark: item.Bookmark,
                notes: item.Notes,
                done: item.Done
            });
        });

    const selRow = rows.filter((row) => {
        if (search === "")
            return rows;
        else if (row.Problem.toLowerCase().includes(search) || row.link1.toLowerCase().includes(search) || row.link2.toLowerCase().includes(search)) {
            return row;
        }
    })
    return (
        <div style={{ width: "90%", margin: "auto", marginTop: "30px",marginBottom:"30px" }}>
            <Typography fontSize={'30px'} textAlign="center">Love Babbar DSA Sheet</Typography>
            <Typography fontSize={'20px'} textAlign="center"><Link to="/" style={{ textDecoration: "none" }}>Topics</Link> / {data.topicName}</Typography>
            <Box sx={{ display: 'flex',textAlign:"center",alignItems: 'flex-end',justifyContent:"center", width: "90%",margin:"auto", boxShadow: '1px 3px 5px 1px #8185EA', padding: "10px", marginTop: "20px", backgroundColor: "white" }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.1 }} />
                <TextField id="input-with-sx" label="Search" variant="standard" sx={{ width: "100%" }} value={search} onChange={(e) => setSearch(e.target.value)} />
                {bookmark ? <Tooltip title="All Rows" placement="left"><Button onClick={() => setBookmark(false)}><BookmarkIcon /></Button></Tooltip> : <Tooltip title="All Bookmarks" placement="left"><Button onClick={() => setBookmark(true)}><BookmarkBorderIcon /></Button></Tooltip>}
            </Box>
            <div style={{ marginTop: "30px", height: "500px", width: "100%" }}>
                <DataGrid rows={selRow.filter((row) => {
                    if (bookmark) {
                        if (row.bookmark === true) {
                            return row;
                        }
                    } else
                        return selRow
                })} columns={columns}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }} selectionModel={selectionModel}

                    style={{ width: '100%', backgroundColor: "white" }}
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
                            handleNote(noteId, note, data.position)
                            setOpen(false)
                        }}>Save</Button>
                        <Button variant="contained" sx={{ ml: "10%" }} onClick={() => setOpen(false)}>Close</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default TableData;
