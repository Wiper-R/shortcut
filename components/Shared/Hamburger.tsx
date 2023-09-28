const Hamburger = ({
  isToggled,
  setIsToggled,
}: {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <input
        type="checkbox"
        className="self-end w-0 h-0"
        id="hamburger"
        value={isToggled ? "on" : "off"}
        onClick={() => setIsToggled((v) => !v)}
      />
      <label
        htmlFor="hamburger"
        className="md:hidden relative cursor-pointer p-4"
      >
        <span className="block -translate-x-3 relative">
          <span
            className={`h-0.5 w-6 bg-black block absolute origin-center  transition duration-500 ease-in-out
               ${isToggled ? "rotate-45" : "-translate-y-2"}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black block absolute transition duration-500 ease-in-out
               ${isToggled ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black block absolute origin-center transition duration-500 ease-in-out
               ${isToggled ? "-rotate-45" : "translate-y-2"}`}
          ></span>
        </span>
      </label>
    </>
  );
};

export default Hamburger;
