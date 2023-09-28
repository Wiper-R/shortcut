import EditLinkModal from "@/components/EditLinkModal";
import LinksContainer from "@/components/LinksContainer";
import EditLinkContextProvider from "@/contexts/edit-link-context";

export default function Dashboard_Links() {
  return (
    <div className="mx-14 my-4 h-full">
      <h4 className="text-2xl font-semibold text-gray-700">Links</h4>
      <hr />
      <EditLinkContextProvider>
        <LinksContainer />
        <EditLinkModal/>
      </EditLinkContextProvider>
    </div>
  );
}
