import DashboardPage from "@/components/layouts/DashboardPage";
import buttonVariants from "@/components/ui/button";
import inputVariants from "@/components/ui/input";
import React from "react";

function Overview() {
  return (
    <DashboardPage heading="Tags">
      <div className="grid grid-cols-2 gap-14">
        <form className="flex flex-col gap-3">
          <h4 className="mb-5 text-lg font-bold">Create Tag</h4>
          <div>
            <label
              className="mb-1 inline-block text-sm font-medium text-gray-700"
              htmlFor="tagName"
            >
              Tag Name
            </label>
            <input type="text" className={inputVariants({})} id="tagName" />
          </div>
          <div>
            <label
              className="mb-1 inline-block text-sm font-medium text-gray-700"
              htmlFor="tagName"
            >
              Description
            </label>
            <textarea
              name=""
              id=""
              className={inputVariants({ className: "resize-none" })}
              rows={8}
            />
          </div>
          <button type="submit" className={buttonVariants({})}>
            Create
          </button>
        </form>
        <div className="flex flex-col overflow-auto">
          <div className="rounded border bg-primary p-4">
            <h6 className="text-lg font-semibold">Bulk Creation</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              dolorum et! Id aliquid officiis porro distinctio! Laudantium,
              libero. Tempore, architecto?
            </p>
          </div>
          <div className="rounded border bg-primary p-4">
            <h6 className="text-lg font-semibold">Bulk Creation</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              dolorum et! Id aliquid officiis porro distinctio! Laudantium,
              libero. Tempore, architecto?
            </p>
          </div>
          <div className="rounded border bg-primary p-4">
            <h6 className="text-lg font-semibold">Bulk Creation</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              dolorum et! Id aliquid officiis porro distinctio! Laudantium,
              libero. Tempore, architecto?
            </p>
          </div>
          <div className="rounded border bg-primary p-4">
            <h6 className="text-lg font-semibold">Bulk Creation</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              dolorum et! Id aliquid officiis porro distinctio! Laudantium,
              libero. Tempore, architecto?
            </p>
          </div>
          <div className="rounded border bg-primary p-4">
            <h6 className="text-lg font-semibold">Bulk Creation</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              dolorum et! Id aliquid officiis porro distinctio! Laudantium,
              libero. Tempore, architecto?
            </p>
          </div>
          <div className="rounded border bg-primary p-4">
            <h6 className="text-lg font-semibold">Bulk Creation</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              dolorum et! Id aliquid officiis porro distinctio! Laudantium,
              libero. Tempore, architecto?
            </p>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}

export default Overview;
