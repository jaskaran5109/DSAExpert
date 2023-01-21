import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import TableData from "./Components/Table/TableData";
import React, { useState } from 'react'
import Home from "./Pages/Home";
import TableData2 from "./Components/Table/TableData2";
import Footer from "./Components/Footer";

function App({ fetchData, fetchData2 }) {
  const [questionData, setData] = useState(fetchData)

  const [questionData2, setQuestionData2] = useState(fetchData2)

  useEffect(() => {
    localStorage.setItem('loveBabbarSheet', JSON.stringify(questionData))
    localStorage.setItem('striversSheet', JSON.stringify(questionData2))
  }, [questionData])
  const handleQuestionComplete = (id, selectedIndex, position) => {
    questionData[position].questions.map((item, index) => {
      if (id === index) {
        item.Done = !selectedIndex;
      }
      return item;
    })
    localStorage.setItem('loveBabbarSheet', JSON.stringify(questionData))
  }

  const handleQuestionComplete2 = (problemName, selectedIndex, position) => {
    questionData2[position].categoryList.map((item) => {
      item.questionList.forEach((dt) => {
        if (dt.questionHeading === problemName) {
          dt.isDone = !selectedIndex;
        }
        return dt;
      })
      return item;
    })
    localStorage.setItem('striversSheet', JSON.stringify(questionData2))
  }


  const handleBokmark = (id, selectedIndex, position) => {
    questionData[position].questions.map((item, index) => {
      if (id === index) {
        item.Bookmark = !selectedIndex;
      }
      return item;
    })
    localStorage.setItem('loveBabbarSheet', JSON.stringify(questionData))
  }

  const handleBokmark2 = (problemName, selectedIndex, position) => {
    questionData2[position].categoryList.map((item) => {
      item.questionList.forEach((dt) => {
        if (dt.questionHeading === problemName) {
          dt.isBookmarked = !selectedIndex;
        }
        return dt;
      })
      return item;
    })
    localStorage.setItem('striversSheet', JSON.stringify(questionData2))
  }
  const handleNote = (id, value, position) => {
    questionData[position].questions.map((item, index) => {
      if (id === index) {
        item.Notes = value;
      }
      return item;
    })
    localStorage.setItem('loveBabbarSheet', JSON.stringify(questionData))
  }

  const handleNote2 = (problemName,value, position) => {
    questionData2[position].categoryList.map((item) => {
      item.questionList.forEach((dt) => {
        if (dt.questionHeading === problemName) {
          dt.userNotes = value;
        }
        return dt;
      })
      return item;
    })
    localStorage.setItem('striversSheet', JSON.stringify(questionData2))
  }

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home SdaSheet={questionData} DSASheet={questionData2} />} />
        {/* LOVE BABBAR ROUTES */}
        <Route
          exact
          path="/array"
          element={<TableData data={questionData[0]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/matrix"
          element={<TableData data={questionData[1]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/string"
          element={<TableData data={questionData[2]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/search&sort"
          element={<TableData data={questionData[3]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/linkedlist"
          element={<TableData data={questionData[4]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/binarytrees"
          element={<TableData data={questionData[5]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/bst"
          element={<TableData data={questionData[6]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/greedy"
          element={<TableData data={questionData[7]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/backtracking"
          element={<TableData data={questionData[8]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/stacks&queues"
          element={<TableData data={questionData[9]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/heap"
          element={<TableData data={questionData[10]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/graph"
          element={<TableData data={questionData[11]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/trie"
          element={<TableData data={questionData[12]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/dynamicprogramming"
          element={<TableData data={questionData[13]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        <Route
          exact
          path="/bitmanipulation"
          element={<TableData data={questionData[14]} handleQuestionComplete={handleQuestionComplete} handleBokmark={handleBokmark} handleNote={handleNote} />}
        />
        {/* STRIVERS ROUTES */}
        {questionData2.map((item, index) => {
          return <Route
            key={index}
            exact
            path={item.contentPath}
            element={<TableData2 data={questionData2[index]} handleQuestionComplete2={handleQuestionComplete2} handleBokmark2={handleBokmark2} handleNote2={handleNote2} />}
          />
        })}
      </Routes>
      <Footer/>
    </Fragment>
  );
}

export default App;
