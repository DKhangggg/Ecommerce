import { Input } from "antd";

const { Search } = Input;
export default function SearchBar() {
  return (
    <div className="header-search">
      <Search
        className="w-full"
        placeholder="input search text"
        enterButton="Search"
        size="large"
        loading={false}
      />
    </div>
  );
}
