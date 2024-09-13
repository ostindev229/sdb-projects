

import { ArticleDataProps, NewProductionDataProps } from '../pages/Authentication/type.ts';
import * as api from '../api/api';
import { AxiosResponse } from 'axios';
import { ProductionArticleDataProps, WorkForceDetailsDataProps } from '../pages/Authentication/type';
import { PartialUpdateArticle } from '../components/Tables/ProductionTable';


export const addArticleAction = (articleData: ArticleDataProps): Promise<AxiosResponse<any>> => {
  return api.addArticle(articleData);
};

export const getArticleValueAction = () => {
  return api.getArticleValue();

};

export const getArticleNameAction = () => {
  return api.getArticleName();

};

export const deleteArticleListAction = async (id: number) => {
  try {
    const response = await api.deleteArticleList(id);
    return response;
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};

export const deleteArticleProductionListAction = async (id: number) => {
  try {
    const response = await api.deleteArticleProductionList(id);
    return response;
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};


export const updateArticleListAction = async (id: number, articleData: ArticleDataProps) => {
  try {
    const response = await api.updateArticleList(id, articleData);
    return response;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};


export const updateArticleProductionListAction = async (articleData: PartialUpdateArticle) => {
  try {
    const response = await api.updateArticleProductionList(articleData);
    return response;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};





/************************Production */


export const addNewProductionAction = (productionData: NewProductionDataProps): Promise<AxiosResponse<any>> => {
  return api.createNewProduction(productionData);
};

export const getNewProductionValueAction = async (): Promise<{ data: NewProductionDataProps[] }> => {
  return api.getNewProductionValue();

};



/**********************Nouvelle article pour une production spécifique */

export const addArticleProductionAction = (articleData: ProductionArticleDataProps): Promise<AxiosResponse<any>> => {
  return api.createArticleProduction(articleData);
};

export const getArticleProductionValueAction = async (id: number): Promise<{ data: ProductionArticleDataProps[] }> => {
  return api.getArticleProductionValue(id);


};
/**********************Main d'oeuvre */
export const addWorkForceDetailsAction = (workForceData: WorkForceDetailsDataProps): Promise<AxiosResponse<any>> => {
  return api.addWorkForceDetails(workForceData);
};

export const getWorkForceDetailsAction = async (id: number): Promise<{ data: WorkForceDetailsDataProps[] }> => {
  return api.getWorkForceDetails(id);
};