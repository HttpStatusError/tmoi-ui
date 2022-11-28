import classnames from "classnames";
import styles from "./index.module.css";
import {Link, useLocation, useSearchParams} from "react-router-dom";

const FilterNav = () => {
  const location = useLocation();
  const [search] = useSearchParams();

  return (
    <nav className={classnames(styles.listNav)}>
      <ul className={classnames(styles.navList, styles.left)}>
        <li className={classnames(styles.navItem, { [styles.active]: search.get('sort') === null })}>
          <Link to={{ pathname: location.pathname }}>最新</Link>
        </li>
        <li className={classnames(styles.navItem, { [styles.active]: search.get('sort') === 'hottest' })}>
          <Link to={{ pathname: location.pathname, search: '?sort=hottest' }}>热门</Link>
        </li>
      </ul>
    </nav>
  )
}

export default FilterNav;