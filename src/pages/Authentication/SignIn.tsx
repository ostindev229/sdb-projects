import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableThree from '../../components/Tables/TableThree';
import { ArticleDataProps } from './type';
import { useCustomToast } from '../../utils/toast';

import {
  addArticleAction,
  deleteArticleListAction,
  updateArticleListAction,
  getArticleValueAction,
} from '../../action/addArticle';
import * as Yup from "yup";
import { useFormik, FormikHelpers } from "formik";
import { AxiosError } from 'axios';

const validationSchema = Yup.object().shape({
  articleName: Yup.string().required("Nom de l'article est requis"),
  articleQte: Yup.number().required("Quantité est requise").positive("La quantité doit être supérieur à 0").integer("La quantité doit être un entier"),
});

const SignIn: React.FC = () => {
  const [articles, setArticles] = useState<ArticleDataProps[]>([]);
  const { showToast } = useCustomToast();

  const fetchArticlesWithExponentialBackoff = async (retries = 3, delay = 1000) => {
    try {
      const response = await getArticleValueAction();
      setArticles(response.data);


    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429 && retries > 0) {
          console.warn(`Retrying in ${delay}ms...`);
          setTimeout(() => {
            fetchArticlesWithExponentialBackoff(retries - 1, delay * 2);
          }, delay);
        } else {
          console.error('Error fetching articles:', error);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  useEffect(() => {
    fetchArticlesWithExponentialBackoff();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: 0,
      articleName: '',
      articleQte: 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }: FormikHelpers<{ id: number, articleName: string, articleQte: number }>) => {
      try {
        await addArticleAction(values);
        showToast({
          title: 'Success',
          description: 'Votre article a été ajouté avec succès.',
          status: 'success',
        });
        resetForm();
        fetchArticlesWithExponentialBackoff();
      } catch (error) {
        console.error('Error:', error);
        showToast({
          title: 'Error',
          description: 'Une erreur est survenue lors de l\'envoi des données.',
          status: 'error',
        });
      }
    },
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteArticleListAction(id);
      showToast({
        title: 'Success',
        description: 'L\'article a été supprimé avec succès.',
        status: 'success',
      });
      fetchArticlesWithExponentialBackoff();
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Une erreur est survenue lors de la suppression de l\'article.',
        status: 'error',
      });
      console.error('Error deleting article:', error);
    }
  };

  const handleUpdate = async (id: number, articleData: ArticleDataProps) => {
    try {
      await updateArticleListAction(id, articleData);
      showToast({
        title: 'Success',
        description: 'L\'article a été mis à jour avec succès.',
        status: 'success',
      });
      fetchArticlesWithExponentialBackoff();
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Une erreur est survenue lors de la mise à jour de l\'article.',
        status: 'error',
      });
      console.error('Error updating article:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Ajouts des articles de production" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark mb-10 dark:bg-boxdark">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Nom de l'article
              </label>
              <input
                type="text"
                name="articleName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.articleName}
                placeholder="Entrez le nom de l'article"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#7B3F00] active:border-[#7B3F00] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#7B3F00]"

              />
              {formik.touched.articleName && formik.errors.articleName ? (
                <div className="text-red-500">{formik.errors.articleName}</div>
              ) : null}
            </div>
            <div className='mb-4'>
              <label className="mb-2.5 block text-black dark:text-white">
                Quantité
              </label>
              <input
                type="number"
                name="articleQte"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.articleQte}
                placeholder="Entrez la quantité"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#7B3F00] active:border-[#7B3F00] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#7B3F00]"
              />
              {formik.touched.articleQte && formik.errors.articleQte ? (
                <div className="text-red-500">{formik.errors.articleQte}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#7B3F00] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Ajouter Article
            </button>
          </div>
        </form>
      </div>
      <TableThree
        articles={articles}
        deleteArticleData={handleDelete}
        updateArticleData={handleUpdate}
      />
    </>
  );
};

export default SignIn;
