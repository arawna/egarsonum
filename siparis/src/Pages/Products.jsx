import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import ProductsService from "../Services/ProductsService";
import Product from "./Product";

export default function Products({ categoryId }) {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    let productsService = new ProductsService();
    productsService.getProductsByCategoryId(categoryId).then((result) => {
      console.log(result.data.data);
      setProducts(result.data.data);
    });
  }, [categoryId]);

  return (
    <div>
      <Swiper
        spaceBetween={40}
        slidesPerView={1.2}
        slidesOffsetBefore={40}
        slidesOffsetAfter={40}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.product_id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>
          <div style={{ backgroundColor: "red" }}>asd</div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundColor: "red" }}>asd</div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundColor: "red" }}>asd</div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ backgroundColor: "red" }}>asd</div>
        </SwiperSlide> */}
        <div style={{ height: "40px" }}></div>
      </Swiper>
    </div>
  );
}
