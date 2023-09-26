import {  LinkEntries } from "./components";

export default function ManageLinks() {
  return (
    <div className="mx-8 my-4 relative">
      <h4 className="text-2xl font-semibold text-gray-700">Links</h4>
      <hr />
      <LinkEntries/>
    </div>
  );
}
