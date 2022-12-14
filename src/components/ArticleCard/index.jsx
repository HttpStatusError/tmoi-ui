import classnames from "classnames";
import PropTypes from "prop-types";
import {Skeleton} from "antd";
import styles from './index.module.css';
import moment from "moment";
import {formatNumber} from "../../util";

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
          <a href={`/post/${props.data.id}`} className={styles.entryLink} target={'_blank'} rel="noreferrer">
            <div className={classnames(styles.contentBox, styles.articleContentBox)}>
              <div className={styles.metaContainer}>
                <div className={styles.userMessage}>
                  <div className={styles.userPopoverBox}>{props.data.authorName}</div>
                </div>
                <div className={styles.dividing}/>
                <div className={styles.date}>{moment(props.data.createTime).fromNow()}</div>
                <div className={styles.dividing}/>
                <div className={styles.tagList}>
                  <div className={styles.tag}>
                    <span className={styles.tag}>{props.data.categoryLabel}</span>
                    <i className={styles.point}/>
                  </div>
                  {props.data.tagLabel &&
                    <div className={styles.tag}>
                      <span className={styles.tag}>{props.data.tagLabel}</span>
                      <i className={styles.point}/>
                    </div>}
                </div>
              </div>
              <div className={styles.contentWrapper}>
                <div className={styles.contentMain} style={{ overflow: '-webkit-paged-x' }}>
                  <div className={styles.titleRow}>
                    <a href={`/post/${props.data.id}`} className={styles.title}  target="_blank" rel="noreferrer">
                      <div className={styles.textHighlight} dangerouslySetInnerHTML={{ __html: `<div>${props.data.title}</div>` }} />
                    </a>
                  </div>
                  <div className={styles.abstract}>
                    <a href={`/post/${props.data.id}`} target="_blank" rel="noreferrer">
                      <div dangerouslySetInnerHTML={{ __html: `<div>${props.data.titleDesc}</div>` }} className={styles.textHighlight} />
                    </a>
                  </div>
                  <ul className={classnames(styles.actionList)}>
                    <li className={classnames(styles.item, styles.view)}>
                      <i/><span>{formatNumber(props.data.pageviews)}</span>
                    </li>
                    <li className={classnames(styles.item, styles.like)}>
                      <i/><span>{formatNumber(props.data.likes)}</span>
                    </li>
                    <li className={classnames(styles.item, styles.comment)}>
                      <i/><span>{formatNumber(0)}</span>
                    </li>
                  </ul>
                </div>
                {props.data.thumbUrl && <img alt={'zqskate'} src={props.data.thumbUrl} className={classnames(styles.lazy, styles.thumb)}/>}
              </div>
            </div>
          </a>}
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