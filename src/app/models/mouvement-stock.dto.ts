import { TypeMouvementStock } from "./TypeMouvementStock";

export interface MouvementStockDto {
    id?: number;
  articleId: number;
  quantite: number;
  typeMouvement: TypeMouvementStock;
  stockId?: number;
  description?: string;
  
  // Rendre ces champs optionnels pour la création
  articleCode?: string;
  articleNom?: string;
  utilisateurId?: number;
  dateMouvement?: string | Date;


}
