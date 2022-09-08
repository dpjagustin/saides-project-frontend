import React from "react";
import NavBar from "../components/NavBar";
import CargaComida from "../components/comida/CargaComida";
import Calendario from "../components/comida/Calendario";
import Footer from "../components/Footer";
import { Grid, GridItem } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";


export default function Comida() {
  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gap="50"
        fontWeight="bold"
      >
        <GridItem area={"header"}>
          <NavBar />
        </GridItem>
        <GridItem pl="2" bg="" area={"nav"}>
          <Center>
            <CargaComida />
          </Center>
        </GridItem>
        <GridItem pl="2" bg="" area={"main"}>
          <Center>
            <Calendario />
          </Center>
        </GridItem>
        <GridItem pl="2" bg="" area={"footer"}>
          <Center>Footer</Center>
        </GridItem>
      </Grid>

      <Footer />
    </>
  );
}
