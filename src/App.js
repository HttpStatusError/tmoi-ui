import './App.css';
import Header from "./components/Header";
import Container from "./components/Container";
import {Route, Routes} from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";

const App = () => {
  return (
    <div className={'container'}>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Container/>}/>
        <Route path=":category">
          <Route path=":tag" element={<Container />} />
          <Route path="" element={<Container />} />
        </Route>
        <Route path={'/post/:id'} element={<ArticleDetail/>} />
      </Routes>
    </div>
  )
}

export default App;
