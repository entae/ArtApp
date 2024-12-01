import useSWR from "swr";
import { useState, useEffect } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";
import validObjectIDList from "@/public/data/validObjectIDList.json";

const PER_PAGE = 8;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const router = useRouter();
  const [page, setPage] = useState(1);

  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function handlePage(page) {
    setPage((p) => page);
  }

  useEffect(() => {
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );
      const results = [];

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList) {
    let lastPage = artworkList.length;
    return (
      <>
        {lastPage > 0 ? (
          <Row className="gy-4">
            {artworkList[page - 1]?.map((objID) => (
              <Col lg={3} sm={6} key={objID}>
                <ArtworkCard objectID={objID} />
              </Col>
            ))}
          </Row>
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>
                <h4>Nothing Here</h4>Try searching for something else.
              </Card.Text>
            </Card.Body>
          </Card>
        )}

        {lastPage > 0 && (
          <Row>
            <Col className="d-flex justify-content-center p-4">
              <br />
              <Pagination>
                {page > 2 && <Pagination.First onClick={() => handlePage(1)} key="first" />}
                {page > 1 && (
                  <Pagination.Prev onClick={() => handlePage(page - 1)} key={`prev${page}`} />
                )}

                {page > 2 && (
                  <Pagination.Item onClick={() => handlePage(page - 2)} key={`page-${page - 2}`} >
                    {page - 2}
                  </Pagination.Item>
                )}
                {page > 1 && (
                  <Pagination.Item onClick={() => handlePage(page - 1)} key={`page-${page - 1}`} >
                    {page - 1}
                  </Pagination.Item>
                )}

                {/* Current Page */}
                <Pagination.Item
                  active
                  tabIndex={0}
                  aria-current="page"
                  key={`current-page-${page}`}
                >
                  {page}
                </Pagination.Item>

                {page < lastPage && (
                  <Pagination.Item onClick={() => handlePage(page + 1)} key={`page-${page + 1}`} >
                    {page + 1}
                  </Pagination.Item>
                )}
                {page < lastPage - 1 && (
                  <Pagination.Item onClick={() => handlePage(page + 2)} key={`page-${page + 2}`} >
                    {page + 2}
                  </Pagination.Item>
                )}

                {page < lastPage && (
                  <Pagination.Next onClick={() => handlePage(page + 1)} key={`next${page}`} />
                )}
                {page < lastPage - 1 && (
                  <Pagination.Last onClick={() => handlePage(lastPage)} key="last" />
                )}
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    );
  } else {
    return null;
  }
}
