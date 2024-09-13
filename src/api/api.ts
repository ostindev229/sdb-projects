import axios, { AxiosResponse } from "axios";
import { ArticleDataProps, NewProductionDataProps, ProductionArticleDataProps, WorkForceDetailsDataProps } from "../pages/Authentication/type";
import { PartialUpdateArticle } from "../components/Tables/ProductionTable";

const API = axios.create({
  baseURL: "https://sdbenin-1065a1430d04.herokuapp.com",
});

export const addArticle = (articleData: ArticleDataProps): Promise<AxiosResponse<any>> => {
  return API.post("/api/ajout-article", articleData);
};

export const getArticleValue = () => {
  return API.get("/api/liste-articles");
};

export const getArticleName = () => {
  return API.get("/api/nom/articles");
};


export const deleteArticleList = (id: number) => {
  return API.delete(`/api/supprimer-article/${id}`, {

  });
};

export const updateArticleList = (id: number, articleData: ArticleDataProps) => {
  return API.put(`/api/modifier-article/${id}`, articleData, {
  });
};

////////////////////////// Production //////////////////////////
export const deleteArticleProductionList = (id: number) => {
  return API.delete(`/api/delete_article/production/${id}`, {

  });
};

export const updateArticleProductionList = (articleData: PartialUpdateArticle) => {
  return API.put(`/api/update_article/production/${articleData.article_id}`, articleData, {
  });
};



export const createNewProduction = (productionData: NewProductionDataProps): Promise<AxiosResponse<any>> => {
  return API.post("/api/create-production", productionData);
}

export const getNewProductionValue = () => {
  return API.get("/api/liste-productions");
};


export const createArticleProduction = (articleData: ProductionArticleDataProps): Promise<AxiosResponse<any>> => {
  return API.post("/api/create/article-production", articleData);
}

export const getArticleProductionValue = (id: number) => {
  return API.get(`/api/article/production/${id}`);
}

export const addWorkForceDetails = (workForceData: WorkForceDetailsDataProps): Promise<AxiosResponse<any>> => {
  return API.post("/api/creer/maindoeuvre", workForceData);
}

export const getWorkForceDetails = (id: number) => {
  return API.get(`/api/liste/maindoeuvre/${id}`);
}