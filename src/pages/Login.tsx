import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/signin", { email, password });

      const token = res.data.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setError("");
        await Swal.fire({
          icon: "success",
          title: "تم تسجيل الدخول بنجاح!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      } else {
        setError("لم يتم استلام التوكن من السيرفر.");
        await Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "لم يتم استلام التوكن من السيرفر.",
        });
      }
    } catch (err: any) {
      setError("فشل تسجيل الدخول، تحقق من بياناتك.");
      await Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "فشل تسجيل الدخول، تحقق من بياناتك.",
      });
      console.error("Login error:", err.response || err.message || err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white/70 backdrop-blur-md shadow-xl rounded-3xl flex flex-col gap-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-sky-800">
          تسجيل الدخول
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
          تسجيل الدخول
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-center text-gray-600">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-sky-700 hover:underline font-semibold">
            إنشاء حساب جديد
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;