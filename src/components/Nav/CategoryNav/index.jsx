import classnames from "classnames";
import styles from "./index.module.css";
import {NavLink, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

const CategoryNav = (props) => {
  const location = useLocation();

  return (
    <nav className={classnames(styles.viewNav, { [styles.top]: false })}>
      <div className={styles.navList}>
        <NavLink
          to={'/'}
          className={classnames(styles.navItem, { [styles.active]: location.pathname === '/' })}
          onClick={() => props.selected()}
        >
          <div>全部</div>
        </NavLink>
        {props.data && props.data.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={classnames(styles.navItem, { [styles.active]: location.pathname.indexOf(item.path) !== -1 })}
            onClick={() => props.selected(item)}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

CategoryNav.propTypes = {
  selected: PropTypes.func,
  data: PropTypes.array
}

export default CategoryNav;