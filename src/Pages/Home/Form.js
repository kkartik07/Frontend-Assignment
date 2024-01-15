import React, { useState } from "react";
import InputField from "../../components/InputField";
import FormComponent from "../../components/FormComponent";
import SwitchField from "../../components/SwitchField";
import SelectField from "../../components/SelectField";
import RadioField from "../../components/RadioField";
import './Form.css'
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "../../FormContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Form = ({ formSchema }) => {
  
  const { formData, updateFormData } = useFormContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleFormSubmit = () => {
    const isFormValid = formSchema.every((field) => {
      if (field.validate?.required) {
        return formData[field.jsonKey] !== undefined && formData[field.jsonKey] !== "";
      }
      return true;
    });

    if (isFormValid) {
      handleOpenModal();
    } else {
      toast.error("Please Enter all fields", toastOptions);
    }
  };
  

  
  const [isCopied, setIsCopied] = useState(false); 
  const handleCopyToClipboard = () => {
    const modalBody = document.getElementById("modal-body");
    
    if (modalBody) {
      const range = document.createRange();
      range.selectNode(modalBody);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      try {
        document.execCommand("copy");
        setIsCopied(true);
        toast.success("Content copied to clipboard!", toastOptions);
      } catch (error) {
        console.error("Unable to copy to clipboard", error);
      } 
    }
  };

  const renderJsonElements = (schema) => {
    return (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay className="modaloverlay"/>
        <ModalContent className='modal'>
          <ModalHeader style={{ color: 'black' }} className="header">
            Output JSON
            <Button onClick={handleCopyToClipboard} className="copy">
              {isCopied ? "Copied !" : "Copy"}
            </Button>
          <ModalCloseButton className="close" />
          </ModalHeader>
          <hr style={{ color: '#2B6CB0' }} />
          <ModalBody id="modal-body">
          <code>

  <ToastContainer />
<Box>
  {'{'}
{Object.entries(schema).map(([key, value]) => (
  <Text key={key} marginTop={2}>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{'"'}{key}{'"'}: </span>
      {JSON.stringify(value, null, 2)},
    </Text>

))}
{'}'}
  
</Box>
</code>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };  
  
  return (
    <React.Fragment>
        <form className='formbody'>
          {formSchema.map((schema, index) => {
            return (
              <React.Fragment key={index}>
                {schema.uiType === "Input" && (
                  <InputField
                    schema={schema}
                    key={schema.sort}
                    updateFormData={updateFormData}
                    style={{backgroundColor:'red'}}
                    />
                    )}

                {schema.uiType === "Switch" && (
                  <SwitchField
                    schema={schema}
                    key={schema.sort}
                    updateFormData={updateFormData}                    
                    />
                    )}

                {schema.uiType === "Select" && (
                  <SelectField
                  schema={schema}
                  key={schema.sort}
                  updateFormData={updateFormData}
                  />
                  )}

                {schema.uiType === "Radio" && (
                  <RadioField
                  schema={schema}
                  key={schema.sort}
                  updateFormData={updateFormData}
                  />
                  )}

                {schema.uiType === "Group" && (
                  <FormComponent
                    schema={schema}
                    key={schema.sort}
                    updateFormData={updateFormData}
                  />
                )}
              </React.Fragment>
            );
          })}
          {formSchema.length > 0 && (
            <Box style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Button Button colorScheme='blue' marginTop={"10px"} onClick={handleFormSubmit} >Submit</Button>
              {renderJsonElements(formData)}
            </Box>
          )}
        </form>


    </React.Fragment>
  );
};

export default Form;
