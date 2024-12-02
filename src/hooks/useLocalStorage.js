// دیتاهایی ک تو سایت نیازه تو لوکال استوریج سیو بشن زیادن
// در حالت عادی پس ینی قراره کدهای تکراری زیادی هم داشته باشیم
// ب جای اینکار از کاستوم هوک استفاده میکنیم
import { useState, useEffect } from "react";

// dynamic code :
// key => instead "FAVORITES"
// [value,setValue] => instead [Favorites,setFavorites]
// intialState => instead []

function useLocalStorage(key, intialState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || intialState
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  // اینجا ترتیب مهمه اول state بعد setStae => چون ارایه هس
  // چرا ب جای فوریت و ست فوریت از ولیو استفاده کردیم؟
  // چون ممکنه ب جای ولیو هر مقداری رو بخایم تو لوکال استوریج سیو کنیم ینی فقط موردعلاقه ها نباشن
  return [value, setValue];
  // چیزی رو ریترن میکنیم ک کامپوننت اپ بهش نیاز داره مثلا 
}

export default useLocalStorage;
