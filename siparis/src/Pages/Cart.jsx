import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const { cartItem } = useSelector(({ cart }) => cart);
  return (
    <div>
      <div style={{ height: "60px" }}></div>
      {cartItem.map((product) => (
        <p>{product.productName}</p>
      ))}
    </div>
  );
}
