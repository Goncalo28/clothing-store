import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categories: {} as any,
});

export const CategoriesProvider = ({ children }: any) => {
  const [categories, setCategories] = useState<any>({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();

      setCategories(categoriesMap);
    };
    getCategoriesMap();
  }, []);

  const value: any = { categories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
