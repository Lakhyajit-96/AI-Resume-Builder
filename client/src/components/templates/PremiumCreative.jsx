import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const PremiumCreative = ({ data = {}, accentColor = '#3B82F6' }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      <div className="flex items-start gap-6 mb-6">
        <div className="flex-shrink-0">
          {data.personal_info?.image && (
            <img src={data.personal_info.image} alt="profile" className="w-24 h-24 rounded-full object-cover border-4" style={{ borderColor: accentColor }} />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: accentColor }}>{data.personal_info?.full_name || 'Your Name'}</h1>
          <p className="text-sm text-gray-600">{data.personal_info?.profession}</p>
          <div className="mt-2 text-sm text-gray-700">{data.personal_info?.email} • {data.personal_info?.phone}</div>
        </div>
      </div>

      {data.professional_summary && (
        <div className="mb-4">
          <h3 className="text-sm uppercase text-gray-500" style={{ color: accentColor }}>Profile</h3>
          <p className="mt-2 text-gray-700 whitespace-pre-line">{data.professional_summary}</p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm uppercase text-gray-500" style={{ color: accentColor }}>Work</h3>
          <div className="mt-3 space-y-3">
            {data.experience.map((e, i) => (
              <div key={i} className="p-3 rounded-md border border-gray-100">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{e.position}</h4>
                    <p className="text-sm text-gray-600">{e.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">{e.is_current ? 'Present' : formatDate(e.end_date)}</div>
                </div>
                {e.description && <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.project && data.project.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm uppercase text-gray-500" style={{ color: accentColor }}>Projects</h3>
          <div className="mt-2 space-y-3">
            {data.project.map((p, idx) => (
              <div key={idx}>
                <h4 className="font-medium">{p.name}</h4>
                {p.description && <p className="text-sm text-gray-700">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-8">
        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-sm uppercase tracking-wide" style={{ color: accentColor }}>Education</h3>
            <div className="mt-2 space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h3 className="text-sm uppercase tracking-wide" style={{ color: accentColor }}>Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((s, idx) => (
                <span key={idx} className="px-3 py-1 text-sm text-white rounded-full" style={{ backgroundColor: accentColor }}>{s}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PremiumCreative;
