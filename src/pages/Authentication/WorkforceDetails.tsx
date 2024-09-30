// WorkforceDetails.tsx
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ModalContent, useDisclosure, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import WorkforceDetailsTable from './WorkforceDetailsTable';
import WorkforceDetailsForm from './WorkforceDetailsForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { WorkForceDetailsDataProps } from './type';
import {
  addWorkForceDetailsAction,
  getWorkForceDetailsAction,
  deleteWorkForceDetailsAction,
  updateWorkForceDetailsAction,
} from '../../action/addArticle';
import { useCustomToast } from '../../utils/toast';
import { Modal, ModalBody, ModalCloseButton, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';



const WorkforceDetails: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { id } = useParams<{ id: string }>();
  const productionId = id ? parseInt(id, 10) : 0;
  const [workForceDetails, setWorkForceDetails] = useState<WorkForceDetailsDataProps[]>([]);
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
  const [editingDetail, setEditingDetail] = useState<WorkForceDetailsDataProps | null>(null); // Nouvel état pour l'édition
  const { showToast } = useCustomToast();
  const toast = useToast();

  // Fetch workforce details on mount
  const fetchDetails = async () => {
    try {
      const response = await getWorkForceDetailsAction(productionId);
      setWorkForceDetails(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails : ', error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [productionId]);

  // Handle deletion with confirmation modal
  const handleDelete = async () => {
    if (selectedDetailId !== null) {
      try {
        await deleteWorkForceDetailsAction(selectedDetailId);
        showToast({
          title: 'Succès',
          description: "L'article a été supprimé avec succès.",
          status: 'success',
        });
        setWorkForceDetails((prev) => prev.filter((detail) => detail.id !== selectedDetailId));
        setSelectedDetailId(null);
        onDeleteClose();
      } catch (error) {
        showToast({
          title: 'Erreur',
          description: "Une erreur est survenue lors de la suppression.",
          status: 'error',
        });
        console.error('Error deleting article:', error);
      }
    }
  };

  const handleFormSubmit = async (
    values: WorkForceDetailsDataProps,
    { resetForm }: FormikHelpers<WorkForceDetailsDataProps>
  ) => {
    try {
      if (editingDetail) {
        // Mise à jour
        await updateWorkForceDetailsAction(values.id, values);
        toast({
          title: 'Succès',
          description: 'Détails mis à jour avec succès.',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        // Ajout
        await addWorkForceDetailsAction(values);
        toast({
          title: 'Succès',
          description: 'Détails ajoutés avec succès.',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
      resetForm();
      setEditingDetail(null); // Réinitialiser l'édition
      onClose();
      // Fetch updated data after adding or updating details
      fetchDetails();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erreur lors de l'ajout.";
      if (error.response?.status === 500) {
        toast({
          title: 'Erreur serveur',
          description: 'Une erreur est survenue sur le serveur.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      } else if (
        error.response?.status === 409 ||
        errorMessage.includes('déjà créé')
      ) {
        toast({
          title: 'Détail existant',
          description:
            'Vous ne pouvez pas recréer ces détails. Veuillez les modifier.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        toast({
          title: 'Erreur',
          description: errorMessage,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }
  };

  const handleDeleteConfirmation = (id: number) => {
    setSelectedDetailId(id);
    onDeleteOpen();
  };

  const handleEdit = (detail: WorkForceDetailsDataProps) => {
    setEditingDetail(detail); // Définir le détail à éditer
    onOpen(); // Ouvrir le modal
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark mb-10 dark:bg-boxdark">
        <motion.button
          className="bg-[#7B3F00] m-6 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingDetail(null); // Réinitialiser l'édition
            onOpen();
          }}
        >
          Ajouter les détails de la main-d'œuvre
        </motion.button>

        <WorkforceDetailsTable workForceDetails={workForceDetails} onDelete={handleDeleteConfirmation} onEdit={handleEdit} />
      </div>

      {/* Modal for adding or editing workforce details */}
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingDetail ? 'Modifier les détails de la main-d’œuvre' : 'Ajouter les détails de la main-d’œuvre'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <WorkforceDetailsForm
              productionId={productionId}
              onClose={onClose}
              onSubmit={handleFormSubmit}
              initialValues={editingDetail || { id: 0, production_id: productionId, number: 0, pricePerP: 0 }}
              isEditing={!!editingDetail}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Confirmation Modal for deletion */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onDelete={handleDelete}
      />
    </>
  );
};

export default WorkforceDetails;
