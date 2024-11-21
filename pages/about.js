/*********************************************************************************
 *
 * Name:       In Tae Chung
 *
 ********************************************************************************/

import { Image, Row, Col } from "react-bootstrap";
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Row>
        <Col lg={6}>
          <h5>About This Project.</h5>
          <p>
            This website uses Next.js and Bootstrap CSS to allow users to easily
            register, navigate, search, and store artworks under the collection
            of the MET.
          </p>
          <p>
            A account must be created by registering with a username and
            password to access the search function, which then will allow the
            user to save their favorite artworks as well as manage their search
            history.
            <br />
            The data regarding the artworks are discovered from an API provided
            by the MET ({" "}
            <Link
              href="https://metmuseum.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              https://metmuseum.github.io/
            </Link>{" "}
            ). Aside from using the search bar in the navigation bar, the{" "}
            <Link href="/search" rel="noreferrer">
              Advanced Search
            </Link>{" "}
            can be used to better filter the search results.
          </p>
        </Col>
        <Col lg={6}>
          <h5>
            <emphasis>About InTae Chung.</emphasis>
          </h5>
          <p>
            InTae Chung has built his fundamental programming skills while
            studying at Seneca College in Toronto, Ontario.
          </p>
          <p>
            He has found joy in creating new coding projects where he has
            improved his skills through his pursuit of efficient and effective
            solutions.
          </p>
          <p>
            <Link href="https://github.com/entae" target="_blank" rel="noreferrer">
              https://github.com/entae
            </Link>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image
            className="mx-auto d-block"
            style={{ width: "800px" }}
            fluid
            rounded
            src="https://entae.github.io/images/profile.jpg"
            alt="Picture of InTae with his back turned"
          />
          <br />
          <br />
        </Col>
      </Row>
    </>
  );
}
