import React from 'react';

function FeatureCard({ icon: Icon, title, description, bgClass, iconClass }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className={`${bgClass} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
        <Icon className={`${iconClass} w-6 h-6`} />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
