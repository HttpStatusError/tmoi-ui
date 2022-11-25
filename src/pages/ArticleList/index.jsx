import styles from './index.module.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Skeleton} from "antd";

const Loading = () => {
  return (
    <div className={styles.entryLink}>
      <div className={styles.contentBox} style={{paddingBottom: 16}}>
        <Skeleton.Input active size={'small'} style={{ height: 14, width: '40%', marginTop: 8, marginBottom: 16 }} block={true}/>
        <Skeleton.Input active size={'small'} style={{ height: 14, width: '100%', marginBottom: 16 }} block={true}/>
        <Skeleton.Input active size={'small'} style={{ height: 14, width: '80%', marginBottom: 16 }} block={true}/>
        <Skeleton.Input active size={'small'} style={{ height: 14, width: '60%' }} block={true}/>
      </div>
    </div>
  )
}

const ArticleCard = (props) => {
  const image = "data:image/png;base64,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";
  return (
    <div className={styles.item}>
      <div className={styles.entry}>
        {props.loading ?
          <Loading /> :
          <a href={'/'} className={styles.entryLink}>
            <div className={classnames(styles.contentBox, styles.articleContentBox)}>
              <div className={styles.metaContainer}>
                <div className={styles.userMessage}>
                  <a href={'/'} className={styles.userbox}>
                    <div className={styles.userPopoverBox}>用户名</div>
                  </a>
                </div>
                <div className={styles.dividing}/>
                <div className={styles.date}>时间</div>
                <div className={styles.dividing}/>
                <div className={styles.tagList}>
                  <div className={styles.tag}>
                    <a href={'/'} className={styles.tag}>标签1</a>
                    <i className={styles.point}/>
                  </div>
                  <div className={styles.tag}>
                    <a href={'/'} className={styles.tag}>标签2</a>
                    <i className={styles.point}/>
                  </div>
                </div>
              </div>
              <div className={styles.contentWrapper}>
                <div className={styles.contentMain}>
                  <div className={styles.titleRow}>
                    <a href={'/'} className={styles.title}  target="_blank" rel="noreferrer">
                      <div className={styles.textHighlight} dangerouslySetInnerHTML={{ __html: `<div>你知道 @Async 是怎么让方法异步执行的吗？</div>` }} />
                    </a>
                  </div>
                  <div className={styles.abstract}>
                    <a href={'/'} target="_blank" rel="noreferrer">
                      <div dangerouslySetInnerHTML={{ __html: `<div>本文通过对 @Async 注解的分析，和你解释了 @Async 是怎么让方法异步执行的吗？ 这个问题；从分析过程中可以知道，对于绝大多数面向工程师使用的注解或者工具，本质上是离不开那些最最基本知识点的</div>` }} className={styles.textHighlight} />
                    </a>
                  </div>
                  <ul className={classnames(styles.actionList)}>
                    <li className={classnames(styles.item, styles.view)}>
                      <i/><span>99</span>
                    </li>
                    <li className={classnames(styles.item, styles.like)}>
                      <i/><span>99</span>
                    </li>
                    <li className={classnames(styles.item, styles.comment)}>
                      <i/><span>99</span>
                    </li>
                  </ul>
                </div>
                {props.renderImage && <img alt={'zqskate'} src={image} className={classnames(styles.lazy, styles.thumb)}/>}
              </div>
            </div>
          </a>}
      </div>
    </div>
  )
}

const ArticleList = () => {
  return (
    <div>
      <ArticleCard loading={true}/>
      <ArticleCard/>
      <ArticleCard renderImage={true}/>
    </div>
  )
}

ArticleCard.propTypes = {
  renderImage: PropTypes.bool,
  loading: PropTypes.bool
}
ArticleCard.defaultProps = {
  renderImage: false,
  loading: false
}


export default ArticleList;