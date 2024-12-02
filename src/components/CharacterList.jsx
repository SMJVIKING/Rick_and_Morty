import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
import { Children } from "react";

function CharacterList({
  selectedId,
  characters,
  isLoading,
  onSelectCharacter,
}) {
  if (isLoading)
    return (
      <div className="Character-list">
        <Loader />
      </div>
    );

  return (
    <div className="Character-list">
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
        >
          {/* ببین ما تو قسمت مدال میخواستیم این باتن نمایش داده نشه */}
          {/* واسه همین اینو ب صورت چیلدرن ب اون کرکتر پاس دادیم  */}
          <button
            className="icon red"
            onClick={() => onSelectCharacter(item.id)}
          >
            {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}
export default CharacterList;


export function Character({ children, item }) {
  return (
    <div className="list__item">
      <img src={item.image} alt="" />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "🧑🏻" : "👩🏻"}</span>
      <span>&nbsp;{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span>&nbsp;{item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
}
