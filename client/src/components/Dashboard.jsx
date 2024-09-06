import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  FormLabel,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import { useNavigate } from "react-router-dom";
import {
  AddBlogItems,
  checkToken,
  GetItemsByUserId,
  LoggedInData,
  updateBlogItems,
} from "../Services/DataService";

const Dashboard = ({ isDarkMode, onLogin }) => {
  // useStates

  const [show, setShow] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTags, setBlogTags] = useState("");

  const [edit, setEdit] = useState(false);

  const [userId, setUserId] = useState(0);
  const [publisherName, setPublisherName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [blogId, setBlogId] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // copied from slack
  const [blogItems, setBlogItems] = useState([]);

  const handleSave = async ({ target: { textContent } }) => {
    let { userId, publisherName } = LoggedInData();
    const published = {
      Id: edit ? blogId : 0,
      UserId: userId,
      PublisherName: publisherName,
      Tag: blogTags,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Date: new Date(),
      Category: blogCategory,
      IsPublished:
        textContent === "Save" || textContent == "Save Changes" ? false : true,
      IsDeleted: false,
    };
    console.log(published);
    handleClose();

    // handel edit function
    let result = false;
    if (edit) {
      result = await updateBlogItems(published);
    } else {
      result = await AddBlogItems(published);
    }

    if (result) {
      let userBlogItems = await GetItemsByUserId(userId);
      setBlogItems(userBlogItems);
      console.log(userBlogItems, "This is from our UserBlogItems in Dashboard");
    } else {
      alert(`Blog items not ${edit ? "Updated" : "Added"}`);
    }
  };

  // going to refactor our code and not use this
  // const handleSaveWithUnpublish = async () => {
  //   let { userId, publisherName } = LoggedInData();
  //   const notPublished = {
  //     Id: 0,
  //     UserId: userId,
  //     PublisherName: publisherName,
  //     Tag: blogTags,
  //     Title: blogTitle,
  //     Image: blogImage,
  //     Description: blogDescription,
  //     Date: new Date(),
  //     Category: blogCategory,
  //     IsPublished: false,
  //     IsDeleted: false,
  //   };
  //   console.log(notPublished);
  //   handleClose();
  //   let result = await AddBlogItems(notPublished);
  //   if (result) {
  //     let userBlogItems = await GetItemsByUserId(userId);
  //     setBlogItems(userBlogItems);
  //     console.log(userBlogItems, "This is from our UserBlogItems in Dashboard");
  //   }
  // };

  const handleClose = () => setShow(false);

  // handleShow
  const handleShow = (
    e,
    {
      id,
      publishername,
      userId,
      IsDeleted,
      isPublished,
      title,
      description,
      category,
      tag,
      image,
    }
  ) => {
    setShow(true);

    if (e.target.textContent === "Add Blog Item") {
      setEdit(false);
      // setBlogTitle(title);
      // setBlogDescription(description);
      // setBlogCategory(category);
      console.log(e.target.textContent, edit);
    } else {
      setEdit(true);
    }

    // moved outside of the else statement above
    setBlogId(id);
    setBlogTitle(title);
    setUserId(userId);
    setPublisherName(publishername);
    setBlogDescription(description);
    setBlogCategory(category);
    setBlogTags(tag);
    setBlogImage(image);
    setIsDeleted(IsDeleted);
    setIsPublished(isPublished);
    console.log(e.target.textContent, edit);
  };

  const handleTitle = (e) => {
    setBlogTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setBlogDescription(e.target.value);
  };
  const handleTags = (e) => {
    setBlogTags(e.target.value);
  };
  const handleCategory = (e) => {
    setBlogCategory(e.target.value);
  };
  //   const handleImage = (e) => {
  //     setBlogImage(e.target.value);
  //   };
  ////
  const handleImage = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setBlogImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // function to help us handle publish and unpublish
  const handlePublish = async (item) => {
    // by using curly braces around userId we destructure the UserData and grab only userId  and we dont have to say  variable.userId in our GetItemsByUserId (  here )
    const { userId } = JSON.parse(localStorage.getItem("UserData"));
    item.isPublished = !item.isPublished;

    let result = await updateBlogItems(item);
    if (result) {
      let userBlogItems = await GetItemsByUserId(userId);
      setBlogItems(userBlogItems);
    } else {
      alert(`Blog item not ${edit ? "Updated" : "Added"}`);
    }
  };

  // our delete function
  const handleDelete = async (item) => {
    // remember we are not actually deleting we're just seting the usestate to true or false
    item.isDeleted = !item.isDeleted;
    let result = await updateBlogItems(item);
    if (result) {
      let userBlogItems = await GetItemsByUserId(item.userId);
      setBlogItems(userBlogItems);
    } else {
      alert(`Blog item not ${edit ? "Updated" : "Added"}`);
    }
  };

  // navigate variable for use
  let navigate = useNavigate();

  // load userData to fetch data
  const loadUserData = async () => {
    let userInfo = LoggedInData();
    onLogin(userInfo);
    setUserId(userInfo.userId);
    setPublisherName(userInfo.publisherName);
    console.log("userInfo: ", userInfo);
    setTimeout(async () => {
      let userBlogItems = await GetItemsByUserId(userInfo.userId);
      setBlogItems(userBlogItems);
      setUserId(userId);
      setIsLoading(false);
      console.log("Loaded blog items: ", userBlogItems);
    }, 1000);
  };

  // useEffect for forcing navigation  since it fires 'on load'
  useEffect(() => {
    if (!checkToken()) {
      navigate("/Login");
    } else {
      loadUserData();
    }
  }, []);

  return (
    <>
      <Container
        data-bs-theme={isDarkMode ? "dark" : "light"}
        className={isDarkMode ? "bg-dark text-light p-5" : "bg-light p-5"}
        fluid
      >
        <Button
          variant="outline-primary m-2"
          onClick={(e) =>
            handleShow(e, {
              id: 0,
              userId: userId,
              title: "",
              description: "",
              category: "",
              tag: "",
              image: "",
              IsDeleted: false,
              isPublished: false,
              publishername: publisherName,
            })
          }
        >
          Add Blog Item
        </Button>
        <Button variant="outline-primary m-2" onClick={handleShow}>
          Edit Blog Item
        </Button>

        <Modal
          data-bs-theme={isDarkMode ? "dark" : "light"}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"} Blog Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={blogTitle}
                  onChange={handleTitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  value={blogDescription}
                  onChange={handleDescription}
                />
              </Form.Group>

              <Form.Group controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Select value={blogCategory} onChange={handleCategory}>
                  <option>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tag"
                  value={blogTags}
                  onChange={handleTags}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Image">
                <FormLabel>Pick an Image</FormLabel>
                <Form.Control
                  type="file"
                  placeholder="Select an Image from file"
                  accept="image/png, image/jpg"
                  //   value={blogImage}
                  onChange={handleImage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Acordian Below */}
        {/* Check to see if blogitems has info in it */}
        {isLoading ? (
          <>
            <Spinner animation="grow" variant="info" />
            <h2>...Loading</h2>
          </>
        ) : blogItems.length === 0 ? (
          <>
            <h2 className="text-center m-3">No Blog Items Found</h2>
            <Spinner animation="grow" variant="info" />
          </>
        ) : (
          <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Published</Accordion.Header>
              <Accordion.Body>
                {blogItems.map(
                  (item, i) =>
                    item.isPublished && (
                      <ListGroup as="ul" className="mb-2" key={item.id}>
                        <ListGroup.Item as={"li"} md={2}>
                          <h3>Title:</h3>
                          {item.title}
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}>
                          <h3>Description:</h3>
                          {item.description}
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} md={2}>
                          {" "}
                          <h3>Category:</h3> {item.category}
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} md={2}>
                          <h3>Tags:</h3>
                          {item.tag}
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}>
                          Image:{" "}
                          {item.image ? item.image.slice(5, 14) : "No image"}
                        </ListGroup.Item>
                        <ListGroup.Item
                          as={"li"}
                          className="d-flex justify-content-end"
                        >
                          <Button
                            variant="outline-danger mx-2"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline-info mx-2"
                            onClick={(e) => handleShow(e, item)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-primary mx-2"
                            onClick={() => handlePublish(item)}
                          >
                            Unpublish
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    )
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Unpublished</Accordion.Header>
              <Accordion.Body>
                {blogItems.map(
                  (item, i) =>
                    !item.isPublished && (
                      <ListGroup as="ul" className="mb-2" key={item.id}>
                        <ListGroup.Item as={"li"} md={2}>
                          <h3>Title:</h3>
                          {item.title}
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}>
                          <h3>Description:</h3>
                          {item.description}
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} md={2}>
                          {" "}
                          <h3>Category:</h3> {item.category}
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} md={2}>
                          <h3>Tags:</h3>
                          {item.tag}
                        </ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}>
                          Image:{" "}
                          {item.image ? item.image.slice(5, 14) : "No image"}
                        </ListGroup.Item>
                        <ListGroup.Item
                          as={"li"}
                          className="d-flex justify-content-end"
                        >
                          <Button
                            variant="outline-danger mx-2"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline-info mx-2"
                            onClick={(e) => handleShow(e, item)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-primary mx-2"
                            onClick={() => handlePublish(item)}
                          >
                            Publish
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    )
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
