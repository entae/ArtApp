import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ArtworkCard from '@/components/ArtworkCard';
import Error from 'next/error';
import validObjectIDList from '@/public/data/validObjectIDList.json'

const PER_PAGE = 12;

export default function Artwork() {

  const [artworkList, setArtworkList] = useState();
  const router = useRouter();
  const [page, setPage] = useState(1);

  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  function handlePage(page) {
    setPage(p => page);
  }

  useEffect(() => {

    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      const results = [];

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
        }

      setArtworkList(results);
      setPage(1);

    }

  }, [data])

  if (error) {
    return <Error statusCode={404} />
  }

  if (artworkList) {
    return (
      <>

        {artworkList.length > 0 ?

          <Row className="gy-4">{artworkList[page - 1]?.map(objID => (
            <Col lg={3} key={objID}><ArtworkCard objectID={objID} /></Col>
          ))}</Row>

          :

          <Card>
            <Card.Body>
              <Card.Text>
                <h4>Nothing Here</h4>Try searching for something else.
              </Card.Text>
            </Card.Body>
          </Card>

        }

        {artworkList.length > 0 && <Row>

          <Col className="d-flex justify-content-center p-4">
            <br />
            <Pagination>
              {page > 1 && <Pagination.Prev onClick={() => handlePage(page - 1)} />}
              <Pagination.Item>{page}</Pagination.Item>
              {page < artworkList.length && <Pagination.Next onClick={() => handlePage(page + 1)} />}
            </Pagination>
          </Col>
        </Row>

        }
      </>
    )
  } else {
    return null;
  }
}