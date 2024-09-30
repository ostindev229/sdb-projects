
// WorkforceDetailsForm.tsx
import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { WorkForceDetailsDataProps } from './type';

interface WorkforceDetailsFormProps {
  productionId: number;
  onClose: () => void;
  onSubmit: (
    values: WorkForceDetailsDataProps,
    formikHelpers: FormikHelpers<WorkForceDetailsDataProps>
  ) => void;
  initialValues: WorkForceDetailsDataProps;
  isEditing: boolean; // Nouvelle propriété pour indiquer si nous éditons ou ajoutons
}

const WorkforceDetailsForm: React.FC<WorkforceDetailsFormProps> = ({
  onClose,
  onSubmit,
  initialValues,
  isEditing,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      number: Yup.number()
        .required('Ce champ est obligatoire')
        .min(1, 'Le nombre doit être supérieur à 0'),
      pricePerP: Yup.number()
        .required('Ce champ est obligatoire')
        .min(1, 'Le prix doit être supérieur à 0'),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={!!formik.errors.number && formik.touched.number}>
        <FormLabel>Nombre d'ouvriers</FormLabel>
        <Input
          id="number"
          name="number"
          placeholder="Nombre d'ouvriers"
          onChange={formik.handleChange}
          value={formik.values.number}
          type="number"
        />
        <FormErrorMessage>{formik.errors.number}</FormErrorMessage>
      </FormControl>

      <FormControl
        mt={4}
        isInvalid={!!formik.errors.pricePerP && formik.touched.pricePerP}
      >
        <FormLabel>Prix par tête</FormLabel>
        <Input
          id="pricePerP"
          name="pricePerP"
          placeholder="Prix par tête"
          onChange={formik.handleChange}
          value={formik.values.pricePerP}
          type="number"
        />
        <FormErrorMessage>{formik.errors.pricePerP}</FormErrorMessage>
      </FormControl>

      <ModalFooter>
        <Button type="submit" colorScheme="blue" mr={3} isLoading={formik.isSubmitting}>
          {isEditing ? 'Mettre à jour' : 'Ajouter'} {/* Changer le texte du bouton en fonction de isEditing */}
        </Button>
        <Button onClick={onClose}>Annuler</Button>
      </ModalFooter>
    </form>
  );
};

export default WorkforceDetailsForm;
