//Have to create modual fro delete and update
//create update slice and sedding new data

import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {featchDeletingProduct} from "../../Redux/Reduser/ProductSliceReducer"
import { useState } from "react";

//Modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AdminAllProductsCard({product}){

    const [show, setShow] = useState(false);

    const handleDeleteClose = () => setShow(false);

    const handleDeleteConfime = async (productId) =>{

        setIsDeleted(false);
        await dispatch(featchDeletingProduct(productId));
        setIsDeleted(true)
    } 

    const [isDeleted, setIsDeleted] = useState(false)

    const dispatch = useDispatch()
    
    const handleDeleteClicked = () => {
        setShow(true);
    };
    
    if(isDeleted){
        return null
    }

    
    return(
        
        <Col xs="12" sm="6" md="5" lg="4" className="d-flex">


            <Modal show={show} onHide={handleDeleteClose}>
                
                {/* <Modal.Title>Modal heading</Modal.Title> */}
               
                <Modal.Body>هل انت متاكد من حذف المنح؟</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                    اغلاق
                </Button>
                <Button variant="primary" onClick={()=>handleDeleteConfime(product._id)}>
                    تاكيد
                </Button>
                </Modal.Footer>
            </Modal>
        <Card
            className="my-2"
            style={{
                width: "100%",
                height: "350px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#FFFFFF",
            }}>
            <Row className="d-flex justify-content-center px-2">
                <Col className=" d-flex justify-content-between">
                    <div className="d-inline item-delete-edit" onClick={handleDeleteClicked}>ازاله</div>
                    <Link to={`/admin/editproduct/${product._id}`} style={{ textDecoration: 'none' }}>
                        <div className="d-inline item-delete-edit">تعديل</div>
                    </Link>
                    
                </Col>
            </Row>
            <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                <Card.Img style={{ height: "228px", width: "100%" }} src={product.imageCover} />
                <Card.Body>
                    <Card.Title>
                        <div className="card-title">
                            {product.title}
                        </div>
                    </Card.Title>
                    <Card.Text>
                        <div className="d-flex justify-content-between">
                            <div className="card-rate">{product.ratingsQuantity}</div>
                            <div className="d-flex">
                                <div className="card-currency mx-1">₪</div>
                                <div className="card-price">{product.price}</div>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    </Col>
    )
}