import React, { useState } from 'react';
import { ArticleDataProps } from '../../pages/Authentication/type';
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
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

interface TableThreeProps {
  articles: ArticleDataProps[];
  deleteArticleData: (id: number) => void;
  updateArticleData: (id: number, article: ArticleDataProps) => void;
}

const TableThree: React.FC<TableThreeProps> = ({
  articles,
  deleteArticleData,
  updateArticleData,
}) => {
  const [selectedArticle, setSelectedArticle] =
    useState<ArticleDataProps | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticleData(id);
    }
  };

  const handleUpdate = (article: ArticleDataProps) => {
    setSelectedArticle(article);
    onOpen();
  };

  const handleSave = () => {
    if (selectedArticle) {
      updateArticleData(selectedArticle.id, selectedArticle);
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedArticle) {
      setSelectedArticle({
        ...selectedArticle,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-slate-700 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-white dark:text-white xl:pl-11">
                Nom des articles
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Quantité disponible
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.articleName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.articleQte}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="hover:text-primary text-red-900 delete"
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
                      onClick={() => handleUpdate(item)}
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
                          d="M15.5408 4.45864L13.542 2.45979C13.2173 2.13503 12.7436 2.13405 12.4182 2.45864L3.74008 11.1367L2.62052 14.8816C2.56043 15.0883 2.61793 15.3088 2.77129 15.4621C2.92464 15.6155 3.14523 15.673 3.35188 15.6129L7.0967 14.4933L15.7748 5.81524C16.0995 5.49048 16.0995 5.01677 15.7748 4.69121C15.4492 4.36665 14.9755 4.36665 14.6499 4.69121L7.73318 11.6079C7.62048 11.7206 7.45698 11.7545 7.31213 11.6898C7.16728 11.6251 7.08194 11.4715 7.08194 11.3091V7.19746C7.08194 6.82339 7.38686 6.51847 7.76094 6.51847C8.13501 6.51847 8.43993 6.82339 8.43993 7.19746V9.70368L14.1764 3.96727L15.5408 5.33166L9.80434 11.0681V7.78672C9.80434 7.41265 10.1093 7.10773 10.4833 7.10773C10.8574 7.10773 11.1623 7.41265 11.1623 7.78672V11.0681L14.6499 7.58049L15.5408 8.4714L11.0625 12.9497L11.0625 15.7036L13.8164 12.9497L15.5408 14.6741C15.8656 14.9987 15.8656 15.4724 15.5408 15.797C15.2162 16.1216 14.7425 16.1216 14.4179 15.797L12.6935 14.0726L9.80434 16.9618V19.7157H12.5583L14.2837 18.4415C14.6083 18.1168 14.6083 17.6431 14.2837 17.3185L15.5408 16.0614C15.8656 15.7368 15.8656 15.2631 15.5408 14.9385C15.2162 14.6139 14.7425 14.6139 14.4179 14.9385L13.542 15.8143L15.5408 14.4586Z"
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
            <ModalHeader>Mise à jour de l'article</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nom de l'article</FormLabel>
                <Input
                  type="text"
                  name="articleName"
                  value={selectedArticle?.articleName || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Quantité</FormLabel>
                <Input
                  type="number"
                  name="articleQte"
                  value={selectedArticle?.articleQte || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                Enregistrer
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Annuler
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </div>
  );
};

export default TableThree;
