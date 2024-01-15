# JSON Form Maker

## Website : https://frontend-assignment-psi-six.vercel.app/

## Overview

This React application allows users to dynamically generate forms based on a provided UI schema. The UI schema is a JSON array containing specific information to construct dynamic forms. Users can paste the UI schema in a JSON editor on the left side of the application, and the right side will display a real-time preview of the rendered form.

## UI-Schema Format

The UI schema follows a specific structure, containing elements such as "sort," "label," "description," and "validate." Each element is crucial in defining the form's structure and behavior. The "validate" object includes properties like "required," "immutable," "pattern," "jsonKey," "uiType," "level," and "placeholder," providing detailed instructions for form rendering and validation.

### UI Schema Example
```json
[
  {
    "sort": 1,
    "label": "Pizza Name",
    "validate": {
      "required": true,
      "jsonKey": "pizzaName",
      "uiType": "Input"
    }
  },
  {
    "sort": 2,
    "label": "Pizza Type",
    "validate": {
      "required": true,
      "jsonKey": "pizzaType",
      "uiType": "Group",
      "level": 1
    },
    "children": [
      // Nested UI schema for Pizza Type
    ]
  },
  // ... Other UI schema elements
]
```

## Form Rendering

The application renders the form dynamically based on the provided UI schema. It supports various UI elements such as input fields, groups, selects, switches, etc. The nested structure of the schema is respected, and the form is organized accordingly.

### Info Tooltip
If a "description" is provided, an info icon appears next to the label. Hovering over the icon reveals a tooltip with the description text.

## Form Submission

Upon clicking the "Submit" button, the application generates the JSON data to be sent to the backend. It considers the user-selected tabs, ensuring that only relevant data is included in the submission. This prevents unnecessary data transfer for unselected tabs.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application with `npm start`.
4. Open your browser and navigate to `http://localhost:3000`.

## Future Enhancements

- Improved styling and responsiveness.
- Support for additional UI elements.
- Enhanced error handling and validation messages.

Feel free to contribute to the project and make it even better!

**Note:** Ensure you have Node.js and npm installed to run the application locally.
