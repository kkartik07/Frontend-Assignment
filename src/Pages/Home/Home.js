import './Home.css'
import {
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Header from "../Header";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Form from "./Form";


const toastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [formSchema, setFormSchema] = useState([]);

  const handleInputChange = (e) => {
    const jsonArea = document.getElementById("jsonarea");

    setInputValue(e.target.value);
    try {
      let parsedFields = JSON.parse(e.target.value);
      if (Array.isArray(parsedFields)) {
        setFormSchema(parsedFields);
        jsonArea.style.borderColor = "white"; // Reset border color when JSON is valid
      }
    } catch (error) {
      jsonArea.style.borderColor = "red"; // Set border color to red when an error occurs

      setTimeout(() => {
        jsonArea.style.borderColor = "white"; // Reset border color after 5 seconds
      }, 5000);

      toast.error("Enter valid JSON!", toastOptions);
    }
  };

  return (
    <>
      <Header />
      <Grid
        templateColumns={false ? "1fr" : "repeat(2, 1fr)"}
        gap={6}
        className="container"
      >
          <textarea
            id="jsonarea"
            className={`jsonarea`}
            value={inputValue}
            height={'80vh'}
            placeholder="Type your JSON here..."
            onChange={handleInputChange}
          />
        <GridItem gap={6} className="form">
          {formSchema.length > 0 && (
            <>
              <div className=''>
                <Form formSchema={formSchema} />
                <div className=""></div>
              </div>
            </>
          )}
        </GridItem>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default Home;
