import { Input } from "antd";

const { Search } = Input;
export default function SearchBar() {
  return (
    <div>
      <Search
        className=""
        placeholder="input search text"
        enterButton="Search"
        size="large"
        loading
      />
    </div>
  );
}
