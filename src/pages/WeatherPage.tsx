import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";
// import type { WeatherDataType } from "../utils/weatherTypes";
// import { getWeather } from "../services/weatherService";
// import ThemeToggle from "../components/ThemeToggle";

const WeatherPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("sun") || desc.includes("clear")) {
      return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    } else if (desc.includes("cloud")) {
      return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
    } else if (desc.includes("rain")) {
      return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    } else if (desc.includes("storm") || desc.includes("thunder")) {
      return "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
    }
    return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await getWeather(latitude, longitude); 
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "حدث خطأ في جلب بيانات الطقس.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "هل تريد تسجيل الخروج؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: " تسجيل خروج",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/login");
        Swal.fire("تم", "تم تسجيل الخروج بنجاح.", "success");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 px-4 py-8">
      <div className="w-full max-w-2xl p-8 bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl flex flex-col gap-6">
        <button
          onClick={handleLogout}
          className="self-end bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl transition"
        >
          تسجيل الخروج
        </button>
        {/* <ThemeToggle /> */}

        <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-4">
          البحث عن حالة الطقس{" "}
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Latitude (مثال: 24.7)"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />

          <input
            type="text"
            placeholder="Longitude (مثال: 46.7)"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>

        <button
          onClick={fetchWeather}
          className="bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl text-lg transition"
        >
          عرض الطقس
        </button>

        {loading && (
          <div className="text-center text-sky-700 text-lg font-medium">
            جاري جلب البيانات...
          </div>
        )}

        {weather && (
          <div className="mt-6 border border-gray-300 rounded-2xl p-6 bg-white/95 shadow-lg max-w-full w-full">
            <h3 className="text-2xl font-semibold mb-4 text-sky-800 border-b border-sky-300 pb-2">
              نتائج الطقس
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={getWeatherIcon(weather.description || "")}
                alt="Weather Icon"
                className="w-24 h-24"
              />

              <div className="grid grid-cols-1 gap-3 text-lg text-gray-700 w-full">
                <p>
                  <span className="font-semibold text-sky-600">
                    درجة الحرارة:
                  </span>{" "}
                  {weather.tempC}°C
                </p>
                <p>
                  <span className="font-semibold text-sky-600">الرطوبة:</span>{" "}
                  {weather.humidity}%
                </p>
                <p>
                  <span className="font-semibold text-sky-600">الوصف:</span>{" "}
                  {weather.description}
                </p>
                <p>
                  <span className="font-semibold text-sky-600">المصدر:</span>{" "}
                  {weather.source}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
