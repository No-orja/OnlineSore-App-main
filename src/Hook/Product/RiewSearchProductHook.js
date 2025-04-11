import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { featchAllProduct, featchAllProductPage, featchProductSearch } from "../../Redux/Reduser/ProductSliceReducer";

/*🎯 خلاصة:
✔️ استخدم **مصفوفة مستقلة** عند الحاجة إلى تعديل مؤقت مثل البحث، التصفية، والتصنيفات.
✔️ استخدم **المصفوفة الأصلية** عند الحاجة إلى تعديل دائم مثل الإضافة، الحذف، أو تحديث البيانات.
Independent array: Search, Fillter, Catrgory, FavProduct
original array: Add,Delete, Update 
*/
export default function RiewSearchProductHook(){

    const [sort, setSort] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let limit = 40;
    const dispatch = useDispatch()

    const getProduct = async (word = "") => {
        setIsLoading(true);
    
        let updatedSort = storData();  // ✅ الحصول على القيمة المحدثة فورًا
        let queryCategory = localStorage.getItem("quertCategory") || "";
        let queryBrand = localStorage.getItem("quertBrand") || "";
    
        let finalQuery = `sort=${updatedSort}&limit=${limit}`;
        if (word) {
            finalQuery += `&title=${word}`;
        }
        if (queryCategory) {
            finalQuery += `&${queryCategory}`;
        }
        if(queryBrand){
            finalQuery += `&${queryBrand}`
        }
    
        console.log("🚀 استعلام البحث النهائي بعد الإصلاح:", finalQuery);
        await dispatch(featchProductSearch(finalQuery));
    
        setIsLoading(false);
    };
    
    
    useEffect(() => {
        setIsLoading(true);
        dispatch(featchAllProduct(limit)).then(() => setIsLoading(false));
    }, []);
    

    //Data we need 
    const searchedProduct = useSelector((state) => state.allProduct.searchResults);
    const allProduct = useSelector((state) => state.allProduct.allProduct);
    let seartch = searchedProduct?.data || [];
    console.log("🔎 نتائج البحث:", seartch);
    let item = seartch.length > 0 ? seartch : allProduct.data;
    let pagination = allProduct?.paginationResult?.numberOfPages || [];
    
    //Pagenation
    const onPress = async (page) => {
        // setIsLoading(true); 
        // console.log("📄 تحميل صفحة:", page);
        // await dispatch(featchAllProductPage({limit, page}));
        // setIsLoading(false);
    };
    
    //When user choose store type
    const storData = () => {
        const sortType = localStorage.getItem("sortType") || "";
        let newSort = "";
    
        switch (sortType) {
            case "السعر من الاقل للاعلى":
                newSort = "+price";
                break;
            case "السعر من الاعلى للاقل":
                newSort = "-price";
                break;
            case "الاكثر مبيعا":
                newSort = "-sold";
                break;
            case "الاعلي تقييما":
                newSort = "-quantity";
                break;
            default:
                newSort = "";
        }
        return newSort; 
    };

    //Problem I faced in storeData():
    // لما كنت تستخدم setSort(newSort) داخل storData()، كان setSort() يؤدي إلى إعادة تحديث (re-render) قبل ما يتم إرسال البيانات لـ getProduct().
    // بما أن setSort() لا يحدث فورًا (لأنه غير متزامن)، كان getProduct() يأخذ القيمة القديمة لـ sort بدل الجديدة.
    // فكل مرة تنقر على طريقة ترتيب جديدة، القيمة التي يتم إرسالها إلى البحث (getProduct()) هي القيمة السابقة وليس الحالية.
    //**************  كيف حلينا المشكلة؟*******************
    //الحل كان أن نخلي storData() يرجع القيمة مباشرة (return newSort) بدون setSort()، وبدل ذلك، نستخدم storData() مباشرة داخل getProduct().
    //🔹 هيك getProduct() بياخذ القيمة الجديدة فورًا بدون انتظار setSort()، وما بصير re-render غير لما يكون مطلوب!
   
    return [allProduct,item,pagination, onPress, getProduct, seartch, isLoading] 
}