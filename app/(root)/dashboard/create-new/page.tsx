import CreateNewLinkForm from "@/components/CreateNewLinkForm";

export default function Dashboard_CreateNew() {
  return (
    <div className="bg-white h-full px-8 py-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h4 className="text-2xl font-semibold text-gray-700">
          Create New Link
        </h4>
        <hr className="my-2" />
        <CreateNewLinkForm />
      </div>
    </div>
  );
}