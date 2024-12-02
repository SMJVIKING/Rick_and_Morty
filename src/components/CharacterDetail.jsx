import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

function CharacterDetail({
  selectedId,
  setSelectedId,
  onAddFavorites,
  isAddToFavorites,
}) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  // fetch data from back-end:
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        //////////////////////////////////
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        // نکته مهم این قسمت پایین صفحه :
        setEpisodes([episodeData].flat().slice(0, 6));
        // console.log(episodeData);

        // setIsLoading(false);
      } catch (err) {
        // setIsLoading(false);
        toast.error(err.response.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) getData();
  }, [selectedId]);

  // eariliery return :
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        please select a character
      </div>
    );

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        isAddToFavorites={isAddToFavorites}
        onAddFavorites={onAddFavorites}
      />
      <EpisodeList episodes={episodes}/>
    </div>
  );
}
export default CharacterDetail;

function CharacterSubInfo({ character, isAddToFavorites,onAddFavorites }) {
  return (
    <div className="character-detail">
      <img
        className="character-detail__img"
        src={character.image}
        alt={character.name}
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "🧑🏻" : "👩🏻"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <p>Last Known Location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavorites ? (
            <p>This already added to Favorites✅</p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavorites(character)}
            >
              add to Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  // چرا ما اینجا ب جای استرینگ از استیت استفاده کردیم؟
  // چون اینجا مث سلکت اپشن نیس ک همه گزینه هارو داشته باشیم
  // بلکه باید سوییچ کنیم بین دیتاهای=> earlist,latest 

  // earliest => ascending => from oldest to newest =>soudi
  const [sortBy, setSortBy] = useState(true);

  // چرا این متغیر استیت نیس؟چون براساس استیت های دیگه بدست میاد
  // drived state:
  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>

      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} :
              <strong> {item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}



// {String(index + 1).padStart(2, "0")} =>
// متد پد استارت برای استرینگ کار میکنه و
//  باعث میشه عدد دوحرفی باشه و اگه تک رقمی بود قبلش صفر بیاد
/////////////////////////////////////////////////////////////////

// نکته: اینجا وقتی اپیزودهارو نشون میده کاراکتر اول اپیزودهاش ب صورت ارایه ای از ابجکت هاست
// ولی کاراکتر های بعدی ابجکتن و ارور کنسول هم ایجاد میکنند برای اینکه همه اپیزودهای خروجی
// ارایه بشن ما نتیجه رو در ارایه قرار میدیم و چون ممکنه بعضی از اپیزودها ب صورت ارایه تودرتو
// ایجاد بشن از متد فلت جاوااسکریپت استفاده میکنیم تا اون ارایه تودرتو رو ب یک ارایه تبدیل کنه

// چرا خروجی باید ارایه باشه؟ چون بعدا اگه لازم شد روش مپ بزنیم بتونیم اینکارو بکنیم
// مپ رو روی ارایه میشه زد

// setEpisodes([episodeData].flat().slice(0,6));
