import { useAtom } from 'jotai';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { favouritesAtom } from '../store';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if(!favouritesList) return null;
  

  return (
    <>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((objID) => (
            <Col lg={3} sm={6} key={objID}>
              <ArtworkCard objectID={objID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>
              <h4>Nothing Here</h4>
              Try adding some new artwork to the list.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
