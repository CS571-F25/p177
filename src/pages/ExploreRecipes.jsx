import NavigationBar from "../navigation/NavigationBar";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import japaneseRecipes from "../data/japanese_recipies.json";
import FoodCard from "../components/FoodCard";
export default function ExploreRecipes(props){
    console.log(japaneseRecipes);
    return<div>
        <NavigationBar />
        <h1>Explore recipes Page!</h1>
        <Container fluid>
            <Row>
                {
                japaneseRecipes.map(jr => <Col key={jr.id} xs={12} lg={6} xl={4} xxl={3}> <FoodCard {...jr}/> </Col> )
                }
            </Row>
        </Container>
    </div>
}