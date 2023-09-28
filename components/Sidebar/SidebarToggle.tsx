type SidebarToggleProps = {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarToggle = ({ toggled, setToggled }: SidebarToggleProps) => {
  return (
    <>
      <label
        htmlFor="sidebarToggle"
        className="absolute -right-10 z-0 top-10 rounded-tr-md rounded-br-md w-10 h-10 bg-white flex flex-col gap-[0.3rem] cursor-pointer justify-center items-center shadow-md"
      >
        <span
          className={`w-3 h-[0.15rem] bg-gray-700 block transition-all duration-200 ${
            toggled ? "-rotate-45" : "rotate-45"
          }`}
        ></span>
        <span
          className={`w-3 h-[0.15rem] bg-gray-700 block transition-all duration-200 ${
            toggled ? "rotate-45" : "-rotate-45"
          }`}
        ></span>
      </label>
      <input
        type="checkbox"
        className="hidden"
        id="sidebarToggle"
        value={toggled ? "on" : "off"}
        onClick={() => setToggled(!toggled)}
      />
    </>
  );
};

export default SidebarToggle;
