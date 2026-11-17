import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { Formik } from "formik";
import { string, object, ref } from "yup";
import { connect } from "react-redux";
import {
  Clear_Register,
  Fetch_Register,
} from "../reduxstore/Actioncreator.jsx";
import { Alert } from "../Alert/Alert.jsx";

const input =
  "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100";

// ==================== Validation Schema ====================
const validate = object({
  email: string().email("Invalid email").required("Enter email"),
  full_name: string().required("Enter full name"),
  phone: string()
    .required("Enter phone")
    .matches(/^\d{11}$/, "Phone must be 11 digits"),
  password: string()
    .required("Enter password")
    .min(6, "Password must be at least 6 characters"),
  confirm_password: string()
    .required("Confirm password")
    .oneOf([ref("password"), null], "Passwords must match"),
  thana: string().required("Enter thana"),
  zila: string().required("Enter zila"),
  address: string().required("Enter address"),
});
const mapStateToProps = (state) => {
  return {
    iS_register_loading: state.Auth_Reducer.iS_register_loading,
    rEGISTER_success: state.Auth_Reducer.rEGISTER_success,
    rEGISTER_failed: state.Auth_Reducer.rEGISTER_failed,
  };
};
// ==================== Redux ====================
const mapDispatchToProps = (dispatch) => {
  return {
    Fetch_Register: (data) => dispatch(Fetch_Register(data)),
    Clear_Register: () => dispatch(Clear_Register()),
  };
};

function Createaccount(props) {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    Fetch_Register,
    Clear_Register,
    iS_register_loading,
    rEGISTER_success,
    rEGISTER_failed,
  } = props;

  // ==================== Submit Handler ====================
  const handleFormSubmit = (values, { resetForm }) => {
    const { email, password, full_name, phone, thana, zila, address } = values;

    const payload = {
      email,
      password,
      full_name,
      phone,
      thana,
      zila,
      address,
    };
    Fetch_Register(payload);
    console.log("Register payload:", payload);

    // TODO: dispatch(Fetch_Register(payload));

    resetForm();
    // navigate("/login");
  };
  useEffect(() => {
    if (rEGISTER_success) {
      Alert("success", "account create", 'thank you');
      Clear_Register();
      navigate("/login");
    } else if (rEGISTER_failed) {
      Alert("warning", "failed", rEGISTER_failed);
      Clear_Register();
    }
    console.log('run ',rEGISTER_failed)
  }, [rEGISTER_success, rEGISTER_failed]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900 px-4 py-12">
      {iS_register_loading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-200/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/60">
              <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-orange-500" />
              <div className="px-7 pb-7 pt-8">
                {/* ==================== Header ==================== */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-lg font-extrabold text-white shadow-md shadow-red-600/30">
                      H
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                        HELFIGER
                      </div>
                      <div className="text-[10px] font-semibold tracking-[0.3em] text-slate-400 dark:text-slate-500">
                        TRUST
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-6 text-xl font-bold tracking-tight">
                    Create your account
                  </h1>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Sign up as a customer
                  </p>
                </div>

                {/* ==================== Form ==================== */}
                <Formik
                  initialValues={{
                    email: "",
                    full_name: "",
                    phone: "",
                    password: "",
                    confirm_password: "",
                    thana: "",
                    zila: "",
                    address: "",
                  }}
                  onSubmit={(values, { resetForm }) =>
                    handleFormSubmit(values, { resetForm })
                  }
                  validationSchema={validate}
                >
                  {({
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    values,
                  }) => (
                    <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
                      {/* Full Name */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Full Name
                        </label>
                        <div className="relative">
                          <Icon
                            name="user"
                            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                          />
                          <input
                            type="text"
                            name="full_name"
                            value={values.full_name}
                            placeholder="Your full name"
                            className={input}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.full_name && touched.full_name ? (
                          <span className="text-red-700 text-[13px] font-medium">
                            {errors.full_name}
                          </span>
                        ) : null}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Email address
                        </label>
                        <div className="relative">
                          <Icon
                            name="mail"
                            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                          />
                          <input
                            type="email"
                            name="email"
                            value={values.email}
                            placeholder="you@example.com"
                            className={input}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.email && touched.email ? (
                          <span className="text-red-700 text-[13px] font-medium">
                            {errors.email}
                          </span>
                        ) : null}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Phone
                        </label>
                        <div className="relative">
                          <Icon
                            name="phone"
                            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                          />
                          <input
                            type="text"
                            name="phone"
                            value={values.phone}
                            placeholder="01XXXXXXXXX"
                            maxLength={11}
                            className={input}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.phone && touched.phone ? (
                          <span className="text-red-700 text-[13px] font-medium">
                            {errors.phone}
                          </span>
                        ) : null}
                      </div>

                      {/* Password */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Password
                        </label>
                        <div className="relative">
                          <Icon
                            name="lock"
                            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                          />
                          <input
                            type={show ? "text" : "password"}
                            name="password"
                            value={values.password}
                            placeholder="••••••••"
                            className={`${input} pr-10`}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            onClick={() => setShow((v) => !v)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700"
                          >
                            <Icon
                              name={show ? "eye" : "eyeOff"}
                              className="h-4 w-4"
                            />
                          </button>
                        </div>
                        {errors.password && touched.password ? (
                          <span className="text-red-700 text-[13px] font-medium">
                            {errors.password}
                          </span>
                        ) : null}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Icon
                            name="lock"
                            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                          />
                          <input
                            type={showConfirm ? "text" : "password"}
                            name="confirm_password"
                            value={values.confirm_password}
                            placeholder="••••••••"
                            className={`${input} pr-10`}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700"
                          >
                            <Icon
                              name={showConfirm ? "eye" : "eyeOff"}
                              className="h-4 w-4"
                            />
                          </button>
                        </div>
                        {errors.confirm_password && touched.confirm_password ? (
                          <span className="text-red-700 text-[13px] font-medium">
                            {errors.confirm_password}
                          </span>
                        ) : null}
                      </div>

                      {/* Thana + Zila (2 column) */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Thana
                          </label>
                          <input
                            type="text"
                            name="thana"
                            value={values.thana}
                            placeholder="Thana"
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            onChange={handleChange}
                          />
                          {errors.thana && touched.thana ? (
                            <span className="text-red-700 text-[13px] font-medium">
                              {errors.thana}
                            </span>
                          ) : null}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Zila
                          </label>
                          <input
                            type="text"
                            name="zila"
                            value={values.zila}
                            placeholder="Zila"
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            onChange={handleChange}
                          />
                          {errors.zila && touched.zila ? (
                            <span className="text-red-700 text-[13px] font-medium">
                              {errors.zila}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={values.address}
                          placeholder="House, Road, Area..."
                          rows={3}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 resize-none"
                          onChange={handleChange}
                        />
                        {errors.address && touched.address ? (
                          <span className="text-red-700 text-[13px] font-medium">
                            {errors.address}
                          </span>
                        ) : null}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/25 hover:bg-red-700"
                      >
                        Create Account
                        <Icon
                          name="arrow"
                          className="h-4 w-4 transition group-hover:translate-x-0.5"
                        />
                      </button>

                      {/* Login link */}
                      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="font-semibold text-red-600 dark:text-red-400 hover:text-red-700"
                        >
                          Sign in
                        </Link>
                      </p>
                    </form>
                  )}
                </Formik>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-7 py-3 text-xs text-slate-500 dark:text-slate-400">
                <Icon
                  name="shield"
                  className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                />
                Secure sign up ·{" "}
                <a
                  href="#"
                  className="font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  Need help?
                </a>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
              © 2026 MHM Soft IT Solutions
            </p>
          </div>
        </>
      )}
      {/* Background blobs */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Createaccount);
