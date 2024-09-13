import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { WorkForceDetailsDataProps } from './type';
import { useToast } from '@chakra-ui/react';
import { addWorkForceDetailsAction } from '../../action/addArticle';
import { getWorkForceDetailsAction } from '../../action/addArticle';

const WorkforceDetails: React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id } = useParams<{ id: string }>();
    const productionId = id ? parseInt(id, 10) : 0;

    const toast = useToast();

    // Utilisation de useRef pour l'initialFocusRef
    const initialRef = React.useRef(null);
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getWorkForceDetailsAction(productionId);
                console.log(response);
                // Handle the response or set initial form values here if needed
            } catch (error) {
                console.error("Erreur lors de la récupération des détails : ", error);
            }
        };
        fetchDetails();
    }, [productionId]);



    const formik = useFormik({
        initialValues: {
            production_id: productionId,
            number: 0,
            pricePerP: 0,
        },
        validationSchema: Yup.object({
            number: Yup.number().required('Ce champ est obligatoire').min(1, 'Le nombre doit être supérieur à 0'),
            pricePerP: Yup.number().required('Ce champ est obligatoire').min(1, 'Le prix doit être supérieur à 0'),
        }),
        onSubmit: async (values, { resetForm }: FormikHelpers<WorkForceDetailsDataProps>) => {
            try {
                await addWorkForceDetailsAction(values);
                toast({
                    title: 'Succès',
                    description: "Détails de la main-d'œuvre ajoutés avec succès",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
                resetForm();
                onClose(); // Fermer le modal après soumission réussie
            } catch (error) {
                const errorMessage = (error as any).response?.data?.message || "Erreur lors de l'ajout des détails de la main-d'œuvre";

                // Vérification pour l'erreur 500
                if ((error as any).response?.status === 500) {
                    toast({
                        title: 'Erreur serveur',
                        description: "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard ou contacter l'administrateur.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position: 'top-right',
                    });
                } else if ((error as any).response?.status === 409 || errorMessage.includes('déjà créé')) {
                    toast({
                        title: 'Détail déjà existant',
                        description: "Vous ne pouvez pas créer à nouveau ces détails. Veuillez les modifier au lieu de les recréer.",
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
        },
    });

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark mb-10 dark:bg-boxdark">
                <motion.button
                    className="bg-[#7B3F00] m-6 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpen}
                >
                    Ajouter les détails de la main-d'œuvre
                </motion.button>
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-[#1F1F1F] text-left ">
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-white dark:text-white xl:pl-11">
                                        Prix par tête
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                                        Nombre d'ouvriers
                                    </th>
                                    <th className="py-4 px-4 font-medium text-white dark:text-white">
                                        Montant total
                                    </th>

                                    <th className="py-4 px-4 font-medium text-white dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr >
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            <span style={{ display: '' }}>5</span>

                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                                        <p className="text-black dark:text-white">

                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                                        <p className="text-black dark:text-white">

                                        </p>
                                    </td>

                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button
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

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Entrer les détails</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl mt={4} isInvalid={!!formik.errors.number && formik.touched.number}>
                                <FormLabel>Nombre d'ouvriers</FormLabel>
                                <Input
                                    ref={initialRef}
                                    id="number"
                                    name="number"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.number}
                                    placeholder="Nombre d'ouvriers"
                                />
                                {formik.errors.number && formik.touched.number && (
                                    <FormErrorMessage>{formik.errors.number}</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl mt={4} isInvalid={!!formik.errors.pricePerP && formik.touched.pricePerP}>
                                <FormLabel>Prix par tête</FormLabel>
                                <Input
                                    id="pricePerP"
                                    name="pricePerP"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pricePerP}
                                    placeholder="Prix par tête"
                                />
                                {formik.errors.pricePerP && formik.touched.pricePerP && (
                                    <FormErrorMessage>{formik.errors.pricePerP}</FormErrorMessage>
                                )}
                            </FormControl>

                            <ModalFooter>
                                <Button
                                    colorScheme='blue'
                                    mr={3}
                                    type="submit"
                                    isLoading={formik.isSubmitting} // Affiche un loader pendant la soumission
                                    disabled={formik.isSubmitting}  // Désactive le bouton pendant la soumission
                                >
                                    Enregistrer
                                </Button>

                                <Button onClick={onClose}>Annuler</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default WorkforceDetails;
