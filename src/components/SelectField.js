import React, {  useEffect } from "react";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";

import { useFormContext } from "../FormContext.js";

const SelectField = ({ schema }) => {
  const {  updateFormData } = useFormContext();
  const [selectedValue, setSelectedValue] = React.useState(
    schema.validate.defaultValue
  );
  useEffect(() => {
    updateFormData(schema.jsonKey, schema.validate.defaultValue);
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    updateFormData(schema.jsonKey, event.target.value);
  };

  return (
    <FormControl isRequired={schema.validate.required} marginTop={"5"}
    >
      <FormLabel htmlFor={schema.jsonKey}
      >{schema.label}</FormLabel>

      <Select
        id={schema.jsonKey}
        value={selectedValue}
        onChange={handleChange}
        isDisabled={schema.validate.immutable}
        placeholder={schema.placeholder}
        >
        {schema.validate.options.map((option) => (
          <option key={option.value} value={option.value}
          style={{backgroundColor:'#3182CE', color: '#000'}}
          >
            {option.label}
          </option>
        ))}
      </Select>
      {/* </HStack> */}
    </FormControl>
  );
};

export default SelectField;
