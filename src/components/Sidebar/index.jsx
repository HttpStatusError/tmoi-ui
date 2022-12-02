import styles from './index.module.css';
import classnames from "classnames";
import {Button, Spin} from "antd";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getArticleHottest} from "../../services/request";
import PropTypes from "prop-types";
import {LoadingOutlined} from "@ant-design/icons";

const Sidebar = () => {
  const { hiddenHeader, stickySidebar } = useSelector(state => state.commonSlice)
  const [data, setData] = useState([]);
  const [hottestLoading, setHottestLoading] = useState(false)
  const [hottestClosed, setHottestClosed] = useState(false)

  useEffect(() => {
    setHottestLoading(true)
    getArticleHottest()
      .then(resp => {
        if (resp.status) {
          setHottestLoading(false)
          setData(resp.data);
        } else {
          setHottestLoading(false)
          setHottestClosed(true)
        }
      })
      .catch(() => {
        setHottestClosed(true)
        setHottestLoading(false)
      })
  }, [])

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
      {!hottestClosed && <Hottest data={data} loading={hottestLoading}/>}
      <Footer/>

      <div className={classnames(styles.sidebarBlock, styles.stickyBlock)}>
        <Banner/>
        {!hottestClosed && <Hottest data={data} loading={hottestLoading}/>}
        <Footer/>
      </div>
    </aside>
  )
}

const Hottest = (props) => {

  return (
    <>
      <div className={classnames(styles.sidebarBlock, styles.shadow)}>
        <div className={classnames(styles.blockTitle)}>热门文章</div>
        <Spin indicator={<LoadingOutlined spin={true} />} spinning={props.loading}>
          <div className={styles.blockBody} style={{minHeight: 200}}>
            <div className={classnames(styles.entryList)}>
              {props.data.map((item, idx) => (
                <a key={idx} href={`/post/${item.id}`} target={"_blank"} rel={"noreferrer"} title={item.title} className={styles.item}>
                  <div className={styles.entryTitle}>{item.title}</div>
                  <div className={styles.entryMetaBox}>
                    <div className={styles.entryMeta}>
                      <img
                        src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e9d76988a7ae3392dc967cfbb64cd887.svg"
                        className={styles.icon}
                        alt={'zqskate'}
                      />
                      <span className={styles.count}>{item.pageviews}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Spin>

      </div>
    </>
  )
}

Hottest.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool
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
          <a href="https://www.quxuetrip.com" target="_blank" rel="noreferrer">
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