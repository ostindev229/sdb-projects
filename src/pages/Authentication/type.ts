
export interface ArticleDataProps {
    id: number;
    articleName: string;
    articleQte: number;
}

export interface NewProductionDataProps {
    id: number;
    productionDate: string;
    productionQte: number;
    productionTitle: string;
    onClick: () => void;
}

export interface WorkForceDetailsDataProps {
    production_id: number;
    number: number;
    pricePerP: number;
}
