import { useEffect, useState } from "react"
import RiewSearchProductHook from "../Product/RiewSearchProductHook"
import { debounce } from "lodash";

export default function NavBarSearchHook(){

    const [allProduct,item,pagination, onPress, getProduct, seartch, isLoading] = RiewSearchProductHook()

    const [searchWord, setSearchWord] = useState('')

    //Method to get the search word from the user
    const onSearchWord = (e) => {
        setSearchWord(e.target.value)
    }

    // Methon to move to the products page when the user click on the search bar,
    // we don't use link because navBar is not a route(outside the BrowserRouter)
    const onClickSearchBar = () => {
        const path = window.location.pathname
        if(path !== '/products'){
            window.location.href = "/products"
        }
    }
    // دالة البحث مع تأخير التنفيذ حتى يتوقف المستخدم عن الكتابة لمدة 500ms
    const debouncedSearch = debounce(() => {
        getProduct(searchWord);
    }, 500);

    useEffect(() => {
        debouncedSearch(); // تشغيل البحث بعد التأخير
        return () => debouncedSearch.cancel(); // تنظيف عند إلغاء التأثير
    }, [searchWord]);

    return [onSearchWord, searchWord, onClickSearchBar]
}