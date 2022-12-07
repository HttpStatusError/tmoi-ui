import styles from './index.module.css';
import classnames from "classnames";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getArticleById} from "../../services/request";
import moment from "moment";
import { Viewer } from '@bytemd/react';
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import './index.css';
import ArticleCard from "../../components/ArticleCard";
import {Skeleton} from "antd";

const plugins = [gfm(), gemoji(), highlight(), mediumZoom()];

const ArticleDetail = () => {
  const {id} = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getArticleById(id)
      .then(resp => {
        if (resp.status) {
          setData(resp.data)
        } else {
          if (resp.code === 10) {
            // 404
          }
        }
      })
  }, [id])

  return (
    <main className={classnames(styles.mainContainer)}>
      <div className={classnames(styles.view, styles.columnView)}>
        {
          <>
            <div className={classnames(styles.mainAea, styles.articleArea, styles.shadow)}>
              {data ?
                <article className={styles.article}>
                  <meta itemProp={'headline'} content={data?.title} />
                  <meta itemProp={'keywords'} content={`${data?.categoryLabel}` + data?.tagLabel ? `,${data?.tagLabel}` : ''} />
                  <meta itemProp={'datePublished'} content={data?.createTime} />
                  {data?.thumbUrl && <meta itemProp={'image'} content={data.thumbUrl} />}
                  <h1 className={styles.articleTitle}>
                    {data?.title || <Skeleton.Button size={"small"} style={{width: '100%', height: '2.5rem', margin: '1.67em 0'}} />}
                  </h1>
                  <div className={styles.authorInfoBlock}>
                    <a href={'/'} className={styles.avatarLink}>
                      <img alt={'zqskate'} src={data?.authorAvatar} className={classnames(styles.lazy, styles.avatar)}/>
                    </a>
                    <div className={styles.authorInfoBox}>
                      <div className={styles.authorName}>
                        <span className={classnames(styles.username, styles.ellipsis)}>
                          <span className={styles.name}>{data?.authorName || <Skeleton.Button className="name" active={true} size={'small'}/>}</span>
                        </span>
                      </div>
                      <div className={styles.metaBox}>
                        {data ?
                          <>
                            <time className={styles.time}>
                              {moment(data.createTime).format('yyyy年MM月DD日 HH:MM')}
                            </time>
                            <span className={styles.dot}>·</span>
                            <span className={styles.viewsCount}>阅读 {data.pageviews}</span>
                            {data.updateTime &&
                              <>
                                <span className={styles.dot}>·</span>
                                <span>
                                  <span className={styles.viewsCount}>已编辑</span>
                                </span>
                              </>}
                          </>
                          : <Skeleton.Button active={true} size={"small"} style={{width: 200}} />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.markdownBody}>
                      {data && <Viewer value={data.content} plugins={plugins}/>}
                    </div>
                  </div>
                </article> :
                <ArticleCard loading={true}/>
              }
              {data &&
                <div className={styles.articleEnd}>
                  <div className={styles.tagListBox}>
                    <div className={styles.tagList}>
                      <div className={styles.tagListTitle}>分类：</div>
                      <a href={data.categoryPath} className={classnames(styles.item, styles.categoryItem)}>
                        <div className={styles.tagTitle}>{data.categoryLabel}</div>
                      </a>
                    </div>
                    {data.tagLabel &&
                      <div className={styles.tagList}>
                        <div className={styles.tagListTitle}>标签：</div>
                        <a href={`${data.categoryPath}/${data.tagLabel}`} className={classnames(styles.item, styles.tagItem)}>
                          <div className={styles.tagTitle}>{data.tagLabel}</div>
                        </a>
                      </div>}
                  </div>
                </div> }
            </div>
            {data &&
              <div className={styles.sidebar}>
                <div className={classnames(styles.sidebarBlock, styles.authorBlock, styles.pure)}>
                  <div className={classnames(styles.userItem, styles.item)}>
                    <img alt={'zqskate'} src={data.authorAvatar} className={classnames(styles.lazy, styles.avatar)} />
                    <div className={styles.infoBox}>
                      <a href={'/'} target={"_blank"}  rel="noreferrer" className={styles.username}>
                        <span className={styles.name}>{data.authorName}</span>
                      </a>
                      <div className={styles.position}>后端开发</div>
                    </div>
                  </div>
                  <div className={styles.cutOff}/>
                  <div className={classnames(styles.statItem, styles.item)}>
                    <LikeIcon/>
                    <span className={styles.content}>
                    获得点赞&nbsp;2
                  </span>
                  </div>
                  <div className={classnames(styles.statItem, styles.item)}>
                    <ReadIcon/>
                    <span className={styles.content}>
                    文章被阅读&nbsp;2
                  </span>
                  </div>
                </div>
              </div>}
          </>
        }
      </div>
    </main>
  )
}

const LikeIcon = () => {
  return (
    <svg width="25" height="26" viewBox="0 0 25 26" className={styles.icon}>
      <g fill="none" fillRule="evenodd" transform="translate(0 .57)">
        <ellipse cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5" ry="12.57"/>
        <path fill="#7BB9FF" d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"/>
      </g>
    </svg>
  )
}
const ReadIcon = () => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" className={styles.icon}>
      <g fill="none" fillRule="evenodd">
        <circle cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"/>
        <path fill="#7BB9FF" d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"/>
      </g>
    </svg>
  )
}

export default ArticleDetail;