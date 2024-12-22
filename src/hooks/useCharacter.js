// custom hook:
// حالا هر جا بخای کرکتر هارو بیاری فقط لازمه اونجا این 
// کاستوم هوک رو فراخوانی بکنی ن اینکه کل کد رو دوباره بنویسی

// نکته: ولی هرچن بار هر چن جا ک اینو فراخوانی کنی 
// رفتارش میتونه متفاوته باشه دلیل براین نیس ک همشون رفتارشون مشابهه

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect,useState } from "react";

function useCharacter(query) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
          try {
            setIsLoading(true);
            //1. destructor data from response object:
            // 2.delete if
            // 3.we don't need json in axios=>data's are json automaticly
            const { data } = await axios.get(
              `https://rickandmortyapi.com/api/character/?name=${query}`
            );
            setCharacters(data.results.slice(0, 5));
          } catch (err) {
            setCharacters([]);
            toast.error(err.response.error);        
          } finally {
            setIsLoading(false);
          }
        }
    
        if (query.length < 2) {
          // اگر خواستی در لود اولیه دیتارو نشون ندی
          //  و کاربر مجبور بشه سرچ کنه تا دیتارو سرچ کنه تا پیدا کنه اینو بزن:
          setCharacters([]);
          return;
        }
        fetchData();
      }, [query]);   
      
      // اینجا ترتیب قرارگیریشون مهم نیس چون ابجکته
      return {isLoading,characters};
}

export default useCharacter;