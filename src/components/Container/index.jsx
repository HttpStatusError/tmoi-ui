import styles from './index.module.css';
import classnames from "classnames";
import Sidebar from "../Sidebar";
import ArticleList from "../../pages/ArticleList";
import {Routes, Route, Link, NavLink, useParams, useLocation, useSearchParams} from 'react-router-dom';
import ArticleDetail from "../../pages/ArticleDetail";
import {useEffect, useState} from "react";
import {getCategoryList, getTagListByCategoryId} from "../../services/request";
import PropTypes from "prop-types";
import CategoryNav from "../Nav/CategoryNav";
import TagNav from "../Nav/TagNav";
import FilterNav from "../Nav/FilterNav";
//
// const CategoryNav = (props) => {
//   const [list, setList] = useState([]);
//
//   useEffect(() => {
//     getCategoryList()
//       .then(resp => {
//         if (resp.status) {
//           setList(resp.data);
//         }
//       })
//   }, [])
//
//   return (
//     <nav className={classnames(styles.viewNav, { [styles.top]: false })}>
//       <div className={styles.navList}>
//         <NavLink
//           isActive={(match, location) => location.pathname === '/'}
//           to={'/'}
//           className={(option) => classnames(styles.navItem, { [styles.active]: option['isActive'] })}
//         >
//           <div>全部</div>
//         </NavLink>
//         {list.map((item, idx) => (
//           <NavLink
//             key={idx}
//             to={item.path}
//             isActive={(match, location) => location.pathname.indexOf(item.path) !== -1}
//             className={(option) => classnames(styles.navItem, { [styles.active]: option['isActive'] })}
//           >
//             {item.label}
//           </NavLink>
//         ))}
//       </div>
//     </nav>
//   )
// }
//
// CategoryNav.propTypes = {
//   setTagList: PropTypes.func
// }
//
// const TagNav = (props) => {
//   return (
//     <div>
//       <ul className={classnames(styles.navList, styles.tagList)}>
//         <Link to={'/后端'}>
//           <li className={classnames(styles.navItem, styles.tag, { [styles.active]: true })}>
//             综合
//           </li>
//         </Link>
//         <Link  to={'/后端/java'}>
//           <li className={classnames(styles.navItem, styles.tag, { [styles.active]: false })}>
//             java
//           </li>
//         </Link>
//
//       </ul>
//     </div>
//   )
// }
//
// TagNav.propTypes = {
//   data: PropTypes.array
// }
//
// const FilterNav = () => {
//   return (
//     <nav className={classnames(styles.listNav)}>
//       <ul className={classnames(styles.navList, styles.left)}>
//         <li className={classnames(styles.navItem, { [styles.active]: true })}>
//           <a href={'/'}>推荐</a>
//         </li>
//         <li className={classnames(styles.navItem, { [styles.active]: false })}>
//           <a href={'/'}>最新</a>
//         </li>
//       </ul>
//     </nav>
//   )
// }

const Container = (props) => {
  let params = useParams();
  const location = useLocation()
  const [search] = useSearchParams();
  console.log(1)
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({});
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState({});
  const [payload, setPayload] = useState({});

  useEffect(() => {
    setPayload({id: 1})
  }, [params.category])

  useEffect(() => {
    getCategoryList()
      .then(resp => {
        if (resp.status) {
          setCategoryList(resp.data);
        }
      })
  }, [])

  useEffect(() => {
    // 根据pathname查找目录对象，再将对象设置为选中
    if (params.category && JSON.stringify(selectedCategory) === '{}' && categoryList.length > 0) {
      let find = categoryList.find(i => i.path.indexOf(params.category) > 0);
      setSelectedCategory(find || {})
    }
  }, [selectedCategory, categoryList, params.category])

  useEffect(() => {
    if (selectedCategory?.id) {
      getTagListByCategoryId(selectedCategory.id)
        .then(resp => {
          if (resp.status) {
            setTagList(resp.data);
          }
        });
    } else {
      setTagList([])
    }
  }, [selectedCategory])

  return (
    <main className={classnames(styles.mainContainer, styles.withViewNav)}>
      <div className={classnames(styles.view, styles.timelineIndexView)}>
        {/* 类目组件 */}
        <CategoryNav data={categoryList} selected={(category) => setSelectedCategory(category)} />
        <div className={styles.timelineContainer}>
          {/* 标签组件 */}
          {tagList.length > 0 &&
            <TagNav categoryPath={selectedCategory?.path} data={tagList} selected={(tag) => setSelectedTag(tag)}/>}
        </div>
        <div className={styles.timelineContent}>
          <div className={styles.timelineEntryList}>
            <div className={styles.entryListContainer}>
              <header className={styles.listHeader}>
                {/* 排序组件 */}
                <FilterNav/>
              </header>
              <ArticleList payload={payload} />
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