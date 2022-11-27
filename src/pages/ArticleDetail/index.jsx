import styles from './index.module.css';
import classnames from "classnames";

const ArticleDetail = () => {
  return (
    <main className={classnames(styles.mainContainer)}>
      <div className={classnames(styles.view, styles.columnView)}>
        <div className={classnames(styles.mainAea, styles.articleArea, styles.shadow)}>
          <article className={styles.article}>
            <meta itemProp={'headline'} content={'文章标题'} />
            <meta itemProp={'keywords'} content={'文章目录,文章标签'} />
            <meta itemProp={'datePublished'} content={'文章发表日期'} />
            <meta itemProp={'image'} content={'文章图片'} />
            <div className={styles.authorInfoBlock}>
              <a href={'/'} className={styles.avatarLink}>
                <img alt={'zqskate'} src={''} className={classnames(styles.lazy, styles.avatar)}/>
              </a>
              <div className={styles.authorInfoBox}>
                <div className={styles.authorName}>
                <span className={classnames(styles.username, styles.ellipsis)}>
                  <span className={styles.name}>作者</span>
                </span>
                </div>
                <div className={styles.metaBox}>
                  <time className={styles.time}>
                    文章创建日期
                  </time>
                  <span className={styles.dot}>·</span>
                  <span className={styles.viewsCount}>
                   阅读 999
                  </span>
                  <span className={styles.dot}>·</span>
                  <span>
                    <span className={styles.viewsCount}>已编辑</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h1 className={styles.articleTitle}>
                文章标题
              </h1>
            </div>
            <div>
              <div className={styles.markdownBody}>
                这里渲染markdown
              </div>
            </div>
          </article>
          <div className={styles.tagListBox}>
            <div className={styles.tagList}>
              <div className={styles.tagListTitle}>文章分类</div>
              <a href={'/'} className={styles.item}>
                <div className={styles.tagTitle}>目录</div>
              </a>
            </div>
            <div className={styles.tagList}>
              <div className={styles.tagListTitle}>文章分类</div>
              <a href={'/'} className={styles.item}>
                <div className={styles.tagTitle}>标签</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ArticleDetail;