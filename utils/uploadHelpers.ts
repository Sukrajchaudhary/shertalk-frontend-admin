/**
 * Helper functions for handling file uploads
 */

/**
 * Creates FormData from an object, handling File objects appropriately
 * @param data Object containing form data with possible File objects
 * @returns FormData object ready to be sent to the server
 */
export const createFormDataFromObject = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    // Skip null or undefined values
    if (value === null || value === undefined) return;
    
    // Handle File objects
    if (value instanceof File) {
      formData.append(key, value);
    } 
    // Handle arrays (including arrays of Files)
    else if (Array.isArray(value)) {
      // For arrays of Files
      if (value.some(item => item instanceof File)) {
        value.forEach((item, index) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item);
          }
        });
      } 
      // For arrays of primitive values
      else {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, String(item));
        });
      }
    } 
    // Handle objects (excluding File objects)
    else if (typeof value === 'object' && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    } 
    // Handle primitive values
    else {
      formData.append(key, String(value));
    }
  });
  
  return formData;
};

/**
 * Converts a FormData object to a regular JavaScript object for debugging
 * @param formData FormData object to convert
 * @returns Plain JavaScript object representation
 */
export const formDataToObject = (formData: FormData): Record<string, any> => {
  const object: Record<string, any> = {};
  
  formData.forEach((value, key) => {
    // Handle file objects
    if (value instanceof File) {
      object[key] = {
        name: value.name,
        type: value.type,
        size: `${(value.size / 1024).toFixed(2)} KB`,
      };
    } else {
      object[key] = value;
    }
  });
  
  return object;
};