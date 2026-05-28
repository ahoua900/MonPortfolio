import {
  Document, Page, Text, View, Image, StyleSheet,
} from '@react-pdf/renderer';
import { personalInfo, experiences, education, skills } from '../../data/portfolio';

const ACCENT = '#F04500';
const DARK   = '#1A1A1A';
const DARK2  = '#333333';
const GRAY   = '#666666';
const LGRAY  = '#999999';
const LINE   = '#E2E2E2';
const BGCOL  = '#F7F7F7';

/* ── Dot rating ── */
const Dots = ({ level }: { level: number }) => {
  const filled = Math.max(1, Math.round((level / 100) * 5));
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[0, 1, 2, 3, 4].map(i => (
        <View key={i} style={{
          width: 5.5, height: 5.5, borderRadius: 3,
          backgroundColor: i < filled ? ACCENT : '#D4D4D4',
          marginRight: i < 4 ? 2.5 : 0,
        }} />
      ))}
    </View>
  );
};

/* ── Section header with orange underline ── */
const SectionHeader = ({ children }: { children: string }) => (
  <View style={{ borderBottomWidth: 1.5, borderBottomColor: ACCENT, borderBottomStyle: 'solid', paddingBottom: 4, marginBottom: 8 }}>
    <Text style={s.sectionTitle}>{children}</Text>
  </View>
);

/* ── Bullet item ── */
const Bullet = ({ text }: { text: string }) => (
  <View style={{ flexDirection: 'row', marginBottom: 3.5 }}>
    <Text style={{ fontSize: 8, color: DARK2, width: 10, paddingTop: 0.5 }}>•</Text>
    <Text style={{ flex: 1, fontSize: 8, color: DARK2, lineHeight: 1.5 }}>{text}</Text>
  </View>
);

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    fontSize: 8.5,
    color: DARK,
  },

  /* ─ Header ─ */
  header: {
    flexDirection: 'row',
    paddingTop: 26,
    paddingBottom: 20,
    paddingHorizontal: 28,
    alignItems: 'flex-start',
  },
  photoBox: {
    width: 112,
    height: 132,
    backgroundColor: BGCOL,
    position: 'relative',
    flexShrink: 0,
  },
  photo: {
    width: 112,
    height: 132,
    objectFit: 'cover',
  },
  photoAccentSquare: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    backgroundColor: ACCENT,
  },
  nameBlock: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 10,
    paddingTop: 4,
  },
  firstNameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  slashText: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
    marginRight: 3,
  },
  firstNameText: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    color: DARK,
  },
  lastNameText: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    letterSpacing: -0.5,
    marginTop: -2,
    lineHeight: 1,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    borderLeftWidth: 2.5,
    borderLeftColor: ACCENT,
    borderLeftStyle: 'solid',
    paddingLeft: 8,
  },
  titleText: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: GRAY,
    letterSpacing: 1.2,
  },
  contactBlock: {
    width: 185,
    paddingTop: 6,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  contactLabel: {
    width: 13,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
    marginRight: 5,
  },
  contactValue: {
    flex: 1,
    fontSize: 7.8,
    color: DARK2,
    lineHeight: 1.4,
  },

  /* ─ Divider ─ */
  divider: {
    height: 1,
    backgroundColor: LINE,
    marginHorizontal: 28,
  },

  /* ─ Bio ─ */
  bioSection: {
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  bioText: {
    fontSize: 8.5,
    color: GRAY,
    lineHeight: 1.65,
  },

  /* ─ Body ─ */
  body: {
    flexDirection: 'row',
    paddingHorizontal: 28,
    paddingTop: 14,
    flex: 1,
  },
  leftCol: {
    width: '33%',
    paddingRight: 16,
  },
  rightCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: LINE,
    borderLeftStyle: 'solid',
    paddingLeft: 16,
  },

  sectionTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    letterSpacing: 0.8,
  },
  subSection: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK2,
    marginBottom: 5,
    marginTop: 9,
  },
  subSlash: {
    color: ACCENT,
  },

  /* ─ Education ─ */
  eduBlock: {
    marginBottom: 9,
  },
  eduDegree: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    letterSpacing: 0.2,
  },
  eduSub: {
    fontSize: 7.8,
    color: GRAY,
    marginTop: 1,
  },
  eduYear: {
    fontSize: 7.5,
    color: LGRAY,
    marginTop: 1,
  },

  /* ─ Experience ─ */
  expBlock: {
    marginBottom: 12,
  },
  expTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 1,
  },
  expCompany: {
    fontSize: 8,
    fontFamily: 'Helvetica-Oblique',
    color: GRAY,
    marginBottom: 5,
  },
  expDesc: {
    fontSize: 8,
    color: GRAY,
    lineHeight: 1.55,
    marginBottom: 5,
  },

  /* ─ Bottom ─ */
  bottom: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: LINE,
    borderTopStyle: 'solid',
    marginTop: 12,
    paddingTop: 12,
    paddingHorizontal: 28,
    paddingBottom: 20,
  },
  bottomCol: {
    flex: 1,
    paddingRight: 10,
  },
  bottomHeader: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    letterSpacing: 0.6,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: ACCENT,
    borderBottomStyle: 'solid',
    paddingBottom: 3,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4.5,
  },
  skillName: {
    fontSize: 7.8,
    color: DARK2,
    flex: 1,
    marginRight: 6,
  },
  refName: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK2,
    marginBottom: 1,
  },
  refRole: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Oblique',
    color: LGRAY,
    marginBottom: 7,
  },

  /* ─ ATS Keywords ─ */
  atsSection: {
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: LINE,
    borderTopStyle: 'solid',
  },
  atsHeader: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
    letterSpacing: 1.0,
    marginBottom: 4,
  },
  atsGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2.5,
  },
  atsLabel: {
    fontSize: 6.8,
    fontFamily: 'Helvetica-Bold',
    color: DARK2,
    marginRight: 4,
  },
  atsKeywords: {
    fontSize: 6.8,
    color: GRAY,
    flex: 1,
    lineHeight: 1.45,
  },
});

/* ═══ Main document ═══ */
export const CVDocument = () => {
  const photoUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/photo.png`
    : '/photo.png';

  const technicalSkills = [
    'ASP.NET Core / Web API',
    'Clean Architecture & DDD',
    'CQRS / Mediator Pattern',
    'Entity Framework / Dapper',
    'REST API / GraphQL',
    'Microservices',
    'React / TypeScript',
    '.NET MAUI / Xamarin',
  ];

  const professionalSkills = skills.softSkills.slice(0, 6).map(s => s.name);

  const coreSkills = skills.architecture.slice(0, 4);
  const advancedSkills = [
    { name: 'React / TypeScript', level: 60 },
    { name: 'Next.js', level: 60 },
    { name: '.NET MAUI', level: 82 },
    { name: 'Xamarin.Forms', level: 78 },
  ];
  const devTools = [
    { name: 'Git', level: 90 },
    { name: 'GitHub Actions', level: 60 },
    { name: 'Docker', level: 20 },
    { name: 'CI/CD Pipelines', level: 85 },
  ];

  return (
    <Document
      title={`CV — ${personalInfo.name}`}
      author={personalInfo.name}
      subject="Curriculum Vitae"
    >
      <Page size="A4" style={s.page}>

        {/* ══ HEADER ══ */}
        <View style={s.header}>

          {/* Photo */}
          <View style={s.photoBox}>
            <Image src={photoUrl} style={s.photo} />
            <View style={s.photoAccentSquare} />
          </View>

          {/* Name + Title */}
          <View style={s.nameBlock}>
            <View style={s.firstNameRow}>
              <Text style={s.slashText}>/</Text>
              <Text style={s.firstNameText}> Elvis Ghislain</Text>
            </View>
            <Text style={s.lastNameText}>AHOUA</Text>
            <View style={s.titleBox}>
              <Text style={s.titleText}>LEAD TECH · DÉVELOPPEUR FULL STACK SENIOR</Text>
            </View>
          </View>

          {/* Contact */}
          <View style={s.contactBlock}>
            {[
              { label: 'P:', value: personalInfo.phone },
              { label: 'E:', value: personalInfo.email },
              { label: 'S:', value: 'github.com/ahoua900' },
              { label: 'A:', value: personalInfo.location },
            ].map(({ label, value }) => (
              <View key={label} style={s.contactRow}>
                <Text style={s.contactLabel}>{label}</Text>
                <Text style={s.contactValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ══ DIVIDER ══ */}
        <View style={s.divider} />

        {/* ══ BIO ══ */}
        <View style={s.bioSection}>
          <Text style={s.bioText}>{personalInfo.bio}</Text>
        </View>

        {/* ══ DIVIDER ══ */}
        <View style={s.divider} />

        {/* ══ BODY ══ */}
        <View style={s.body}>

          {/* ─ LEFT COL ─ */}
          <View style={s.leftCol}>

            {/* SKILLS */}
            <SectionHeader>COMPÉTENCES</SectionHeader>

            <Text style={s.subSection}>
              <Text style={s.subSlash}>// </Text>TECHNIQUES
            </Text>
            {technicalSkills.map(skill => <Bullet key={skill} text={skill} />)}

            <Text style={s.subSection}>
              <Text style={s.subSlash}>// </Text>SAVOIR-ÊTRE
            </Text>
            {professionalSkills.map(skill => <Bullet key={skill} text={skill} />)}

            {/* EDUCATION */}
            <View style={{ marginTop: 14 }}>
              <SectionHeader>FORMATION</SectionHeader>
              {education.map((edu, i) => (
                <View key={i} style={s.eduBlock}>
                  <Text style={s.eduDegree}>{edu.degree.toUpperCase()}</Text>
                  <Text style={s.eduSub}>{edu.institution}</Text>
                  <Text style={s.eduYear}>{edu.year}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ─ RIGHT COL ─ */}
          <View style={s.rightCol}>
            <SectionHeader>EXPÉRIENCE PROFESSIONNELLE</SectionHeader>

            {experiences.map((exp, i) => (
              <View key={i} style={s.expBlock}>
                <Text style={s.expTitle}>{exp.title}</Text>
                <Text style={s.expCompany}>{exp.company}  |  {exp.period}  ·  {exp.type}</Text>
                {exp.tasks.slice(0, 4).map((task, j) => (
                  <Bullet key={j} text={task} />
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* ══ ATS KEYWORDS ══ */}
        <View style={s.atsSection}>
          <Text style={s.atsHeader}>MOTS-CLÉS TECHNIQUES — ATS</Text>

          <View style={s.atsGroup}>
            <Text style={s.atsLabel}>Langages :</Text>
            <Text style={s.atsKeywords}>C#, .NET 8, .NET 6, VB.NET, TypeScript, JavaScript, SQL, HTML5, CSS3</Text>
          </View>

          <View style={s.atsGroup}>
            <Text style={s.atsLabel}>Frameworks Backend :</Text>
            <Text style={s.atsKeywords}>ASP.NET Core, ASP.NET Web API, Entity Framework Core, Dapper, SignalR, MediatR, AutoMapper, FluentValidation, xUnit, NUnit</Text>
          </View>

          <View style={s.atsGroup}>
            <Text style={s.atsLabel}>Frameworks Frontend / Mobile :</Text>
            <Text style={s.atsKeywords}>React 18, Next.js 14, React Native, Expo, .NET MAUI, Xamarin.Forms, TailwindCSS, Framer Motion, Zustand, TanStack Query, Redux</Text>
          </View>

          <View style={s.atsGroup}>
            <Text style={s.atsLabel}>Architecture & Patterns :</Text>
            <Text style={s.atsKeywords}>Clean Architecture, Architecture Hexagonale, Domain-Driven Design (DDD), CQRS, Mediator Pattern, Repository Pattern, SOLID Principles, Design Patterns (GoF), Microservices, API Gateway, Event Sourcing</Text>
          </View>

          <View style={s.atsGroup}>
            <Text style={s.atsLabel}>Bases de données :</Text>
            <Text style={s.atsKeywords}>PostgreSQL, Microsoft SQL Server (MSSQL), MySQL, Redis, MongoDB, Supabase, Azure SQL, Stored Procedures, Query Optimization, Index Tuning</Text>
          </View>

          <View style={s.atsGroup}>
            <Text style={s.atsLabel}>DevOps & Cloud :</Text>
            <Text style={s.atsKeywords}>Docker, GitHub Actions, Azure DevOps, CI/CD Pipelines, Azure App Service, Git, GitFlow, Branching Strategies, Code Review, SonarQube</Text>
          </View>

          <View style={s.atsGroup}>
            <Text style={s.atsLabel}>IA & APIs :</Text>
            <Text style={s.atsKeywords}>Mistral AI, Claude AI (Anthropic), OpenAI, LLM Integration, REST API, GraphQL, JWT, OAuth2, Swagger / OpenAPI, WhatsApp API, Webhooks</Text>
          </View>

          <View style={s.atsGroup}>
            <Text style={s.atsLabel}>Méthodologies :</Text>
            <Text style={s.atsKeywords}>Agile, Scrum, Kanban, TDD (Test-Driven Development), Code Review, Pair Programming, Documentation technique, Leadership technique, Mentoring</Text>
          </View>
        </View>

        {/* ══ BOTTOM 4 COLS ══ */}
        <View style={s.bottom}>

          {/* References */}
          <View style={s.bottomCol}>
            <Text style={s.bottomHeader}>RÉFÉRENCES</Text>
            <Text style={s.refName}>LinkedIn</Text>
            <Text style={s.refRole}>linkedin.com/in/elvis-ahoua</Text>
            <Text style={s.refName}>GitHub</Text>
            <Text style={s.refRole}>github.com/ahoua900</Text>
            <Text style={{ fontSize: 7.5, color: LGRAY, fontFamily: 'Helvetica-Oblique', marginTop: 2 }}>
              Références disponibles sur demande
            </Text>
          </View>

          {/* Core */}
          <View style={s.bottomCol}>
            <Text style={s.bottomHeader}>ARCHITECTURE</Text>
            {coreSkills.map(skill => (
              <View key={skill.name} style={s.skillRow}>
                <Text style={s.skillName}>{skill.name}</Text>
                <Dots level={skill.level} />
              </View>
            ))}
          </View>

          {/* Advanced */}
          <View style={s.bottomCol}>
            <Text style={s.bottomHeader}>FRONTEND · MOBILE</Text>
            {advancedSkills.map(skill => (
              <View key={skill.name} style={s.skillRow}>
                <Text style={s.skillName}>{skill.name}</Text>
                <Dots level={skill.level} />
              </View>
            ))}
          </View>

          {/* Dev Tools */}
          <View style={{ ...s.bottomCol, paddingRight: 0 }}>
            <Text style={s.bottomHeader}>DEV TOOLS</Text>
            {devTools.map(skill => (
              <View key={skill.name} style={s.skillRow}>
                <Text style={s.skillName}>{skill.name}</Text>
                <Dots level={skill.level} />
              </View>
            ))}
          </View>

        </View>
      </Page>
    </Document>
  );
};
