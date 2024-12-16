import { FC } from "react";

const styles ={
    searchContainer: `hidden sm:flex`,

}
const SearchAndButtons: FC = ({}) => (
  <div className={`search_buttons_container ${styles.searchContainer}`}>
    <div className="search">search here</div>
    <div>login or icons here</div>
  </div>
);

export default SearchAndButtons;
