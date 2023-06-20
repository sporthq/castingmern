import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Textarea } from '@chakra-ui/react';
import { Field, useField } from 'formik';

const TextAreaField = ({ label,type, name, placeholder }) => {
  const [field, meta] = useField({type,name,placeholder})

  return (
    <FormControl isInvalid={meta.error && meta.touched} mb='6'>
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <Field as={Textarea} {...field} name={name} placeholder={placeholder} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextAreaField;