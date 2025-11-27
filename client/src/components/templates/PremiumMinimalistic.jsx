import React from 'react';
import { Mail, Phone } from 'lucide-react';

const PremiumMinimalistic = ({ data = {}, accentColor = '#3B82F6' }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 leading-relaxed">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-light" style={{ color: accentColor }}>{data.personal_info?.full_name || 'Your Name'}</h1>
          <p className="text-sm text-gray-600">{data.personal_info?.profession}</p>
        </div>
        <div className="text-sm text-gray-700">
          {data.personal_info?.email && (<div className="flex items-center gap-2"><Mail className="size-4" /> {data.personal_info.email}</div>)}
          {data.personal_info?.phone && (<div className="flex items-center gap-2"><Phone className="size-4" /> {data.personal_info.phone}</div>)}
        </div>
      </div>

      {data.professional_summary && (
        <section className="mb-4">
          <h3 className="text-sm uppercase" style={{ color: accentColor }}>Summary</h3>
          <p className="mt-2 text-gray-700 whitespace-pre-line">{data.professional_summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <h3 className="text-sm uppercase" style={{ color: accentColor }}>Experience</h3>
          <div className="mt-2 space-y-3">
            {data.experience.map((e, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <h4 className="font-medium">{e.position}</h4>
                  <p className="text-sm text-gray-600">{e.company}</p>
                </div>
                <div className="text-sm text-gray-500">{e.is_current ? 'Present' : formatDate(e.end_date)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.project && data.project.length > 0 && (
        <section className="mb-4">
          <h3 className="text-sm uppercase" style={{ color: accentColor }}>Projects</h3>
          <div className="mt-2 space-y-3">
            {data.project.map((p, idx) => (
              <div key={idx}>
                <h4 className="font-medium">{p.name}</h4>
                {p.description && <p className="text-sm text-gray-700">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-sm uppercase" style={{ color: accentColor }}>Education</h3>
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

        {data.skills && data.skills.length > 0 && (
          <section>
            <h3 className="text-sm uppercase" style={{ color: accentColor }}>Skills</h3>
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

export default PremiumMinimalistic;
