import classnames from "classnames";
import PropTypes from "prop-types";
import {Skeleton} from "antd";
import styles from './index.module.css';

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
  return (
    <div className={styles.item}>
      <div className={styles.entry}>
        {props.loading ?
          <Loading /> :
          <div className={styles.entryLink}>
            <div className={classnames(styles.contentBox, styles.articleContentBox)}>
              <div className={styles.metaContainer}>
                <div className={styles.userMessage}>
                  <a href={'/'}>
                    <div className={styles.userPopoverBox}>{props.data.authorName}</div>
                  </a>
                </div>
                <div className={styles.dividing}/>
                <div className={styles.date}>时间</div>
                <div className={styles.dividing}/>
                <div className={styles.tagList}>
                  <div className={styles.tag}>
                    <a href={props.data.categoryPath} className={styles.tag}>{props.data.categoryLabel}</a>
                    <i className={styles.point}/>
                  </div>
                  {props.data.tagLabel &&
                    <div className={styles.tag}>
                      <a href={`${props.data.categoryPath}/${props.data.tagLabel}`} className={styles.tag}>{props.data.tagLabel}</a>
                      <i className={styles.point}/>
                    </div>}
                </div>
              </div>
              <div className={styles.contentWrapper}>
                <div className={styles.contentMain}>
                  <div className={styles.titleRow}>
                    <a href={'/'} className={styles.title}  target="_blank" rel="noreferrer">
                      <div className={styles.textHighlight} dangerouslySetInnerHTML={{ __html: `<div>${props.data.title}</div>` }} />
                    </a>
                  </div>
                  <div className={styles.abstract}>
                    <a href={'/'} target="_blank" rel="noreferrer">
                      <div dangerouslySetInnerHTML={{ __html: `<div>${props.data.titleDesc}</div>` }} className={styles.textHighlight} />
                    </a>
                  </div>
                  <ul className={classnames(styles.actionList)}>
                    <li className={classnames(styles.item, styles.view)}>
                      <i/><span>{props.data.read}</span>
                    </li>
                    <li className={classnames(styles.item, styles.like)}>
                      <i/><span>{props.data.like}</span>
                    </li>
                    {/*<li className={classnames(styles.item, styles.comment)}>*/}
                    {/*  <i/><span>99</span>*/}
                    {/*</li>*/}
                  </ul>
                </div>
                {props.data.thumbUrl && <img alt={'zqskate'} src={props.data.thumbUrl} className={classnames(styles.lazy, styles.thumb)}/>}
              </div>
            </div>
          </div>}
      </div>
    </div>
  )
}

ArticleCard.propTypes = {
  renderImage: PropTypes.bool,
  loading: PropTypes.bool,
  data: PropTypes.object
}
ArticleCard.defaultProps = {
  renderImage: false,
  loading: false
}

export default ArticleCard;