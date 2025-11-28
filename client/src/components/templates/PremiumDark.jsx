import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const PremiumDark = ({ data = {}, accentColor = '#3B82F6' }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-gray-100 leading-relaxed" style={{ color: '#e5e7eb' }}>
      {/* Header */}
      <header className="mb-6 pb-4 border-b" style={{ borderColor: '#111827' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold" style={{ color: accentColor }}>{data.personal_info?.full_name || 'Your Name'}</h1>
            <p className="text-sm text-gray-300">{data.personal_info?.profession}</p>
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

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2"><Mail className="size-4" /> <span>{data.personal_info.email}</span></div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2"><Phone className="size-4" /> <span>{data.personal_info.phone}</span></div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2"><MapPin className="size-4" /> <span>{data.personal_info.location}</span></div>
          )}
          {data.personal_info?.linkedin && (
            <a target="_blank" rel="noreferrer" href={data.personal_info.linkedin} className="flex items-center gap-2"><Linkedin className="size-4" /> <span className="break-all">{data.personal_info.linkedin}</span></a>
          )}
        </div>
      </header>

      <main>
        {data.professional_summary && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold" style={{ color: accentColor }}>Professional Summary</h2>
            <p className="text-gray-300 mt-2 whitespace-pre-line">{data.professional_summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold" style={{ color: accentColor }}>Experience</h2>
            <div className="mt-3 space-y-4">
              {data.experience.map((e, i) => (
                <div key={i} className="p-3 rounded border border-gray-800">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{e.position}</h3>
                      <p className="text-sm text-gray-400">{e.company}</p>
                    </div>
                    <div className="text-sm text-gray-400">{formatDate(e.start_date)} - {e.is_current ? 'Present' : formatDate(e.end_date)}</div>
                  </div>
                  {e.description && <p className="text-sm text-gray-300 mt-2 whitespace-pre-line">{e.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.project && data.project.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold" style={{ color: accentColor }}>Projects</h2>
            <div className="mt-3 space-y-3">
              {data.project.map((p, idx) => (
                <div key={idx}>
                  <h4 className="font-medium">{p.name}</h4>
                  {p.description && <p className="text-sm text-gray-300">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {data.education && data.education.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold" style={{ color: accentColor }}>Education</h3>
              <div className="mt-2 space-y-3 text-gray-300">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                    <p className="text-sm">{edu.institution}</p>
                    <div className="text-sm text-gray-400">{formatDate(edu.graduation_date)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills && data.skills.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold" style={{ color: accentColor }}>Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 text-sm rounded-full bg-gray-800" style={{ color: '#fff', backgroundColor: '#111827' }}>{s}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default PremiumDark;
