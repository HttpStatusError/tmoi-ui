import styles from './index.module.css';
import classnames from "classnames";
import Sidebar from "../Sidebar";
import ArticleList from "../../pages/ArticleList";

const CategoryNav = () => {
  return (
    <nav className={classnames(styles.viewNav, { [styles.top]: false })}>
      <div className={styles.navList}>
        <a href={'/'} className={classnames(styles.navItem, { [styles.active]: true })}>
          <div>目录1</div>
        </a>
        <a href={'/'} className={classnames(styles.navItem, { [styles.active]: false })}>
          <div>目录2</div>
        </a>
      </div>
    </nav>
  )
}

const TagNav = () => {
  return (
    <div>
      <ul className={classnames(styles.navList, styles.tagList)}>
        <li className={classnames(styles.navItem, styles.tag, { [styles.active]: true })}>
          <a href={'/'}>标签1</a>
        </li>
        <li className={classnames(styles.navItem, styles.tag, { [styles.active]: false })}>
          <a href={'/'}>标签2</a>
        </li>
      </ul>
    </div>
  )
}

const FilterNav = () => {
  return (
    <nav className={classnames(styles.listNav)}>
      <ul className={classnames(styles.navList, styles.left)}>
        <li className={classnames(styles.navItem, { [styles.active]: true })}>
          <a href={'/'}>推荐</a>
        </li>
        <li className={classnames(styles.navItem, { [styles.active]: false })}>
          <a href={'/'}>最新</a>
        </li>
      </ul>
    </nav>
  )
}

const Container = () => {
  return (
    <main className={classnames(styles.mainContainer, styles.withViewNav)}>
      <div className={classnames(styles.view, styles.timelineIndexView)}>
        {/* 类目组件 */}
        <CategoryNav/>
        <div className={styles.timelineContainer}>
          {/* 标签组件 */}
          <TagNav/>
        </div>
        <div className={styles.timelineContent}>
          <div className={styles.timelineEntryList}>
            <div className={styles.entryListContainer}>
              <header className={styles.listHeader}>
                {/* 排序组件 */}
                <FilterNav/>
              </header>
              <ArticleList/>
            </div>
            {/* 侧边栏 */}
            <Sidebar/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Container;