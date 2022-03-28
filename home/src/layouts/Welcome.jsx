import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Collapse,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import WelcomeImages from "../pages/WellcomePages/WelcomeImages";
import WelcomeRegister from "../pages/WellcomePages/WelcomeRegister";
import "./Welcome.css";
import Typical from "react-typical";
import { QrCode } from "@mui/icons-material";

export default function Welcome() {
  const [isOpen, setIsOpen] = useState(false);
  const toogle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const toogleModal = () => {
    setModal(!modal);
  };
  const handleClickProduct = (productId) => {
    setSelectedProduct(productId);
    toogleModal();
  };
  const closeBtn = (
    <button
      className="close btn"
      onClick={toogleModal}
      style={{ fontSize: "1.3em" }}
    >
      <b>&times;</b>
    </button>
  );
  const [demoModal, setDemoModal] = useState(false);
  const toogleDemoModal = () => {
    setDemoModal(!demoModal);
  };
  const closeBtnDemo = (
    <button
      className="close btn"
      onClick={toogleDemoModal}
      style={{ fontSize: "1.3em" }}
    >
      <b>&times;</b>
    </button>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="md" className={"overlay"}>
        <Container>
          <NavbarBrand>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              Qrgarsonum.com
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={toogle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="#qrmenu">Ana Sayfa</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#neden-biz">Hakkımızda</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#paketler">Ürünler</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#basvur">İletişim</NavLink>
              </NavItem>
            </Nav>
            <NavbarText style={{ marginLeft: "auto" }}>
              <a href="https://cafe.qrgarsonum.com" className="btn btn-danger">
                Giriş Yap
              </a>
            </NavbarText>
          </Collapse>
        </Container>
      </Navbar>
      <WelcomeImages />
      <Container className="mt-5">
        <Row>
          <Col lg="4" style={{ textAlign: "center" }}>
            <QrCode
              style={{ fontSize: "300px", verticalAlign: "-400px" }}
              className="qr-logo"
            />
            {/* <img
              src="https://i.hizliresim.com/5zprbp7.png"
              alt="Qr"
              style={{ height: "auto", width: "100%" }}
            ></img> */}
          </Col>
          <Col lg="8" style={{ marginTop: "10%" }} id="qrmenu">
            <h2 style={{ fontSize: "5em" }}>QR Garsonum</h2>
            <div style={{ fontSize: "30px", color: "#D82148" }}>
              <Typical
                steps={[
                  "QR Kodlu Menü Sistemi",
                  1000,
                  "İlk 1 Ücretsiz",
                  1000,
                  "Hızlı",
                  1000,
                  "Kolay Kullanım",
                  1000,
                  "Pratik",
                  1000,
                  "Yönlendirici Tasarım",
                  1000,
                  "Uygulama Modu",
                  1000,
                  "İnteraktif",
                  1000,
                  "Teşfik Edici Tasarım",
                  1000,
                  "Ve Daha Fazlası...",
                  1000,
                ]}
                loop={Infinity}
                wrapper="b"
              />
            </div>

            <p style={{ fontSize: "1.5em" }}>
              Qrgarsonum müşterilerinizin menüye dijital ortamda QR kod
              vasıtasıyla ulaşmasını ve siparişlerini size iletebilmesini
              sağlayan bir web platformudur
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg="3">
            <div
              className="card description-card"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-calendar-date"></i> İlk Ay Ücretsiz
                </h5>
                <p className="card-text">
                  İlk bir ay ücret ödemeden deneyebilir ve faydalarını
                  görebilirsiniz
                </p>
              </div>
            </div>
          </Col>
          <Col lg="3">
            <div
              className="card description-card"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">
                <h5 className="card-title">₺ Düşük Maliyet</h5>
                <p className="card-text">
                  Ücretsiz deneme sürümünün ardından ödeyeceğiniz ücreti
                  duydugunuzda şaşıracaksınız
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg="4">
            <div
              className="card description-card"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-phone"></i>
                  <del> Uygulama</del>
                </h5>
                <p className="card-text">
                  Müşterileriniz uygulama yüklemek zorunda olmadan kolayca
                  sipariş verebilir
                </p>
              </div>
            </div>
          </Col>
          <Col lg="8">
            <div
              className="card description-card"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-hand-thumbs-up"></i> Kullanıcı Deneyimi
                </h5>
                <p className="card-text">
                  Kullanımı son derece basittir. Performanslı kodlaması
                  sayesinde gecikme yapmaz.
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg="8">
            <div
              className="card description-card"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-clock"></i> Sipariş
                </h5>
                <p className="card-text">
                  Sipariş karışıklığını önler, garson maliyetini düşürür, kayıp
                  kaçağı önler, sipariş gecikmesini engeller.
                </p>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <div
              className="card description-card"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-x-diamond-fill"></i> QR Kod
                </h5>
                <p className="card-text">
                  Müşterileriniz masada bulunan <b>QR Kodu</b> cep telefonunun
                  kamerasına okutarak menüyü görüntüleyebilir ve sipariş
                  verebilir.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container
        style={{ textAlign: "center", marginTop: "3em" }}
        id="neden-biz"
      >
        <h2>
          Neden <span style={{ color: "red" }}>Biz?</span>
        </h2>
        <hr style={{ color: "red", height: "3px" }} />
        <p>
          <b>
            <i className="bi bi-x-diamond-fill"></i> QR Kod Menü ve Sipariş
            Sistemi Qrgarsonum
          </b>{" "}
          Kafe, Restorant vb yerler için QR menü ve sipariş hizmeti vermektedir
          işte bizi seçmeniz için bazı sebepler.
        </p>

        <Row>
          <Col lg="4">
            <div className="card why-card" style={{ borderRadius: "20px" }}>
              <div className="why-card-icon-div">
                <i className="bi bi-globe" style={{ fontSize: "3em" }}></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Modern Tasarım</h5>
                <p className="card-text">
                  Tasarımımıza güveniyoruz. Müşteri davranışlarını uzun süre
                  izleyerek analiz ettik. Tasarımımızı bu yönde geliştirdik.
                  Müşterilerinizin dilinden anlayan bir tasarım sizleri
                  bekliyor.
                </p>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <div className="card why-card" style={{ borderRadius: "20px" }}>
              <div className="why-card-icon-div">
                <i
                  class="bi bi-arrow-90deg-right"
                  style={{ fontSize: "3em" }}
                ></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Yönlendirici Dizayn</h5>
                <p className="card-text">
                  Müşterilieriniz sistemi kullanırken her adımda yanındayız.
                  Sisteme, müşterilerinizin ürün seçmesini ve sipariş vermesini
                  kolaylaştıracak animasyonlar ekledik.
                </p>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <div className="card why-card" style={{ borderRadius: "20px" }}>
              <div className="why-card-icon-div">
                <i className="bi bi-brush-fill" style={{ fontSize: "3em" }}></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Menü Tasarımı</h5>
                <p className="card-text">
                  Tasarım ekibimiz, en yeni teknolojiler ile masanızın üzerine
                  yerleştireceğiniz karekodları ve modern işletme logolarınızı
                  tasarlamak için sabırsızlıkla sizleri bekliyor.
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg="4">
            <div className="card why-card" style={{ borderRadius: "20px" }}>
              <div className="why-card-icon-div">
                <i
                  className="bi bi-shield-fill-check"
                  style={{ fontSize: "3em" }}
                ></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Pandemi</h5>
                <p className="card-text">
                  Günümüzde işletmeleri olumsuz etkileyen Covid-19 virüsü
                  nedeniyle müşteriler menülere dokunmaktan çekinmektedirler.
                  Endişelenmeyin. <b>Qrgarsonum</b> sayesinde böyle bir derdiniz
                  yok.
                </p>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <div className="card why-card" style={{ borderRadius: "20px" }}>
              <div className="why-card-icon-div">
                <i className="bi bi-clock-fill" style={{ fontSize: "3em" }}></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Sipariş Gecikmesi</h5>
                <p className="card-text">
                  Muadillerimizin aksine, biz sipariş verme özelliğine sahibiz.
                  Sisteme giren müşterileriniz menüyü görebildiği gibi
                  siparişlerini, garson çağrılarını ve hesap isteklerini de bu
                  ekrandan size iletebilecektir.
                </p>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <div className="card why-card" style={{ borderRadius: "20px" }}>
              <div className="why-card-icon-div">
                <i className="bi bi-graph-up" style={{ fontSize: "3em" }}></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Analiz</h5>
                <p className="card-text">
                  İstatistiklerimize göre, <b>QR Kod Menü ve Sipariş Sistemi</b>{" "}
                  kullanan işletmelerimizin gelirleri <b>%13</b> oranında artış
                  gösterdi. Bu işletmeler arasında yerinizi almak için şağıdaki{" "}
                  <b>Talep Formu</b>'nu doldurabilirsiniz.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container
        style={{ textAlign: "center", marginTop: "3em" }}
        id="paketler"
      >
        <h2>
          Paketler <span style={{ color: "red" }}>?</span>
        </h2>
        <hr style={{ color: "red", height: "3px" }} />
        <p>
          <b>Sipariş Paketi</b> ve <b>Menü Paketi</b> olmak üzere iki farklı
          paketimiz var.
        </p>

        <Row>
          <Col lg="3" />
          <Col lg="3">
            <div className="card product-card">
              <div className="products-icon-div">
                <i className="bi bi-cart-plus" style={{ fontSize: "3em" }}></i>
              </div>
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ color: "red", fontSize: "1.5em" }}
                >
                  <b>Sipariş Paketi</b>
                </h5>
                <p className="card-text" style={{ fontSize: "2em" }}>
                  <b>1000 ₺ / Yıl</b>
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <i className="bi bi-check-lg" style={{ color: "green" }}></i>{" "}
                  Menü Tasarımı
                </li>
                <li className="list-group-item">
                  <i className="bi bi-check-lg" style={{ color: "green" }}></i>{" "}
                  Ürün Ekleme
                </li>
                <li className="list-group-item">
                  <i className="bi bi-check-lg" style={{ color: "green" }}></i>{" "}
                  Menü Modülü
                </li>
                <li className="list-group-item">
                  <i className="bi bi-check-lg" style={{ color: "green" }}></i>{" "}
                  Sipariş Modülü
                </li>
              </ul>
              <div className="card-body">
                <button
                  className="btn btn-outline-danger btn-lg"
                  onClick={() => handleClickProduct("11212623")}
                >
                  Satın Al
                </button>
                <Modal isOpen={modal} toggle={toogleModal}>
                  <ModalHeader toggle={toogleModal} close={closeBtn}>
                    Satın Al
                  </ModalHeader>
                  <ModalBody>
                    <iframe
                      name="iFrame1"
                      title="asdasd"
                      src={"https://shopier.com/" + selectedProduct}
                      frameborder="1"
                      scrolling="yes"
                      width="100%"
                      height="500px"
                    ></iframe>
                    {/* <WelcomeRegister /> */}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toogleModal}>
                      Kapat
                    </Button>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={demoModal} toggle={toogleDemoModal}>
                  <ModalHeader toggle={toogleDemoModal} close={closeBtnDemo}>
                    Satın Al
                  </ModalHeader>
                  <ModalBody>
                    <WelcomeRegister />
                    {/* <WelcomeRegister /> */}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toogleDemoModal}>
                      Kapat
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </Col>
          <Col lg="3">
            <div className="card product-card">
              <div className="products-icon-div">
                <i
                  className="bi bi-menu-button"
                  style={{ fontSize: "3em" }}
                ></i>
              </div>
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ color: "red", fontSize: "1.5em" }}
                >
                  <b>Menü Paketi</b>
                </h5>
                <p className="card-text" style={{ fontSize: "2em" }}>
                  <b>500 ₺ / Yıl</b>
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <i className="bi bi-check-lg" style={{ color: "green" }}></i>{" "}
                  Menü Tasarımı
                </li>
                <li className="list-group-item">
                  <i className="bi bi-check-lg" style={{ color: "green" }}></i>{" "}
                  Ürün Ekleme
                </li>
                <li className="list-group-item">
                  <i className="bi bi-check-lg" style={{ color: "green" }}></i>{" "}
                  Menü Modülü
                </li>
                <li className="list-group-item">
                  <i className="bi bi-x-lg" style={{ color: "red" }}></i>{" "}
                  <del>Sipariş Modülü</del>
                </li>
              </ul>
              <div className="card-body">
                <button
                  className="btn btn-outline-danger btn-lg"
                  onClick={() => handleClickProduct("11211678")}
                >
                  Satın Al
                </button>
              </div>
            </div>
          </Col>
          <Col lg="3" />
        </Row>
      </Container>
      <div className="demo-request mt-5">
        <Container
          style={{
            textAlign: "center",
            color: "white",
            paddingTop: "2em",
            paddingBottom: "2em",
          }}
        >
          <h2>
            Demo <span style={{ color: "red" }}>Talebi</span>
          </h2>
          <p>
            <b>QR Kod Menü ve Sipariş Sistemi Mobilgarson</b>'u denemek mi
            istiyorsunuz?
          </p>
          <p>
            <b>Demo</b> taleplerinizi aşağıda bulunan talep formunu doldurarak
            veya bizlere{" "}
            <span style={{ color: "red" }}>iletisim@qrgarsonum.com</span>{" "}
            mailinden ulaşarak iletebilirsiniz.
          </p>
          <button className="btn btn-danger btn-lg" onClick={toogleDemoModal}>
            Demo Talebi
          </button>
        </Container>
      </div>
      <div className="welcome-footer mt-5">
        <Container style={{ padding: "2em" }}>
          <Row>
            <Col md="6">
              <div className="welcome-footer-register" id="basvur">
                <WelcomeRegister />
              </div>
            </Col>
            <Col md="6" style={{ color: "white" }}>
              <h5>Hakkımızda</h5>
              <p>
                qrgarsonum.com bir QR menü ve sipariş projesidir. Talep formunu
                doldurarak başvuruda bulunabilirsiniz. Taleplerinize en geç 1
                saat içerisinde dönüş sağlanacaktır. Kurulum yaptırmak
                isterseniz sistemi 1 saat içerisinde kullanabilir halde teslim
                edeceğiz.
              </p>
              <hr style={{ color: "white", height: "2px" }} />
              <p>
                Qrgarsonum ile ilgili yaptığınız geribildirimler bizim için çok
                önemlidir. Qrgarson paneliniz içerisinde yer alan Bildir
                sekmesinden yaptığınız geri dönüşler kesinlikle dikkate alınıp
                süratle geri dönüş sağlanacaktır.
              </p>
              <hr style={{ color: "white", height: "2px" }} />
              <p style={{ color: "gray" }}>
                Tags : QR Kod Menü, QR Kod Menü Sistemi, QR Kod, QR Kod Menü ve
                Sipariş Sistemi, QR Kodlu Sipariş Sistemi, Mobil Garson, Online
                Sipariş Sistemi, Online Adisyon Sistemi, Adisyon, Pos Sistemi,
                Sanal Sarson, Sanal Sipariş, Garson Uygulaması, Pos Sistemi,
                e-sipariş, Restaurant Sipariş Sistemi, Cafe Sipariş Sistemi,
                Sanal Menü, Restaurant İçi Sipariş Alma, Pos Sistemi, Adisyon
                Sistemi, Restaurant Pos Sistemleri, Adisyon Sistemi Fiyatları,
                Pos Sistemi, Adisyon Sistemi, Sipariş Sistemi, Pos Adisyon
                Sistemi
              </p>
            </Col>
          </Row>
          <div style={{ color: "white", textAlign: "center" }}>
            <h5>Sosyal Medya</h5>
            <a
              href="https://www.instagram.com/egarsonum"
              target="_blank"
              rel="noreferrer"
              className="social-icons"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/egarsonum-101204478924751"
              target="_blank"
              rel="noreferrer"
              className="social-icons"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://twitter.com/egarsonum"
              target="_blank"
              rel="noreferrer"
              className="social-icons"
            >
              <i className="bi bi-twitter"></i>
            </a>
          </div>
          <div
            style={{ textAlign: "center", color: "white", marginTop: "3em" }}
          >
            <p style={{ color: "red" }}>qrgarsonum.com</p>
            <p>Online Adisyon Sistemi</p>
            <p>Copyright © 2021 - Tüm Hakkı Saklıdır</p>
            <p style={{ color: "gray" }}>
              Bu sayfada yer alan bütün bilgileri değiştirme hakkı
              qrgarsonum.com'a aittir.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
