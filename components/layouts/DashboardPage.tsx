import { PropsWithChildren } from "react";

type DashboardPageProps = {
  heading: string;
} & PropsWithChildren;

const DashboardPage = (props: DashboardPageProps) => {
  return (
    <div className="px-4 pb-10  md:px-10">
      <div className="my-5 flex items-center">
        <span className="flex-grow border-b" />
        <h4 className="px-4 text-xl font-semibold">{props.heading}</h4>
        <span className="flex-grow border-b" />
      </div>
      {props.children}
    </div>
  );
};

export default DashboardPage;
