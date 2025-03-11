import React from "react";
import { Camera } from "lucide-react";

function Profile() {
  const studentInfo = {
    personal: {
      fullName: "John Smith",
      birthDate: "1999-05-15",
      passport: "AA1234567",
      phone: "+998 90 123 45 67",
      email: "john.smith@example.com",
      address: "Toshkent sh., Chilonzor t., 15-uy",
    },
    academic: {
      faculty: "Kompyuter injiniringi fakulteti",
      direction: "Dasturiy injiniring",
      group: "318-21",
      course: 2,
      type: "To'lov-kontrakt",
      status: "Aktiv",
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Profil</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-400">JS</span>
            </div>
            <button className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow-lg">
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {studentInfo.personal.fullName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Fakultet</p>
                <p className="font-medium">{studentInfo.academic.faculty}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Yo'nalish</p>
                <p className="font-medium">{studentInfo.academic.direction}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Guruh</p>
                <p className="font-medium">{studentInfo.academic.group}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kurs</p>
                <p className="font-medium">
                  {studentInfo.academic.course}-kurs
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t">
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Shaxsiy ma'lumotlar
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tug'ilgan sana</p>
                <p className="font-medium">{studentInfo.personal.birthDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Passport</p>
                <p className="font-medium">{studentInfo.personal.passport}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <p className="font-medium">{studentInfo.personal.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{studentInfo.personal.email}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Manzil</p>
                <p className="font-medium">{studentInfo.personal.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t">
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              O'qish ma'lumotlari
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">O'qish turi</p>
                <p className="font-medium">{studentInfo.academic.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Holati</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {studentInfo.academic.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
