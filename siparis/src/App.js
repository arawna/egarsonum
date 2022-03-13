import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BottomNavi from "./Components/BottomNavi";
import Navi from "./Components/Navi";
import Categories from "./Pages/Categories";
import CustomerInfoService from "./Services/CustomerInfoService";
import { userLogin } from "./Store/actions/authActions";
import { Routes, Route } from "react-router-dom";
import Cart from "./Pages/Cart";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let customerInfoService = new CustomerInfoService();
    customerInfoService.getIp().then((result) => {
      customerInfoService
        .getCustomerInfoByIp(result.data.ip)
        .then((result2) => {
          if (result2.data.data.stil_valid) {
            dispatch(
              userLogin({
                cafeId: result2.data.data.cafe_id,
                tableId: result2.data.data.table_id,
              })
            );
            //süre sorun değilse
          } else {
            //süre geçmişse
            window.location.href = "https://qrgarsonum.com";
          }
        })
        .catch((result3) => {
          window.location.href = "https://qrgarsonum.com";
        });
    });
  }, [dispatch]);

  // sepet ürün ekleme silme
  // dispatch(cartAdd({ productId: 1, name: "Kahve" }));
  // dispatch(cartAdd({ productId: 2, name: "Pizza" }));
  // dispatch(cartDell(2));

  return (
    <div className="App">
      <NotificationContainer />
      <Navi />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/sepet" element={<Cart />} />
      </Routes>

      <BottomNavi />
    </div>
  );
}

export default App;
