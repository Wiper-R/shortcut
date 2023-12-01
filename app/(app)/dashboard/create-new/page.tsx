"use client";

import DashboardPage from "@/components/layouts/DashboardPage";
import { Tabs } from "@/components/ui/Tab";
import { useState } from "react";
import { CreateBatchLink } from "./CreateBatchLink";
import CreateSingleLink from "./CreateSingleLink";

const CreateNewPage = () => {
  const [selectedTab, setSelected] = useState("single");

  return (
    <DashboardPage heading="Create New Link">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 bg-white px-3">
        <div>
          <label
            htmlFor=""
            className="mb-2 block text-base font-medium text-gray-700"
          >
            Select Mode:
          </label>
          <Tabs
            selected={selectedTab}
            setSelected={setSelected}
            tabs={[
              { label: "Single", value: "single" },
              { label: "Batch", value: "batch" },
            ]}
          />
        </div>
        <hr className="my-3" />
        {selectedTab == "single" ? <CreateSingleLink /> : <CreateBatchLink />}
      </div>
    </DashboardPage>
  );
};

export default CreateNewPage;
