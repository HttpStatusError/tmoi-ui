import styles from './index.module.css';
import classnames from "classnames";

const Signin = () => {

  const getTimeState = () => {
    let text;
    let hour = new Date().getHours()
    if (hour < 6) {
      text = `凌晨，注意休息`;
    } else if (hour < 9) {
      text = `早上好！`;
    } else if (hour < 12) {
      text = `上午好！`;
    } else if (hour < 14) {
      text = `中午好！`;
    } else if (hour < 17) {
      text = `下午好！`;
    } else if (hour < 19) {
      text = `傍晚好！`;
    } else if (hour < 22) {
      text = `晚上好！`;
    } else {
      text = `深夜！`;
    }
    return text;
  }

  return (
    <div className={classnames(styles.signinTip, styles.signin)}>
      <div className={styles.firstLine} style={{opacity: 1}}>
        <div className={styles.iconText}>
          <svg width="40" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg" className="icon">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M8 2C8 1.72386 7.77614 1.5 7.5 1.5H6.5C6.22386 1.5 6 1.72386 6 2L5.9995 3H3C2.44772 3 2 3.47259 2 4.05556V7H22V4.05556C22 3.47259 21.5523 3 21 3H18V2C18 1.72386 17.7761 1.5 17.5 1.5H16.5C16.2239 1.5 16 1.72386 16 2V3H8V2ZM22 8.5H2V20.9444C2 21.5274 2.44772 22 3 22H21C21.5523 22 22 21.5274 22 20.9444V8.5Z"
                  fill="#FFCF8B"/>
            <rect x="5" y="12" width="3" height="2" rx="1" fill="#FF7D00"/>
            <rect x="10.5" y="12" width="3" height="2" rx="1" fill="#FF7D00"/>
            <rect x="5" y="16" width="3" height="2" rx="1" fill="#FF7D00"/>
            <rect x="10.5" y="16" width="3" height="2" rx="1" fill="#FF7D00"/>
            <rect x="16" y="12" width="3" height="2" rx="1" fill="#FF7D00"/>
            <rect x="16" y="16" width="3" height="2" rx="1" fill="#FF7D00"/>
          </svg>
          <span className={styles.title}>{getTimeState()}</span>
        </div>
      </div>
      <div className={styles.secondLine} style={{opacity: 1}}>We are ALL IN!</div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className={classnames(styles.sidebarBlock, styles.moreBlock)}>
      <ul className={styles.moreList}>
        <li className={styles.item}><a href="/" target="_blank" rel="nofollow" style={{color: '#9aa3ab'}}>粤ICP备20011264号</a></li>
      </ul>
      <ul className={styles.moreList}>
        <li className={styles.item}><span>联系我</span></li>
        <li className={styles.item}>
          <a href="https://space.bilibili.com/11340021" target="_blank" rel="nofollow noreferrer" style={{color: '#9aa3ab'}}>
            bilibili
          </a>
        </li>
        <li className={styles.item}>
          <a href="https://weibo.com/2452075622/profile?rightmod=1&wvr=6&mod=personinfo" target="_blank" rel="nofollow noreferrer" style={{color: '#9aa3ab'}}>
            新浪微博
          </a>
        </li>
        <li className={styles.item}>
            <a href={'/'} onClick={e=>e.preventDefault()} style={{color: '#9aa3ab'}}>微信公众号</a>
        </li>
      </ul>
      <ul className={styles.moreList}>
        <li className={styles.item}><span>©2021 Create By Edison</span></li>
      </ul>
    </div>
  )
}

const Sidebar = () => {
  return (
    <aside
      className={classnames(styles.indexAside, styles.aside,
        {
          [styles.sticky]: true,
          [styles.articleSticky]: false,
          [styles.top]: true,
          [styles.articleTop]: false })
    }>
      <Signin/>
      <Footer/>
    </aside>
  )
}

export default Sidebar;