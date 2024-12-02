import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import { Character } from "./CharacterList";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;


function Logo() {
  return <div className="navbar__logo">logo🤩</div>;
}


export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      type="text"
      placeholder="search.."
    />
  );
}


export function SearchResult({ numOfResult }) {
  return <p className="navbar__result">found {numOfResult} results</p>;
}


export function Favorites({ favorites, onDeleteFavorite }) {
  
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>

      <Modal open={isOpen} onOpen={setIsOpen} title="List of Favorites">
        {favorites.map((item) => (
          <Character key={item.id} item={item}>
            {/* حالا ای میتونه چیلدرن های خاص خودو داشته باشه */}
            <button
              className="icon red"
              onClick={() => onDeleteFavorite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>

      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>

    </div>
  );
}
// export default function navBar() {}  اینم درسته