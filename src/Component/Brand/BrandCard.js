import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function BrandCard({img, id}){
    return(
        <Col
            xs="6"
            sm="6"
            md="4"
            lg="2"
            className="my-2 d-flex justify-content-center"
        >
            <Card
                className="my-1"
                style={{
                    width: "100%",
                    height: "151px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                }}>
                <Link to={`/products/brand/${id}`}>
                    <Card.Img style={{ width: "100%", height: "151px" }} src={img} />            
                </Link>
            </Card>
        </Col>
    )
}