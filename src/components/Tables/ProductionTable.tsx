import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormLabel,
  FormControl,
  Input,
  useDisclosure,
  ChakraProvider,
  Text,
} from '@chakra-ui/react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

export interface UpdateArticleValues {
  articleName: string;
  id: number;
  articleProductionQte: number;
  unitPrice: number;
  article_id: number;
  production_id: number;
}

export interface PartialUpdateArticle {
  id: number;
  article_id: number;
  unitPrice: number;
  articleQte: number;
}

interface ProductionTableProps {
  productionArticles: UpdateArticleValues[];
  deleteProductionArticleData: (id: number) => void;
  updateProductionArticleData: (productionArticle: UpdateArticleValues) => void;
}

const ProductionTable: React.FC<ProductionTableProps> = ({
  productionArticles,
  deleteProductionArticleData,
  updateProductionArticleData,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<UpdateArticleValues | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure(); // Modal pour la suppression

  const [articleToDelete, setArticleToDelete] = useState<number | null>(null); // Article sélectionné pour suppression

  const handleUpdateClick = (updatedArticle: UpdateArticleValues) => {
    setSelectedArticle(updatedArticle);
    onOpen();
  };

  const handleSave = () => {
    if (selectedArticle) {
      updateProductionArticleData(selectedArticle);
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedArticle) {
      const { name, value } = e.target;
      setSelectedArticle({
        ...selectedArticle,
        [name]: name === 'articleProductionQte' || name === 'unitPrice' ? parseFloat(value) : value,
      });
    }
  };

  const confirmDelete = (id: number) => {
    setArticleToDelete(id);
    onDeleteModalOpen(); // Ouvre le modal de confirmation de suppression
  };

  const handleDelete = () => {
    if (articleToDelete !== null) {
      deleteProductionArticleData(articleToDelete); // Supprime l'article
      onDeleteModalClose(); // Ferme le modal de confirmation
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#1F1F1F] text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-white dark:text-white xl:pl-11">
                Nom de l'article
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Quantité pour la production
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">Prix unitaire</th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">Montant</th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productionArticles.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{item.articleName}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.articleProductionQte}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.unitPrice} €</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.articleProductionQte * item.unitPrice} €</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    
                    <button onClick={() => handleUpdateClick(item)} className="text-primary">
                      {/* Icône d'édition */}
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className=" text-red-900"
                    >
                      {/* Icône de suppression */}
                      <FaTrashAlt size={20} />
                     
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal pour la mise à jour d'un article */}
      <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Mise à jour de l'article</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nom de l'article</FormLabel>
                <Input
                  type="text"
                  name="articleName"
                  value={selectedArticle?.articleName || ''}
                  onChange={handleInputChange}
                  readOnly
                  style={{ cursor: 'not-allowed', background: 'rgb(244, 240, 240)' }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Quantité pour la production</FormLabel>
                <Input
                  type="number"
                  name="articleProductionQte"
                  value={selectedArticle?.articleProductionQte || ''}
                  onChange={handleInputChange}
                  min="1"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Prix unitaire</FormLabel>
                <Input
                  type="number"
                  name="unitPrice"
                  value={selectedArticle?.unitPrice || ''}
                  onChange={handleInputChange}
                  min="1"
                  step="0.01"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleSave} mr={3} colorScheme="blue">
                Sauvegarder
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal de confirmation de suppression */}
        <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation de suppression</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Êtes-vous sûr de vouloir supprimer cet article ?</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" onClick={handleDelete} mr={3}>
                Supprimer
              </Button>
              <Button onClick={onDeleteModalClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </div>
  );
};

export default ProductionTable;
