export default function Menu({ links = [], onSelect }) {
  return (
    <div className="absolute mt-2 left-12  w-[10.5rem] rounded-[.5rem] bg-black  text-center z-50">
      <ul>
        {links.map((link) => (
          <li key={link.to} className="">
            <button
              onClick={() => onSelect && onSelect(link.to)}
              className="text-sm text-white cursor-pointer w-full h-10 hover:bg-gray-900 "
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}