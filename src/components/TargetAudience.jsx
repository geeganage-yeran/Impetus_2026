import {
  Users,
  GraduationCap,
  Microscope,
  Award,
  Briefcase,
  Globe,
  UserCheck,
} from "lucide-react";

export default function TargetAudience() {
  const audiences = [
    {
      icon: GraduationCap,
      title: "Students & Graduates",
      description:
        "Undergraduate, Postgraduate Students and Graduates of Uva Wellassa University and other local/international universities",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Academic Staff",
      description:
        "Academic staff and research supervisors guiding undergraduate/postgraduate research",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "IEEE Members",
      description: "IEEE Student Members of local and international branches",
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Microscope,
      title: "Young Researchers",
      description:
        "Young researchers and research enthusiasts in the early stages of their academic journey",
      color: "green",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: UserCheck,
      title: "Research Mentors",
      description: "Alumni involved in research mentorship",
      color: "rose",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "International Community",
      description:
        "Researchers and academics from universities and institutions worldwide",
      color: "teal",
      gradient: "from-teal-500 to-cyan-500",
    }
  ];

  return (
    <section className="relative py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold uppercase tracking-wider">
              Who Should Attend
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-4">
            Target Audience
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            IMPETUS welcomes a diverse community of researchers, academics, and
            industry professionals
          </p>
        </div>

        {/* Audience Cards Grid */}
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 hover:border-transparent"
              >
                {/* Icon Container */}
                <div className="mb-6">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${audience.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {audience.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {audience.description}
                </p>

                {/* Decorative Element */}
                <div
                  className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${audience.gradient} rounded-full transition-all duration-500`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
