import styles from './index.module.css';
import classnames from 'classnames';
import React, {useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeArticlePageSticky, changeHiddenHeader, changeStickySidebar} from "../../redux/commonSlice";
import {Button} from "antd";

const Logo = () => {
  return (
    <a href="/" className={styles.logo}>
      <img alt={'zqskate'}
           src="https://oss.zqskate.com/blog_v2_logo.png"
           className={styles.logoImg}
      />
      <img alt={'zqskate'}
           src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6bdafd801c878b10edb5fed5d00969e9.svg"
           className={styles.mobile}
      />
    </a>
  )
}

const Nav = () => {
  const location = useLocation();
  const [searchInputClick, setSearchInputClick] = useState(false);

  const pathList = ['/code', '/tools']

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.navList}>
        {/* 导航栏 */}
        <li className={styles.mainNavList}>
          <ul className={styles.phoneHide}>
            <li className={classnames(styles.navItem, styles.linkItem, { [styles.active]: !pathList.includes(location.pathname) })}>
              <NavLink to={'/'}>首页</NavLink>
            </li>
            <li className={classnames(styles.navItem, styles.linkItem, { [styles.active]: location.pathname === '/code' })}>
                <NavLink to={'/code'}>
                    在线代码
                  {location.pathname !== '/code' && <span className={styles.tablead}>测试版</span>}
                </NavLink>
            </li>
            <li className={classnames(styles.navItem, styles.linkItem, { [styles.active]: location.pathname === '/tools' })}>
              <NavLink to={'/tools'}>常用工具</NavLink>
            </li>
          </ul>
        </li>
        <ul className={styles.rightSideNav}>
          <li className={styles.searchAdd}>
            <ul className={styles.searchAddUl}>
              <li className={classnames(styles.navItem, styles.search)}>
                <div className={classnames(styles.searchForm, { [styles.active]: searchInputClick })}>
                  <input
                    type={'text'}
                    placeholder={'探索纯真博物馆'}
                    onBlur={() => setSearchInputClick(false)}
                    onFocus={() => setSearchInputClick(true)}
                    className={classnames(styles.searchInput, { [styles.active]: false })}
                  />
                  <div className={styles.searchIconContainer}>
                    <img
                      src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/1e8ab9a22f0ddc36349f60b38900d0bd.svg"
                      alt="搜索"
                      className={styles.searchIcon}
                    />
                  </div>
                </div>
              </li>
              <li className={classnames(styles.navItem, styles.add, styles.creatorItem)}>
                <div className={styles.addGroup}>
                  <Button type={'primary'} className={styles.addBtn}>发表文章</Button>
                </div>
              </li>
            </ul>
          </li>
          <li className={classnames(styles.navItem, styles.auth)}>
            <div className={styles.loginButtonWrap}>
              <Button className={styles.loginButton}>
                登录
                <div className={styles.loginButtonInner}>
                  <div className={styles.loginButtonLine}/>
                  注册
                </div>
              </Button>
            </div>
          </li>
        </ul>
      </ul>
    </nav>
  )
}

const Header = () => {
  const { hiddenHeader, disableHiddenHeader } = useSelector(state => state.commonSlice);
  const dispatch = useDispatch();
  const [val, setVal] = useState(0);

  useEffect(() => {
    function hiddenOrDisplayCategory() {
      // 不可操作，解决目录点击时header会动来动去
      if (disableHiddenHeader) {
        return;
      }
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scroll = scrollTop - val;
      setVal(() => scrollTop)
      // 首页sidebar滑动到指定高度后显示
      dispatch(changeStickySidebar(scrollTop > 1100))
      // 文章页面sidebar吸顶
      if (scrollTop > 280) {
        dispatch(changeArticlePageSticky(true))
      } else if (scrollTop < 300) {
        dispatch(changeArticlePageSticky(false))
      }
      // 到顶时显示header
      if (scrollTop < 100) {
        dispatch(changeHiddenHeader(false))
        return
      }
      // 滚动上下时显示/隐藏header
      if(scroll > 30) {
        dispatch(changeHiddenHeader(true))
      } else if (scroll < -30) {
        dispatch(changeHiddenHeader(false))
      }
    }
    window.addEventListener('scroll', hiddenOrDisplayCategory);
    return () => {
      window.removeEventListener('scroll', hiddenOrDisplayCategory);
    }
  }, [disableHiddenHeader, dispatch, val])

  return (
    <div className={styles.mainHeaderBox}>
      <header className={classnames(styles.mainHeader, { [styles.visible]: !hiddenHeader })}>
        <div className={styles.container}>
          <Logo/>
          <Nav/>
        </div>
      </header>
    </div>
  )
}

export default Header;