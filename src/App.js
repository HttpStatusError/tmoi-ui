import './App.css';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";
import CodePen from "./pages/CodePen";
import 'moment/locale/zh-cn'
import {FloatButton} from "antd";
import Login from "./components/User/Login";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <div className={'container'}>
      <Header/>
      <Routes>
        <Route path={'/'} element={<MainPage />}>
          <Route path=":category" element={<MainPage/>}>
            <Route path=":tag" element={<MainPage />} />
          </Route>
        </Route>
        <Route path={'/post/:id'} element={<ArticleDetail/>} />
        <Route path={'/code'} element={<CodePen />} />
      </Routes>
      <FloatButton.BackTop />
      <Login/>
    </div>
  )
}

export default App;
