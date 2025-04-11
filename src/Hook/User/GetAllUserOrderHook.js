import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllUserOrder } from "../../Redux/Reduser/CheckOutSliceReducer";

export default function GetAllUserOrderHook() {
    const dispatch = useDispatch();
    const user =JSON.parse(localStorage.getItem("user"))
    console.log("The user",user)
    let userName = ""
    if(user != null){
        userName = user.name
    }
    useEffect(() => {
        const  get = async () => {
            await dispatch(getAllUserOrder()) 
        }
        get()
    },[])
    const isLoading = useSelector(state=>state.userOreder.isLoading)
    const resAllOrder = useSelector(state=>state.userOreder.getAllUserOrder)

    const allOrders = resAllOrder?.data || [];
    const pageCount = resAllOrder?.pagination?.totalPages || { totalPages: 1, currentPage: 1 };
    
    const getPage = (page) => {
        
    }
    return [userName, isLoading, allOrders, pageCount, getPage]
}