import { Row, Spinner } from "react-bootstrap";
import AdminAllOrdersItem from "./AdminAllOrdersItem";
import GetAllUserOrderHook from "../../Hook/User/GetAllUserOrderHook";
import CartImpty from "../../Image/CartImpty.png"
export default function AdminAllOrders(){

    const [userName, isLoading, allOrders, pagination] = GetAllUserOrderHook()
    
    return(
        <div>
            <div className='admin-content-text'>ادارة جميع الطلبات</div>
            <Row className='justify-content-start'>
                {
                    isLoading ? (
                        <div style={{
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            minHeight: "80vh"
                        }}>
                            <Spinner animation="border" role="status" style={{
                                width: "3rem", 
                                height: "3rem", 
                                color: "#3F4F44",
                                borderWidth: "0.4rem"
                            }} />
                        </div>
                    ) :(
                        allOrders.length >= 1 ? (
                            allOrders.map((item, index) => {
                                return <AdminAllOrdersItem key={index} item={item} />
                            })   
                        ) :  (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <img src={CartImpty} alt="No Brand" style={{ width: "400px", height: "auto"}} />
                                <p  className="empty">لا يوجد طلبات</p>
                            </div>   
                   
                        )
                    )
                }
            </Row>
        </div>
    )
}