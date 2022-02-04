import React from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  FormFeedback,
} from "reactstrap";
import ApplicationService from "../../services/ApplicationService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function WelcomeRegister() {
  let applicationService = new ApplicationService();

  const applicationAddSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Bu alan zorunludur")
      .min(2, "İki karakterden kısa olamaz"),
    email: Yup.string()
      .required("Bu alan zorunludur")
      .email("Geçerli bir email adresi giriniz"),
    name: Yup.string()
      .required("Bu alan zorunludur")
      .min(2, "İki karakterden kısa olamaz"),
    phone: Yup.string()
      .required("Bu alan zorunludur")
      .min(10, "Geçerli bir telefon numarası giriniz")
      .max(13, "Geçerli bir telefon numarası giriniz"),
    note: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      name: "",
      phone: "",
      note: "",
    },
    validationSchema: applicationAddSchema,
    onSubmit: (values) => {
      applicationService
        .add(values)
        .then((result) => {
          toast.success(result.data.message);
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  return (
    <div>
      <Form style={{ padding: "2em" }} onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="companyName">İşletme Adı</Label>
              <Input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="İşletme Adı"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  formik.errors.companyName && formik.touched.companyName
                }
              ></Input>
              <FormFeedback>{formik.errors.companyName}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="name">Ad Soyad</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Ad Soyad"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.errors.name && formik.touched.name}
              ></Input>
              <FormFeedback>{formik.errors.name}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="phone">Telefon Numarası</Label>
              <Input
                type="number"
                name="phone"
                id="phone"
                placeholder="Telefon Numarası"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.errors.phone && formik.touched.phone}
              ></Input>
              <FormFeedback>{formik.errors.phone}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.errors.email && formik.touched.email}
              ></Input>
              <FormFeedback>{formik.errors.email}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="note">Mesaj</Label>
          <Input
            type="textarea"
            name="note"
            id="note"
            placeholder="Mesajınız"
            value={formik.values.note}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={formik.errors.note && formik.touched.note}
          ></Input>
          <FormFeedback>{formik.errors.note}</FormFeedback>
        </FormGroup>
        <Button color="primary" className="mt-2" type="submit">
          Başvur
        </Button>
        <div>
          <a
            href="https://wa.me/905313966281"
            className="btn btn-success mt-2"
            style={{ marginLeft: "1em" }}
          >
            <i className="bi bi-whatsapp"></i> Whatsapp +90 531 396 6281
          </a>
          <a
            href="mailto:egarsonum@gmail.com"
            className="btn btn-danger mt-2"
            style={{ marginLeft: "1em" }}
          >
            <i className="bi bi-envelope"></i> Mail egarsonum@gmail.com
          </a>
        </div>
      </Form>
    </div>
  );
}
