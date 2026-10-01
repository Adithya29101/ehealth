import React from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { DISTRICT_HOSPITALS } from '../data/districtsAndHospitals';

export default function HospitalSelector({
  selectedDistrict,
  setSelectedDistrict,
  selectedHospital,
  setSelectedHospital,
}) {
  const districts = Object.keys(DISTRICT_HOSPITALS);
  const hospitals = DISTRICT_HOSPITALS[selectedDistrict] || [];

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectedDistrict(newDistrict);
    setSelectedHospital(DISTRICT_HOSPITALS[newDistrict][0]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> District
        </label>
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="w-full p-2.5 text-sm border rounded-lg bg-white outline-none"
        >
          {districts.map((dist) => (
            <option key={dist} value={dist}>{dist}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Hospital
        </label>
        <select
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
          className="w-full p-2.5 text-sm border rounded-lg bg-white outline-none"
        >
          {hospitals.map((hosp) => (
            <option key={hosp} value={hosp}>{hosp}</option>
          ))}
        </select>
      </div>
    </div>
  );
}