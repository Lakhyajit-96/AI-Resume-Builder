import React from 'react';

const PremiumAesthetic = ({ data = {}, accentColor = '#8B5CF6' }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 text-gray-900 rounded-md shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold" style={{ color: accentColor }}>{data.personal_info?.full_name || 'Your Name'}</h1>
          <p className="text-sm text-gray-600">{data.personal_info?.profession}</p>
        </div>
        {data.personal_info?.image && (
          <img
            src={data.personal_info.image}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover object-center border-2"
            style={{ borderColor: accentColor }}
          />
        )}
      </div>

      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="text-sm uppercase text-gray-500" style={{ color: accentColor }}>Profile</h2>
          <p className="mt-2 text-gray-700 whitespace-pre-line">{data.professional_summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm uppercase text-gray-500" style={{ color: accentColor }}>Experience</h2>
          <div className="mt-3 space-y-3">
            {data.experience.map((e,i)=>(
              <div key={i} className="p-3 border-l-2" style={{ borderLeftColor: accentColor }}>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{e.position}</h4>
                    <p className="text-sm text-gray-600">{e.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">{formatDate(e.start_date)} - {e.is_current ? 'Present' : formatDate(e.end_date)}</div>
                </div>
                {e.description && <p className="text-sm text-gray-700 mt-2">{e.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {data.project && data.project.length > 0 && (
          <section>
            <h3 className="text-sm uppercase text-gray-500" style={{ color: accentColor }}>Projects</h3>
            <div className="mt-2 space-y-3">
              {data.project.map((p,i)=>(
                <div key={i}>
                  <h4 className="font-medium">{p.name}</h4>
                  {p.description && <p className="text-sm text-gray-700">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="text-sm uppercase text-gray-500" style={{ color: accentColor }}>Education</h3>
            <div className="mt-2 space-y-3">
              {data.education.map((edu,i)=>(
                <div key={i}>
                  <h4 className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section>
            <h3 className="text-sm uppercase text-gray-500" style={{ color: accentColor }}>Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((s,i)=>(<span key={i} className="px-3 py-1 text-sm text-white rounded-full" style={{ backgroundColor: accentColor }}>{s}</span>))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PremiumAesthetic;
