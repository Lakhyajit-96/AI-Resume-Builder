import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const PremiumCard = ({ data = {}, accentColor = '#3B82F6' }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-1">
          {data.personal_info?.image && (
            <img
              src={data.personal_info.image}
              alt="profile"
              className="w-full h-40 object-cover object-center rounded-md mb-4"
            />
          )}
          <h2 className="text-xl font-semibold">{data.personal_info?.full_name || 'Your Name'}</h2>
          <p className="text-sm text-gray-600">{data.personal_info?.profession}</p>
          <div className="mt-4 text-sm text-gray-700 space-y-1">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="size-4" />
                <span className="break-all">{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2">
                <Globe className="size-4" />
                <span className="break-all">{data.personal_info.website}</span>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2">
          {/* Professional Summary */}
          {data.professional_summary && (
            <div className="mb-4">
              <h3 className="text-sm uppercase tracking-wide" style={{ color: accentColor }}>About</h3>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{data.professional_summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm uppercase tracking-wide" style={{ color: accentColor }}>Experience</h3>
              <div className="mt-2 space-y-3">
                {data.experience.map((e, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{e.position}</h4>
                        <p className="text-sm text-gray-600">{e.company}</p>
                      </div>
                      <div className="text-sm text-gray-500">{e.is_current ? 'Present' : formatDate(e.end_date)}</div>
                    </div>
                    {e.description && <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{e.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.project && data.project.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm uppercase tracking-wide" style={{ color: accentColor }}>Projects</h3>
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
      </div>
    </div>
  );
};

export default PremiumCard;
