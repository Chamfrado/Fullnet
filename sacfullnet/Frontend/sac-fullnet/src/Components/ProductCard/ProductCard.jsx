import React from "react"
import { Card, CardBody, CardTitle } from "reactstrap";

import LogoPng from "../../Resources/image.png";

const ProductCard = () => {
    return (
        <Card className="bg-primary" style={{  cursor: "pointer" }}  >

            <img
                id="equip1"
                style={{ width: "100%", cursor: "pointer", padding: 10 }}
                src={LogoPng}
                alt="Logo"
            />
            <CardBody>
                <CardTitle tag="h5">
                    Equipamento 1
                </CardTitle>
            </CardBody>
            




        </Card>
    )
}

export default ProductCard;