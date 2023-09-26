import FormInput from "../Shared/FormInput";
import Tab from "../Tab";
import {} from "react-icons/bs";
import {BiLink} from "react-icons/bi";
import {PiQrCode} from "react-icons/pi";
import {BsPersonCheck} from "react-icons/bs";

const DemoForm = () => {
  return (
    <section className="relative sm:mx-6 md:mx-12 lg:mx-20 xl:mx-44 md:my-20">
      <div className="flex justify-center relative z-10">
        <Tab content="Short Link" icon={<BiLink />} />
        <Tab content="QR Code" icon={<PiQrCode />} />
      </div>
      <form className="bg-white flex flex-col space-y-4 p-5 lg:p-12 border-y-2 relative bottom-0.5 z-0 shadow sm:rounded-xl">
        <FormInput
          label="Long Url"
          placeholder="ex: https://www.your-long-url.com/short-it"
          id="long_url"
          name="long_url"
        />
        <div className="flex max-xl:space-y-4 max-xl:flex-col xl:justify-center xl:items-center">
          <div className="flex justify-center items-center xl:basis-2/4">
            <FormInput
              label="Domain"
              placeholder="LinkSwift.com"
              disabled={true}
              id="domain"
              name="domain"
            />
            <span className="text-3xl p-4 mt-8 font-extrabold">/</span>
          </div>

          <FormInput
            label="Sub Path (Optional)"
            placeholder="eg: my-link"
            id="subpath"
            name="subpath"
          />
        </div>

        <span className="bg-orange-100 px-4 py-2 text-lg text-orange-700 rounded-md flex space-x-2 lg:text-xl items-center">
          <BsPersonCheck />
          <span>Login to keep track of your shorten urls</span>
        </span>
        <button className="bg-primary text-white font-bold p-4 text-lg rounded-lg lg:text-xl">
          Shorten It!
        </button>
      </form>
    </section>
  );
};

export default DemoForm;
