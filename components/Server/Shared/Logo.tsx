import { Sriracha } from "next/font/google";
const sriracha = Sriracha({ weight: "400", subsets: ["latin"] });

const Logo = () => {
  return (
    <span className={`text-primary ${sriracha.className} text-3xl`}>
      LinkSwift
    </span>
  );
};

export default Logo;
