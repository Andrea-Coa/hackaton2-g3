import React, {useState, useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "react-bootstrap";
import "./InfinitScroll.css";

const InfinitScroll = () => {
  const [characters, setCharacters] = useState([]);
  const [infoPage, setInfoPage] = useState({});

  const GetList = (page, url) => {
    let uri = 
        page === null
        ? url
        : "https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/items?limit={limit}&lastKey={lastKey}";
    fetch(uri)
        .then((response) => response.json())
        .json((data) => {
            console.log("Se solicito información", data.results);
            let newData = characters.concat(data.results);
            setCharacters(newData);
            setInfoPage(data.info);
        });
  };

  UseEffect(() => {
    GetList(1, null);
  }, []);

  return <div className="infinite-scroll-container" id="InfiniteScroll">
    {infoPage !== null ? (
        <InfiniteScroll
            dataLength={characters.length}
            next={() => {
                GetList(null, infoPage.next, null);
            }}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="InfiniteScroll"
        >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <img 
                                        src={item.image} 
                                        className="table-pagination-image"
                                        alt = "foto"
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.species}</td>
                                <td>{item.gender}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </InfiniteScroll>
    ) : (
     ""
    )}
  </div>
};

export default InfinitScroll;