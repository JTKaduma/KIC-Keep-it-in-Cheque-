function SidebarButton({ onTabClick, name, icon }) {
  return (
    <>
      <button
        type="button"
        onClick={() => onTabClick(name)}
        className="w-full flex flex-row items-center lg: gap-x-3 text-2xl text-white text-left px-[3vw] py-[15px] cursor-pointer transition-colors ease-in hover:bg-blue-500 active:bg-blue-500/30"
      >
        <div>{icon}</div>
        <div className="hidden lg:block">{name}</div>
      </button>
    </>
  );
}

export default SidebarButton;
