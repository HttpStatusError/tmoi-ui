import './App.css';
import Header from "./components/Header";
import Container from "./components/Container";
import {Route, Routes} from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";
import CodePen from "./pages/CodePen";
import 'moment/locale/zh-cn'
import {FloatButton} from "antd";

const App = () => {
  return (
    <div className={'container'}>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Container />}>
          <Route path=":category" element={<Container/>}>
            <Route path=":tag" element={<Container />} />
          </Route>
        </Route>
        <Route path={'/post/:id'} element={<ArticleDetail/>} />
        <Route path={'/code'} element={<CodePen />} />
      </Routes>
      <FloatButton.BackTop />
    </div>
  )
}

export default App;
