import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { Formik } from "formik";
import { string, object } from "yup";
import { connect } from "react-redux";
import { Fetch_User,Clear_User_Login } from "../reduxstore/Actioncreator.jsx";
import Swal from "sweetalert2";
import { Alert } from "../Alert/Alert.jsx";

const input =
  "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100";

// ==================== Validation Schema ====================
const validate = object({
  email: string().email("Invalid email").required("Enter email"),
  password: string()
    .required("Enter password")
    .min(6, "Password must be at least 6 characters"),
});

// ==================== Redux ====================
const mapStateToProps = (state) => {
  return {
    r_token:state.Auth_Reducer.r_token,
    a_token:state.Auth_Reducer.a_token,
    iS_user_login_loading: state.Auth_Reducer.iS_user_login_loading,
    uSER_login_failed: state.Auth_Reducer.uSER_login_failed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Fetch_User: (data) => dispatch(Fetch_User(data)),
    // Clear_Login: () => dispatch(Clear_Login()),
  };
};

function Login(props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const {
    a_token,
    uSER_login_failed,
    Fetch_User,
    iS_user_login_loading,
  } = props;

  // ==================== Success / Error ====================


  // ==================== Submit Handler ====================
  const handleFormSubmit = (values, { resetForm }) => {
    const { email, password } = values;

    const payload = {
      email,
      password,
    };
    Fetch_User(payload);
    resetForm();
  };
  useEffect(()=>{
    if(a_token){
      Alert('success','login success','Thank you')
      navigate('/')
    }
    else if(uSER_login_failed){
      Alert('warning','failed',uSER_login_failed)

    }

  },[uSER_login_failed,a_token])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900 px-4 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative w-full max-w-sm">
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
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Sign in to your client account
              </p>
            </div>

            {/* ==================== Form ==================== */}
            <Formik
              initialValues={{
                email: "",
                password: "",
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

                  {/* Password */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <Link
                        to="/create"
                        className="text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700"
                      >
                        Create Account?
                      </Link>
                    </div>
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
                        title="Show password"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
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

                  {/* Remember me */}
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 accent-red-600"
                    />
                    Remember me
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={iS_user_login_loading}
                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition ${
                      iS_user_login_loading
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 shadow-red-600/25 hover:bg-red-700"
                    }`}
                  >
                    {iS_user_login_loading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <Icon
                          name="arrow"
                          className="h-4 w-4 transition group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </Formik>
          </div>

          {/* ==================== Footer ==================== */}
          <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-7 py-3 text-xs text-slate-500 dark:text-slate-400">
            <Icon
              name="shield"
              className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
            />
            Secure sign in ·{" "}
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
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);