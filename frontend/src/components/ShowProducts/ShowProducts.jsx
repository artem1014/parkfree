import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllStuffThunk } from "../../redux/actions/stuffAC";
import { getAllProductsThunks } from "../../redux/actions/productsAC";
import { getAllCategoriesThunk } from "../../redux/actions/categoriesAC";
import { sortByName, sortByDate, sortByOwner } from "../../redux/actions/stuffAC";

import { Link } from "react-router-dom";
import style from "./ShowProducts.module.css";
import ProductCard from "../ProductCard/ProductCard";

export default function ShowProducts({ toUser }) {
  const stuffArray = useSelector((state) => state.stuffArray);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(stuffArray);
  useEffect(() => {
    dispatch(getAllStuffThunk());
    dispatch(getAllCategoriesThunk());
    dispatch(getAllProductsThunks());
  }, []);

  // function sortProducts(variable) {
  //   if (variable === "name") {
  //       dispatch(sortByName());
  //   }
  //   if (variable === "date") {
  //       dispatch(sortByDate());
  //   }
  //   if (variable === "owner"){
  //       dispatch(sortByOwner());
  //   }
  // }

  let showArr;


  if(toUser && user)
  {
    showArr = stuffArray
    .filter((stuff) => stuff.infoOwner === user.id)
    .map((stuff) => <ProductCard item={stuff} />);
  }
  else
  {
    showArr = stuffArray.map((stuff) => <ProductCard item={stuff} />);
  }

  return (
    user ?
    <div className={style.wrapper}>
      {/* <div className={style.filter_panel}>
        <div className={`${style.filter_btn} blue_bg`} onClick={() => {sortProducts("date")}}>по дате</div>
        <div className={`${style.filter_btn} yellow_bg`} onClick={() => {sortProducts("name")}}>по названию</div>
        <div className={`${style.filter_btn} green_bg`} onClick={() => {sortProducts("owner")}}>по владельцу</div>
      </div> */}
      <div className={style.products_area_wrapper}>
        {
         showArr.length >= 1 ? showArr : <h3>Здесь должны быть ваши товары! Но их нет...</h3>
        }
      </div>
    </div>
    :
    null
  )
}
