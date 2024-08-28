export interface ArticleDataProps {
    id: number;
    articleName: string;
    articleQte: number;
}

export interface ProductionArticleDataProps {
    id: number;
    articleName: string;
    production_id: number;
    article_id: number;
    unitPrice: number;
    articleQte: number;


}


export interface UpdateArticleValuesSend {
    id: number;
    articleProductionQte: number;
    unitPrice: number;
}


export interface NewProductionDataProps {
    id: number;
    productionDate: string;
    productionQte: number;
    productionTitle: string;
    onClick: () => void;
}
