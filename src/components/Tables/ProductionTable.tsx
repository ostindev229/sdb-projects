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
} from '@chakra-ui/react';


export interface UpdateArticleValues {
  articleName: string;
  id: number;
  articleProductionQte: number;
  unitPrice: number;
}
export interface PartialUpdateArticle {
  article_id: number;
  articleQte: number;
  unitPrice: number;
}






interface ProductionTableProps {
  productionArticles: UpdateArticleValues[];
  deleteProductionArticleData: (id: number) => void;
  updateProductionArticleData: (
    productionArticle: UpdateArticleValues,
  ) => void;
}

const ProductionTable: React.FC<ProductionTableProps> = ({
  productionArticles,
  deleteProductionArticleData,
  updateProductionArticleData,
}) => {
  const [selectedArticle, setSelectedArticle] =
    useState<UpdateArticleValues | null>(null);



  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteProductionArticleData(id);
    }
  };

  const handleUpdate = (updatedArticle: UpdateArticleValues, articleName: string) => {

    setSelectedArticle({ ...updatedArticle, articleName });
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
        [name]: name === 'articleProductionQte' || name === 'unitPrice' ? value : value,
      });
    }
  };

  console.log(selectedArticle);


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#1F1F1F] text-left ">
              <th className="min-w-[220px] py-4 px-4 font-medium text-white dark:text-white xl:pl-11">
                Nom de l'article
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Quantité pour la production
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Prix unitaire
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Montant
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {productionArticles.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.articleName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.articleProductionQte}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.unitPrice}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.articleProductionQte * (item.unitPrice)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="hover:text-primary text-red-900"
                    >
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.76965 2.47502 3.40967 2.83501 3.40967 3.2845V3.78447C3.40967 4.23396 3.76965 4.59395 4.21914 4.59395H13.7535C14.2029 4.59395 14.5629 4.23396 14.5629 3.78447V3.2845C14.5629 2.83501 14.2029 2.47502 13.7535 2.47502ZM12.944 4.59395H5.02866V1.9969C5.02866 1.55309 5.38484 1.1969 5.82865 1.1969H9.1498C9.59361 1.1969 9.9498 1.55309 9.9498 1.9969V4.59395H12.944ZM3.40967 6.10324V14.2726C3.40967 15.0922 4.08056 15.7631 4.90016 15.7631H13.0725C13.8921 15.7631 14.563 15.0922 14.563 14.2726V6.10324H3.40967ZM5.02866 7.72428H6.58977V13.3791H5.02866V7.72428ZM8.14889 7.72428H9.71V13.3791H8.14889V7.72428ZM11.2721 7.72428H12.8332V13.3791H11.2721V7.72428Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleUpdate(item, item.articleName)}
                      className="hover:text-primary"
                    >
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5408 4.45864L13.542 2.45979C13.2173 2.13503 12.7436 2.13405 12.4182 2.45864L3.74008 11.1367L2.62052 14.8816C2.56043 15.0883 2.61793 15.3088 2.77129 15.4621C2.92464 15.6155 3.14523 15.673 3.35188 15.6129L7.0967 14.4933L15.7748 5.81524C16.0994 5.49056 16.0994 5.01777 15.7748 4.69219L15.5408 4.45864ZM6.64005 13.2165L4.82558 13.7744L5.38338 11.9599L11.6377 5.7057L13.2924 7.3604L7.03816 13.6147H6.64005V13.2165ZM14.4894 5.3674L13.4747 6.38209L11.82 4.72739L12.8347 3.7127L14.4894 5.3674Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modifier l'article</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor="articleName">Nom de l'article</FormLabel>
                <Input
                  id="articleName"
                  name="articleName"
                  style={{ cursor: 'not-allowed', background: 'rgb(244, 240, 240)' }}

                  value={selectedArticle?.articleName ?? ''}
                  onChange={handleInputChange}
                  placeholder="Nom de l'article"
                  readOnly
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="articleQte">Quantité</FormLabel>
                <Input
                  id="articleQte"
                  name="articleProductionQte"
                  value={selectedArticle?.articleProductionQte ?? ''}
                  onChange={handleInputChange}
                  placeholder="Quantité"
                  type="number"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="unitPrice">Prix unitaire</FormLabel>
                <Input
                  id="unitPrice"
                  name="unitPrice"
                  value={selectedArticle?.unitPrice ?? ''}
                  onChange={handleInputChange}
                  placeholder="Prix unitaire"
                  type="number"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Annuler
              </Button>
              <Button colorScheme="blue" onClick={handleSave}>
                Enregistrer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </div>
  );
};

export default ProductionTable;
