import classnames from "classnames";
import styles from "./index.module.css";
import {NavLink, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

const TagNav = (props) => {
  const location = useLocation();

  return (
    <div>
      <ul className={classnames(styles.navList, styles.tagList)}>
        <NavLink
          to={`${props.categoryPath}`}
          className={classnames(
            styles.navItem,
            styles.tag,
            { [styles.active]: location.pathname === props.categoryPath }
          )}
        >
          全部
        </NavLink>
        {props.data.map((item, idx) => (
          <NavLink
            key={idx}
            to={{pathname: `${props.categoryPath}/${item.label}`}}
            className={classnames(
              styles.navItem,
              styles.tag,
              { [styles.active]: decodeURIComponent(location.pathname).indexOf(item.label) !== -1 }
            )}
          >
            {item.label}
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

TagNav.propTypes = {
  data: PropTypes.array,
  categoryPath: PropTypes.string,
  selected: PropTypes.func
}

export default TagNav;