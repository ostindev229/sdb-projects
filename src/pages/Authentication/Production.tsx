import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addNewProductionAction, getNewProductionValueAction } from '../../action/addArticle';
import * as Yup from "yup";
import { useFormik } from "formik";
import Card from './SignUp';
import { NewProductionDataProps } from './type';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Loader from '../../common/Loader';
import { useCustomToast } from '../../utils/toast';

const validationSchema = Yup.object().shape({
    productionDate: Yup.date().required("Date is required"),
    productionQte: Yup.number().required("Quantity is required").positive("Quantity must be greater than 0"),
    productionTitle: Yup.string().required("Production name is required"),
});

const Production: React.FC = () => {
    const [productionData, setProductionData] = useState<NewProductionDataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // État de chargement
    const [submitLoading, setSubmitLoading] = useState<boolean>(false); // État de chargement du bouton
    const [error, setError] = useState<string | null>(null); // État d'erreur
    const navigate = useNavigate();
    const { showToast } = useCustomToast();

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchProductionWithExponentialBackoff = async (retries = 3, delayMs = 1000) => {
        setLoading(true);
        try {
            const response = await getNewProductionValueAction();
            setProductionData(response.data);
            setError(null); // Réinitialiser l'erreur en cas de succès
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 429 && retries > 0) {
                    console.warn(`Retrying in ${delayMs}ms...`);
                    await delay(delayMs);
                    return fetchProductionWithExponentialBackoff(retries - 1, delayMs * 2);
                } else {
                    setError('Error fetching articles');
                    console.error('Error fetching articles:', error);
                }
            } else {
                setError('Unexpected error');
                console.error('Unexpected error:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductionWithExponentialBackoff();
    }, []); // Ne pas inclure `productionData` ici

    const formik = useFormik({
        initialValues: {
            id: 0,
            productionDate: "",
            productionQte: 0,
            productionTitle: ""
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setSubmitLoading(true); // Début du chargement du bouton
            try {
                await addNewProductionAction({ ...values, onClick: () => { } });

                resetForm();
                closeModal();
                showToast({
                    title: 'Success',
                    description: 'Une nouvelle production a été ajoutée avec succès.',
                    status: 'success',
                });
                fetchProductionWithExponentialBackoff(); // Actualiser la liste des productions
            } catch (error) {
                console.error('Error:', error);
                showToast({
                    title: 'Error',
                    description: 'La création de la production a échoué.',
                    status: 'error',
                });
            } finally {
                setSubmitLoading(false); // Fin du chargement du bouton
            }
        },
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleRedirect = (id: number) => {
        navigate(`/forms/form-elements/${id}`);
    };

    return (
        <>
            <div>
                <motion.button
                    className="bg-[#7B3F00] text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openModal}
                >
                    Démarrer une nouvelle production
                </motion.button>

                <div className="p-4">
                    <p className="text-xl font-semibold mb-2">Settings</p>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {productionData.map((item) => (
                                <div key={item.id}>
                                    <Card
                                        id={item.id}
                                        productionDate={item.productionDate}
                                        productionQte={item.productionQte}
                                        productionTitle={item.productionTitle}
                                        onClick={() => handleRedirect(item.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="bg-white rounded-lg p-6 shadow-xl w-full max-w-lg mx-4"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Ajouter une production</h2>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="flex flex-col">
                                        <label htmlFor="productionDate" className="mb-2 text-gray-700">Date</label>
                                        <input
                                            type="date"
                                            id="productionDate"
                                            name="productionDate"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.productionDate}
                                            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                        {formik.touched.productionDate && formik.errors.productionDate ? (
                                            <div className="text-red-500">{formik.errors.productionDate}</div>
                                        ) : null}

                                        <label htmlFor="productionQte" className="mb-2 text-gray-700">Quantité</label>
                                        <input
                                            type="number"
                                            id="productionQte"
                                            name="productionQte"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.productionQte}
                                            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                        {formik.touched.productionQte && formik.errors.productionQte ? (
                                            <div className="text-red-500">{formik.errors.productionQte}</div>
                                        ) : null}

                                        <label htmlFor="productionTitle" className="mb-2 text-gray-700">Nom de la production</label>
                                        <input
                                            type="text"
                                            id="productionTitle"
                                            name="productionTitle"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.productionTitle}
                                            className="border border-gray-300 rounded-lg p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                        {formik.touched.productionTitle && formik.errors.productionTitle ? (
                                            <div className="text-red-500">{formik.errors.productionTitle}</div>
                                        ) : null}

                                        <div className="flex justify-between">
                                            <motion.button
                                                type="submit"
                                                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                disabled={submitLoading} // Désactiver le bouton pendant le chargement
                                            >
                                                {submitLoading ? (
                                                    <span className="loader"></span> // Loader blanc
                                                ) : (
                                                    'Soumettre'
                                                )}
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={closeModal}
                                            >
                                                Fermer
                                            </motion.button>
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>


            </div>
        </>
    );
}

export default Production;
