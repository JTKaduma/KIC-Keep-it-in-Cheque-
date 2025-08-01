function SidebarButton({onTabClick, name}){
    return(
        <button type="button" onClick={() => onTabClick(name)} className="w-full text-2xl text-white text-left px-[3vw] py-[15px] cursor-pointer transition-colors ease-in hover:bg-blue-500 active:bg-blue-500/30">{name}</button>
    );
}

export default SidebarButton