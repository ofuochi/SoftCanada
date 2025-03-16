export const convertToFormData = (data: any) => {
  const formData = new FormData();

  const appendObject = (obj: any, prefix = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      const formKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        // Convert entire array to JSON
        formData.append(formKey, JSON.stringify(value));
      } else if (typeof value === "object" && value !== null) {
        appendObject(value, formKey);
      } else {
        formData.append(formKey, String(value));
      }
    });
  };

  appendObject(data);
  return formData;
};
