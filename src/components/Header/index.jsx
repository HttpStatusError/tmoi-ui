import styles from './index.module.css';
import classnames from 'classnames';
import React, {useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeHiddenHeader, changeStickySidebar} from "../../redux/commonSlice";

const Logo = () => {
  return (
    <a href="/" className={styles.logo}>
      <img alt={'zqskate'}
           src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
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

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.navList}>
        {/* 导航栏 */}
        <li className={styles.mainNavList}>
          <ul className={styles.phoneHide}>
            <li className={classnames(styles.navItem, styles.linkItem, { [styles.active]: location.pathname === '/' })}>
              <NavLink to={'/'}>首页</NavLink>
            </li>
            <li className={classnames(styles.navItem, styles.linkItem, { [styles.active]: location.pathname === '/code' })}>
              <NavLink to={'/code'}>在线代码</NavLink>
            </li>
          </ul>
        </li>
        {/* 搜索栏 */}
        <li className={styles.searchAdd}>
          <ul className={styles.searchAddUl}>
            <li className={classnames(styles.navItem, styles.search)}>
              <div className={classnames(styles.searchForm, { [styles.active]: searchInputClick })}>
                <input
                  type={'text'}
                  placeholder={'探索稀土掘金'}
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
          </ul>
        </li>
      </ul>
    </nav>
  )
}

const Header = () => {
  const { hiddenHeader } = useSelector(state => state.commonSlice);
  const dispatch = useDispatch();
  const [val, setVal] = useState(0);

  useEffect(() => {
    function hiddenOrDisplayCategory() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scroll = scrollTop - val;
      setVal(() => scrollTop)
      if (scrollTop > 1100) {
        dispatch(changeStickySidebar(true))
      } else {
        dispatch(changeStickySidebar(false))
      }
      if (scrollTop < 100) {
        dispatch(changeHiddenHeader(false))
        return
      }
      if(scroll > 15) {
        dispatch(changeHiddenHeader(true))
      } else if (scroll < -15) {
        dispatch(changeHiddenHeader(false))
      }
    }
    window.addEventListener('scroll', hiddenOrDisplayCategory);
    return () => {
      window.removeEventListener('scroll', hiddenOrDisplayCategory);
    }
  }, [dispatch, val])

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