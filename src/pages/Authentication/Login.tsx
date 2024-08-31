import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCustomToast } from '../../utils/toast';
import './style.css';

// Validation Schema
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Adresse email invalide')
        .required('Email requis'),
    password: Yup.string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .required('Mot de passe requis'),
});

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { showToast } = useCustomToast();

    return (
        <div className="min-h-screen bg-[#eee] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <a className="logo_shadow navbar-brand flex justify-center mb-6" href="#">
                    <i className="sdb_logo"><span>SDB</span>ENIN</i>
                </a>
                <h2 className="text-3xl font-bold mb-8 text-center text-[#7B3F00]">Connexion</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        setTimeout(() => {
                            showToast({
                                title: 'Success',
                                description: 'Vous êtes connectés.',
                                status: 'success',
                            });
                            navigate('/');
                        }, 2000);
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <div className={`flex items-center border-b py-2 ${errors.email && touched.email ? 'border-[#7B3F00]' : 'border-[#4a4949]'}`}>
                                    <FaEnvelope className="text-[#4a4949] mr-2" />
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    />
                                </div>
                                <ErrorMessage name="email" component="div" className="text-[#7B3F00] text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Mot de passe
                                </label>
                                <div className={`flex items-center border-b py-2 ${errors.password && touched.password ? 'border-[#7B3F00]' : 'border-[#4a4949]'}`}>
                                    <FaLock className="text-[#4a4949] mr-2" />
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Mot de passe"
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    />
                                </div>
                                <ErrorMessage name="password" component="div" className="text-[#7B3F00] text-sm mt-1" />
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#7B3F00] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                                </motion.button>
                            </div>
                            <div className="mt-4 text-center">
                                <a href="#" className="text-[#4a4949] hover:text-[#7B3F00] text-sm">Mot de passe oublié ?</a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        </div>
    );
};

export default LoginForm;
