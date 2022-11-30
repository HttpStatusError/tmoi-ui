import styles from './index.module.css';
import classnames from "classnames";
import Sidebar from "../Sidebar";
import {useParams, useSearchParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getArticleList, getCategoryList, getTagListByCategoryId} from "../../services/request";
import CategoryNav from "../Nav/CategoryNav";
import TagNav from "../Nav/TagNav";
import FilterNav from "../Nav/FilterNav";
import InfiniteScroll from "react-infinite-scroll-component";
import {FloatButton, List, Typography} from "antd";
import ArticleCard from "../ArticleCard";

const Container = () => {
  let params = useParams();
  const [search] = useSearchParams();
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({});
  const [tagList, setTagList] = useState([]);
  const [setSelectedTag] = useState({});

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
  
  useEffect(() => {
    setData([])
    setHasMore(true)
    fetchData({ cursor: 1 });
  }, [params, search])

  const [cursor, setCursor] = useState(1)
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const fetchData = (payload) => {
    const sort = payload?.sort || search.get('sort');
    const category = payload?.category || params['category'];
    const tag = payload?.tag || params['tag'];
    const currCursor = payload?.cursor || cursor;
    getArticleList({ cursor: currCursor, category, tag, sort })
      .then(resp => {
        if (resp.status) {
          if (currCursor === 1) {
            setData(resp.data.data);
          } else {
            setData([...data, ...resp.data.data]);
          }
          setCursor(resp.data.cursor);
          setHasMore(resp.data.hasMore);
        }
      })
  }

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
              <InfiniteScroll
                next={() => fetchData()}
                hasMore={hasMore}
                loader={<ArticleCard loading={true} />}
                dataLength={data.length}
                endMessage={
                  <div style={{ textAlign: 'center', padding: 20 }}>
                    <Typography.Text style={{ color: 'rgb(154, 163, 171)' }}>粤ICP备20011264号 ©2021 Created By Edison</Typography.Text>
                  </div>
                }
              >
                {data.length > 0 &&
                  <List
                    dataSource={data}
                    renderItem={(item) => (
                      <ArticleCard data={item} />
                    )}
                  />}
              </InfiniteScroll>
              <FloatButton.BackTop />
            </div>
            <Sidebar/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Container;