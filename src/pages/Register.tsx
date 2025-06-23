import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/signup", { email, password });

      console.log("Response from backend:", res.data);

      const token = res.data.data.token;

      if (token) {
        localStorage.setItem("token", token);
        await Swal.fire({
          icon: "success",
          title: "تم إنشاء الحساب بنجاح!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      } else {
        setError("لم يتم التسجيل بنجاح.");
        await Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "لم يتم التسجيل بنجاح.",
        });
      }
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setError("البريد الإلكتروني مستخدم مسبقًا، الرجاء اختيار بريد آخر.");
        await Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "البريد الإلكتروني مستخدم مسبقًا، الرجاء اختيار بريد آخر.",
        });
      } else {
        setError("فشل إنشاء الحساب. تأكد من البيانات.");
        await Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "فشل إنشاء الحساب. تأكد من البيانات.",
        });
      }
      console.error("Registration error:", err.response || err.message || err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white/70 backdrop-blur-md shadow-xl rounded-3xl flex flex-col gap-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-sky-800">
          تسجيل جديد
        </h2>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          required
        />

        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl text-lg transition"
        >
          إنشاء الحساب
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-center text-gray-600">
          لديك حساب؟{" "}
          <Link
            to="/login"
            className="text-sky-700 hover:underline font-semibold"
          >
            تسجيل الدخول
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
