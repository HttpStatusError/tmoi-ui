import styles from './index.module.css';
import classnames from "classnames";
import {Button} from "antd";
import {useSelector} from "react-redux";

const Sidebar = () => {
  const { hiddenHeader, stickySidebar } = useSelector(state => state.commonSlice)
  return (
    <aside
      className={classnames(styles.indexAside, styles.aside,
        {
          [styles.sticky]: stickySidebar,
          [styles.articleSticky]: false,
          [styles.top]: hiddenHeader,
          [styles.articleTop]: false })
    }>
      <Signin/>
      <Banner/>
      <Footer/>

      <div className={classnames(styles.sidebarBlock, styles.stickyBlock)}>
        <Signin/>
        <Banner/>
        <Footer/>
      </div>
    </aside>
  )
}

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
          <span className={styles.title}>{getTimeState()}</span>
          <span className={styles.secondLine}>努力工作，拼命玩！</span>
        </div>
        <Button className={classnames(styles.btn, styles.signinBtn)}>
          <span className={styles.btnText}>About</span>
        </Button>
      </div>
    </div>
  )
}

const Banner = () => {

  const style = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    border: 0,
    borderRadius: 'inherit',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
  }

  return (
    <>
      <div className={classnames(styles.sidebarBlock, styles.bannerBlock)}>
        <div className={styles.banner} style={{...style, height: 95, backgroundImage: `url('https://oss.zqskate.com/blog_v2_banner.png')`}}>
          <a href="https://www.quxuetrip.com" target="_blank" rel="noreferrer">
            <div className={styles.ctrlBox}>
              <span className={styles.label}>
                <span>广告</span>
              </span>
            </div>
          </a>
        </div>
      </div>
      <div className={classnames(styles.sidebarBlock, styles.bannerBlock)}>
        <div className={styles.banner} style={{...style, height: 120, backgroundImage: `url('https://oss.zqskate.com/blog_v2_banner3.png')`}}>
          <a href="https://www.quxuetrip.com" target="_blank">
            <div className={styles.ctrlBox}>
              <span className={styles.label}>
                <span>广告</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </>
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


export default Sidebar;