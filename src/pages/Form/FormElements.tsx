// FormElements.tsx
import React, { useState, useEffect } from 'react';
import {
  getArticleNameAction,
  addArticleProductionAction,
  getArticleProductionValueAction,
  deleteArticleProductionListAction,
  updateArticleProductionListAction
} from '../../action/addArticle';
import ProductionTable from '../../components/Tables/ProductionTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik, FormikHelpers } from "formik";
import { AxiosError } from 'axios';
import { UpdateArticleValues } from '../../components/Tables/ProductionTable';
import { useToast } from '@chakra-ui/react';
import WorkforceDetails from '../Authentication/WorkforceDetails';

const validationSchema = Yup.object().shape({
  article_id: Yup.number().min(1, "Veuillez sélectionner un article").required("L'article est requis"),
  articleProductionQte: Yup.number().min(1, "La quantité doit être supérieure à 0").required("La quantité est requise"),
  unitPrice: Yup.number().min(1, "Le prix unitaire doit être supérieur ou égal à 1").required("Le prix unitaire est requis"),
});

interface Article {
  id: number;
  articleName: string;
}

 export interface ArticleProductionResponse {
  articleProductions: UpdateArticleValues[];
}

const FormElements: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productionId = id ? parseInt(id, 10) : 0;

  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesState, setArticlesState] = useState<UpdateArticleValues[]>([]);
  const toast = useToast();

  const fetchArticlesProduction = async () => {
    try {
      const response = await getArticleProductionValueAction(productionId);
      console.log(response.data.articleProductions);
      
     
      
      setArticlesState(response.data.articleProductions);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: 'Erreur',
        description: "Impossible de récupérer les articles de production.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await getArticleNameAction();
      
      setArticles(response.data);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      toast({
        title: 'Erreur',
        description: "Impossible de récupérer les articles.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  

  useEffect(() => {
    fetchArticles();
    fetchArticlesProduction();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: 0,
      articleName: "",
      production_id: productionId,
      article_id: 0,
      articleProductionQte: 1,
      unitPrice: 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }: FormikHelpers<UpdateArticleValues>) => {
      
      try {
        await addArticleProductionAction(values);

        toast({
          title: 'Succès',
          description: "Un article ajouté avec succès.",
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
        resetForm();
        fetchArticlesProduction();
      } catch (error) {
        console.error('Erreur:', error);
        toast({
          title: 'Erreur',
          description: "L'ajout de l'article a échoué.",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteArticleProductionListAction(id);
      setArticlesState(prevState => prevState.filter(article => article.id !== id));
      toast({
        title: 'Succès',
        description: "Article supprimé avec succès.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        toast({
          title: 'Erreur',
          description: "L'article n'a pas été trouvé.",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        toast({
          title: 'Erreur',
          description: "Erreur lors de la suppression de l'article.",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }
  };

  const handleUpdate = async (articleData: UpdateArticleValues) => {
    const finalValue = {
      article_id: articleData.article_id,
      unitPrice: articleData.unitPrice,
      articleQte: articleData.articleProductionQte,
      id : articleData.id
    };

    try {
      await updateArticleProductionListAction(finalValue);
      toast({
        title: 'Succès',
        description: "L'article a été mis à jour avec succès.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      fetchArticlesProduction(); // Re-fetch articles to update the state
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
      toast({
        title: 'Erreur',
        description: "Erreur lors de la mise à jour de l'article.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };



  return (
    <>
      <Breadcrumb pageName="Article pour la préparation" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Enregistrement d'articles pour production</h3>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">Nom de l'article</label>
              <div className="relative z-20 bg-white dark:bg-form-input mb-4">
                <select
                  name="article_id"
                  value={formik.values.article_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-[#7B3F00] active:border-[#7B3F00] dark:border-form-strokedark dark:bg-form-input ${formik.touched.article_id && formik.errors.article_id ? 'border-red-500' : ''}`}
                >
                  <option value="" disabled>Select Article</option>
                  {articles.map((article) => (
                    <option key={article.id} value={article.id}>{article.articleName}</option>
                  ))}
                </select>
                {formik.touched.article_id && formik.errors.article_id && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.article_id}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">Quantité</label>
                <input
                  type="number"
                  name="articleProductionQte"
                  value={formik.values.articleProductionQte}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-[#7B3F00] active:border-[#7B3F00] dark:border-form-strokedark dark:bg-form-input ${formik.touched.articleProductionQte && formik.errors.articleProductionQte ? 'border-red-500' : ''}`}
                  min="1"
                />
                {formik.touched.articleProductionQte && formik.errors.articleProductionQte && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.articleProductionQte}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">Prix unitaire</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formik.values.unitPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-[#7B3F00] active:border-[#7B3F00] dark:border-form-strokedark dark:bg-form-input ${formik.touched.unitPrice && formik.errors.unitPrice ? 'border-red-500' : ''}`}
                  min="1"
                  step="0.01"
                />
                {formik.touched.unitPrice && formik.errors.unitPrice && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.unitPrice}</div>
                )}
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
        <div>
          <ProductionTable
            productionArticles={articlesState}
            deleteProductionArticleData={handleDelete}
            updateProductionArticleData={handleUpdate}
          />
        </div>
        <div className='mt-12'>
          <p className="font-bold mb-6">
            Informations relatives à la main d'œuvre
          </p>
          <WorkforceDetails />
        </div>
      </div>
    </>
  );
};

export default FormElements;
