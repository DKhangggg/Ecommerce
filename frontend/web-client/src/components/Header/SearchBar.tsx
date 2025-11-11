import { Input } from "antd";

const { Search } = Input;
export default function SearchBar() {
  return (
    <div className="w-full">
      <Search
        className="w-full bg-white border-2 border-[rgba(185,123,72,0.2)] rounded-full px-5 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
        placeholder="input search text"
        enterButton="Search"
        size="large"
        loading={false}
      />
    </div>
  );
}
