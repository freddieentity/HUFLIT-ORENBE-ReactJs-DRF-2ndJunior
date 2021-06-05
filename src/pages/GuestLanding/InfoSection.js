import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";

export const infoData = {
  heading: "THE RITZ-CARLTON CLUB® LEVEL GUESTS ENJOY:",
  paragraphOne: `Club Lounge check-in and check-out
  Complimentary enhanced wireless Internet access
  A dedicated concierge who can assist in making reservations for dinner, a theatre show, concert, local tour, arranging transportation, or anything you may require during your stay`,
  paragraphTwo: `Continuous complimentary culinary offerings throughout the day (breakfast, light snacks, hors d'oeuvres, alcoholic beverages and sweets.)
  Complimentary garment pressing of up to two pieces per day`,
  buttonLabel: "Immerse",
  image:
    "https://s7d2.scene7.com/is/image/ritzcarlton/yyzrz-lounge-50665681?$XlargeViewport100pct$",
  reverse: false,
  delay: 100,
};

export const infoDataTwo = {
  heading: "THE RITZ-CARLTON CLUB",
  paragraphOne:
    "The Ritz Club and its swimming pool are part of the Ritz Paris legend. The state-of-the-art fitness facilities, sauna and Turkish bath ensure an optimal wellness environment.",
  paragraphTwo:
    "A blend of excellence and absolute well-being, the Ritz Club offers signature treatments with incomparable virtues.",
  buttonLabel: "Experience",
  image: "https://www.ritzparis.com/sites/default/files/escalierritzclub_0.jpg",
  reverse: true,
  delay: 300,
};

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 4rem 0rem;
`;
const Container = styled.div`
  padding: 3rem calc((100vw - 1300px) / 2);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 800px;

  @media screen add (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  line-height: 1.4;
  padding: 1rem 2rem;
  order: ${({ reverse }) => (reverse ? "2" : "1")};

  h1 {
    margin-bottom: 1rem;
    font-size: clamp(1.5rem, 6vw, 2rem);
  }

  p {
    margin-bottom: 2rem;
  }
`;
const ColumnRight = styled.div`
  padding: 1rem 2rem;
  order: ${({ reverse }) => (reverse ? "1" : "2")};
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen add (max-width: 768px) {
    order: ${({ reverse }) => (reverse ? "2" : "1")};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media screen add (max-width: 768px) {
      width: 90%;
      height: 90%;
    }
  }
`;

function InfoSection() {
  return (
    <>
      <Section>
        <Container>
          <ColumnLeft>
            <h1>{infoData.heading}</h1>
            <p>{infoData.paragraphOne}</p>
            <p>{infoData.paragraphTwo}</p>
            <Button to="/homes" primary="true">
              {infoData.buttonLabel}
            </Button>
          </ColumnLeft>
          <ColumnRight reverse={infoData.reverse}>
            <img src={infoData.image} alt="home" />
          </ColumnRight>
        </Container>
      </Section>
      <Section>
        <Container>
          <ColumnRight reverse={infoDataTwo.reverse}>
            <img src={infoDataTwo.image} alt="home" />
          </ColumnRight>
          <ColumnLeft>
            <h1>{infoDataTwo.heading}</h1>
            <p>{infoDataTwo.paragraphOne}</p>
            <p>{infoDataTwo.paragraphTwo}</p>
            <Button to="/homes" primary="true">
              {infoDataTwo.buttonLabel}
            </Button>
          </ColumnLeft>
        </Container>
      </Section>
    </>
  );
}

export default InfoSection;
