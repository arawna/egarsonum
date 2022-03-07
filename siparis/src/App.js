import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BottomNavi from "./Components/BottomNavi";
import Navi from "./Components/Navi";
import Categories from "./Pages/Categories";
import CustomerInfoService from "./Services/CustomerInfoService";
import { userLogin } from "./Store/actions/authActions";

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
        });
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Navi />
      <Categories />
      <BottomNavi />
    </div>
  );
}

export default App;
