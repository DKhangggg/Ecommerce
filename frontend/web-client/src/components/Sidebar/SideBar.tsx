export function SideBar() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg h-fit lg:sticky lg:top-4">
      <h2 className="text-lg font-bold mb-4">Danh mục</h2>
      <ul className="space-y-2">
        <li className="hover:text-blue-600 cursor-pointer">Danh mục 1</li>
        <li className="hover:text-blue-600 cursor-pointer">Danh mục 2</li>
        <li className="hover:text-blue-600 cursor-pointer">Danh mục 3</li>
      </ul>
    </div>
  );
}
