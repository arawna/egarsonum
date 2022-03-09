import * as React from "react";
import { useSelector } from "react-redux";
import CategoriesService from "../Services/CategoriesService";
import CategoryCard from "./CategoryCard";

export default function Categories() {
  let [categories, setCategories] = React.useState([]);
  const { authItem } = useSelector(({ auth }) => auth);

  React.useEffect(() => {
    let categoriesService = new CategoriesService();
    categoriesService
      .getCategoriesByCafeId(authItem[0].cafeId)
      .then((result) => {
        console.log(result.data.data);
        setCategories(result.data.data);
      });
  }, [authItem]);

  return (
    <div style={{ backgroundColor: "#2C3333" }}>
      <div style={{ height: "60px" }}></div>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
      <div style={{ height: "80px" }}></div>
    </div>
  );
}
