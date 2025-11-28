import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const PremiumDarkElegant = ({ data = {}, accentColor = '#10B981' }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-100" style={{fontFamily: 'Inter, ui-sans-serif, system-ui'}}>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-gray-800 p-4 rounded-md">
          <div className="flex flex-col items-center text-center">
            {data.personal_info?.image && (
              <img
                src={data.personal_info.image}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover object-center mb-3 border-2"
                style={{ borderColor: accentColor }}
              />
            )}
            <h2 className="text-lg font-semibold" style={{color: accentColor}}>{data.personal_info?.full_name || 'Your Name'}</h2>
            <p className="text-sm text-gray-300">{data.personal_info?.profession}</p>

            <div className="mt-4 text-sm text-gray-300 space-y-2">
              {data.personal_info?.email && <div className="flex items-center gap-2"><Mail className="size-4"/> {data.personal_info.email}</div>}
              {data.personal_info?.phone && <div className="flex items-center gap-2"><Phone className="size-4"/> {data.personal_info.phone}</div>}
              {data.personal_info?.location && <div className="flex items-center gap-2"><MapPin className="size-4"/> {data.personal_info.location}</div>}
              {data.personal_info?.linkedin && <div className="flex items-center gap-2"><Linkedin className="size-4"/> <a href={data.personal_info.linkedin} className="break-all text-sm text-gray-300">Profile</a></div>}
            </div>

            {data.skills && data.skills.length > 0 && (
              <div className="mt-4 w-full">
                <h4 className="text-xs uppercase text-gray-400">Skills</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-gray-700" style={{backgroundColor: 'rgba(255,255,255,0.03)'}}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 bg-gray-900 p-4 rounded-md">
          {data.professional_summary && (
            <section className="mb-4">
              <h3 className="text-sm uppercase text-gray-400" style={{color: accentColor}}>Summary</h3>
              <p className="mt-2 text-gray-200 whitespace-pre-line">{data.professional_summary}</p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section className="mb-4">
              <h3 className="text-sm uppercase text-gray-400" style={{color: accentColor}}>Experience</h3>
              <div className="mt-3 space-y-3">
                {data.experience.map((e, idx) => (
                  <div key={idx} className="p-3 bg-gray-800 rounded">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-100">{e.position}</h4>
                        <p className="text-sm text-gray-300">{e.company}</p>
                      </div>
                      <div className="text-sm text-gray-400">{formatDate(e.start_date)} - {e.is_current ? 'Present' : formatDate(e.end_date)}</div>
                    </div>
                    {e.description && <p className="text-sm text-gray-200 mt-2 whitespace-pre-line">{e.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.project && data.project.length > 0 && (
            <section className="mb-4">
              <h3 className="text-sm uppercase text-gray-400" style={{color: accentColor}}>Projects</h3>
              <div className="mt-3 space-y-2">
                {data.project.map((p, i) => (
                  <div key={i}>
                    <h4 className="font-medium text-gray-100">{p.name}</h4>
                    {p.description && <p className="text-sm text-gray-300">{p.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {data.education && data.education.length > 0 && (
              <section>
                <h4 className="text-sm uppercase text-gray-400" style={{color: accentColor}}>Education</h4>
                <div className="mt-2 space-y-2 text-gray-300">
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <h5 className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</h5>
                      <p className="text-sm">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.skills && data.skills.length > 0 && (
              <section>
                <h4 className="text-sm uppercase text-gray-400" style={{color: accentColor}}>More Skills</h4>
                <div className="mt-2 text-gray-300">
                  {data.skills.slice(0,8).map((s,i)=>(<div key={i} className="text-sm">• {s}</div>))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumDarkElegant;
