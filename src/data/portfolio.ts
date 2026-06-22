export const personalInfo = {
  name: 'AHOUA Elvis Ghislain',
  firstName: 'Elvis',
  lastName: 'AHOUA',
  title: 'Lead Tech & Développeur Full Stack Senior',
  subtitle: 'Architecte logiciel | Expert .NET / React | IA & Automatisation',
  location: 'Abidjan, Côte d\'Ivoire',
  email: 'elvisahoua64@gmail.com',
  phone: '+225 07 68 46 67 45',
  github: 'https://github.com/ahoua900',
  linkedin: 'https://linkedin.com/in/elvis-ahoua',
  whatsapp: 'https://wa.me/2250768466745',
  calendly: 'https://calendly.com/elvisahoua64/30min',
  bio: `Développeur Full Stack & Mobile passionné avec 5 ans d'expérience dans la conception et le développement d'applications web et mobiles. Expert en architectures robustes (Clean Architecture, DDD, Hexagonale), j'ai évolué en tant que Lead Tech chez CHK Groupe, où je dirige des équipes et conçois des systèmes haute performance. Ma mission : transformer les défis techniques complexes en solutions élégantes qui créent de la valeur réelle.`,
  vision: `Je crois en un développement logiciel qui allie excellence technique, impact business et expérience utilisateur irréprochable. Chaque ligne de code doit avoir un but, chaque architecture doit évoluer avec grâce.`,
  cvUrl: '/cv-ahoua-elvis.pdf',
};

export const stats = [
  { label: 'Années d\'expérience', value: 5, suffix: '+' },
  { label: 'Projets livrés', value: 20, suffix: '+' },
  { label: 'Technologies maîtrisées', value: 20, suffix: '+' },
  { label: 'Clients satisfaits', value: 10, suffix: '+' },
];

export const experiences = [
  {
    period: 'Depuis Juillet 2025',
    title: 'Lead Tech',
    company: 'CHK GROUPE',
    type: 'CDI',
    color: '#6C63FF',
    tasks: [
      'Leadership technique d\'une équipe de développeurs',
      'Architecture et développement d\'un projet complet de gestion hôtelière (hébergement aux caisses)',
      'Conception d\'architectures hexagonales et Clean Code',
      'Refonte complète du projet CloudPaie (backend & frontend)',
      'Mise en place d\'une application Web & Mobile de gestion des congés',
      'Collaboration avec les parties prenantes pour aligner solutions techniques et besoins métiers',
    ],
  },
  {
    period: 'Depuis Juin 2025',
    title: 'Consultant .NET C#',
    company: 'INTUIT CORPORATE',
    type: 'Consulting',
    color: '#00D4FF',
    tasks: [
      'Conception et optimisation d\'architectures existantes vers des architectures hexagonales',
      'Assistance aux équipes sur les projets existants avec assurance qualité du code',
      'Optimisation de fonctionnalités existantes sur les projets de l\'entreprise',
    ],
  },
  {
    period: 'Octobre 2023 – Juin 2025',
    title: 'Analyste Développeur',
    company: 'GROUPE CHK',
    type: 'CDI',
    color: '#00FF88',
    tasks: [
      'Conception d\'application web RH pour la gestion des déclarations des pays de l\'UEMOA',
      'Migration backend de VB.NET vers C# avec refactoring complet',
      'Optimisation de l\'application TimeSheet (backend & requêtes SQL)',
      'Assistance sur les projets existants de l\'entreprise',
    ],
  },
];

export const education = [
  {
    degree: 'Diplôme de Développeur C#',
    institution: 'Not a Number (NAN)',
    year: '2020 – 2021',
    icon: '🎓',
  },
  {
    degree: 'Licence Développement d\'applications (en cours)',
    institution: 'Université Virtuelle de Côte d\'Ivoire',
    year: '2018 – 2023',
    icon: '🎓',
  },
];

export const technologies = [
  {
    name: 'C# / .NET',
    icon: '⬛',
    logo: 'csharp',
    years: 5,
    level: 85,
    color: '#6C63FF',
    category: 'Backend',
    description: 'ASP.NET Core, Clean Architecture, DDD, Microservices',
    codeExample: `// API RESTful avec Clean Architecture
[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly IMediator _mediator;

    public EmployeeController(IMediator mediator)
        => _mediator = mediator;

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(
        [FromBody] CreateEmployeeCommand cmd)
    {
        var result = await _mediator.Send(cmd);
        return result.IsSuccess
            ? Created($"/api/employees/{result.Value.Id}", result.Value)
            : BadRequest(result.Error);
    }
}

// Domain Entity avec Value Objects
public class Employee : AggregateRoot<EmployeeId>
{
    public Name FullName { get; private set; }
    public Email Email { get; private set; }
    public Department Department { get; private set; }

    public static Result<Employee> Create(
        string firstName, string lastName, string email)
    {
        var nameResult = Name.Create(firstName, lastName);
        var emailResult = Email.Create(email);

        if (nameResult.IsFailure || emailResult.IsFailure)
            return Result.Failure<Employee>("Invalid data");

        var employee = new Employee(nameResult.Value, emailResult.Value);
        employee.RaiseDomainEvent(new EmployeeCreatedEvent(employee.Id));
        return Result.Success(employee);
    }
}`,
  },
  {
    name: 'React / TypeScript',
    icon: '⚛',
    logo: 'react',
    years: 1,
    level: 60,
    color: '#00D4FF',
    category: 'Frontend',
    description: 'React 18, Hooks, Context, Zustand, Tanstack Query',
    codeExample: `// Dashboard Analytics avec React 18 + TypeScript
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardStats {
  totalEmployees: number;
  monthlyPayroll: number;
  pendingLeaves: number;
  activeContracts: number;
}

export const Dashboard: React.FC = () => {
  const { data, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.get('/stats/dashboard'),
    refetchInterval: 30_000,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-4 gap-6"
    >
      <AnimatePresence>
        {data && Object.entries(data).map(([key, value], i) => (
          <motion.div
            key={key}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card glass rounded-2xl p-6"
          >
            <StatCard label={key} value={value} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};`,
  },
  {
    name: 'SQL / PostgreSQL',
    icon: '🗄',
    logo: 'postgresql',
    years: 4,
    level: 70,
    color: '#00FF88',
    category: 'Database',
    description: 'MSSQL, MySQL, PostgreSQL, Query Optimization, Stored Procedures',
    codeExample: `-- Analyse de la paie mensuelle par département avec CTE
WITH PayrollSummary AS (
    SELECT
        d.name AS department,
        COUNT(e.id) AS employee_count,
        SUM(p.gross_salary) AS total_gross,
        SUM(p.net_salary) AS total_net,
        AVG(p.gross_salary) AS avg_salary,
        PERCENTILE_CONT(0.5) WITHIN GROUP (
            ORDER BY p.gross_salary
        ) AS median_salary
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    JOIN payroll_items p ON e.id = p.employee_id
    WHERE p.period = DATE_TRUNC('month', NOW())
      AND e.status = 'active'
    GROUP BY d.name
),
Ranked AS (
    SELECT *,
        RANK() OVER (ORDER BY total_gross DESC) AS rank,
        ROUND(total_net / NULLIF(total_gross, 0) * 100, 2) AS net_ratio
    FROM PayrollSummary
)
SELECT * FROM Ranked
WHERE rank <= 10
ORDER BY rank;

-- Optimisation avec index composites
CREATE INDEX CONCURRENTLY idx_payroll_period_employee
ON payroll_items (period, employee_id, status)
INCLUDE (gross_salary, net_salary);`,
  },
  {
    name: 'Docker / DevOps',
    icon: '🐳',
    logo: 'docker',
    years: 1,
    level: 20,
    color: '#A855F7',
    category: 'DevOps',
    description: 'Docker, CI/CD, GitHub Actions, Azure DevOps',
    codeExample: `# docker-compose.yml — Architecture microservices
version: '3.8'

services:
  api-gateway:
    build: ./src/ApiGateway
    ports: ["5000:80"]
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - JWT_SECRET=\${JWT_SECRET}
    depends_on: [auth-service, payroll-service]
    networks: [app-network]
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s

  auth-service:
    build: ./src/AuthService
    environment:
      - ConnectionStrings__Default=\${DB_CONNECTION}
      - Redis__Connection=redis:6379
    depends_on: [postgres, redis]

  payroll-service:
    build: ./src/PayrollService
    deploy:
      replicas: 3
      resources:
        limits: { cpus: '0.5', memory: 512M }

  postgres:
    image: postgres:15-alpine
    volumes: [postgres-data:/var/lib/postgresql/data]
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes

networks:
  app-network: { driver: bridge }

volumes:
  postgres-data:`,
  },
  {
    name: 'Next.js / Node.js',
    icon: '🔲',
    logo: 'nextjs',
    years: 1,
    level: 60,
    color: '#FF6B35',
    category: 'Frontend',
    description: 'Next.js 14+, App Router, SSR, API Routes, NestJS',
    codeExample: `// App Router Next.js 14 — Dashboard RH
// app/dashboard/employees/page.tsx

import { Suspense } from 'react';
import { EmployeeTable } from '@/components/EmployeeTable';
import { getEmployees } from '@/lib/api/employees';

export const metadata = {
  title: 'Gestion Employés — CloudPaie Dashboard',
};

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const employees = await getEmployees({
    page: Number(searchParams.page ?? 1),
    search: searchParams.search,
  });

  return (
    <main className="flex-1 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">
          Gestion des Employés
        </h1>
        <p className="text-muted-foreground mt-2">
          {employees.total} employés enregistrés
        </p>
      </header>

      <Suspense fallback={<TableSkeleton />}>
        <EmployeeTable
          data={employees.items}
          pagination={employees.pagination}
        />
      </Suspense>
    </main>
  );
}`,
  },
  {
    name: 'IA / Automatisation',
    icon: '🤖',
    logo: 'ai',
    years: 1,
    level: 60,
    color: '#6C63FF',
    category: 'IA',
    description: 'OpenAI, Mistral AI, Agents IA, Automatisation intelligente',
    codeExample: `// Agent IA pour l'orientation professionnelle
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export class OrientationAgent {
  private systemPrompt = \`Tu es un conseiller d'orientation expert.
    Analyse le profil de l'étudiant et recommande des parcours
    adaptés à ses compétences et aspirations.
    Réponds toujours en JSON structuré.\`;

  async analyzeProfile(profile: StudentProfile): Promise<Recommendations> {
    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 2048,
      system: this.systemPrompt,
      messages: [{
        role: 'user',
        content: JSON.stringify({
          skills: profile.skills,
          interests: profile.interests,
          academicLevel: profile.level,
          goals: profile.goals,
        }),
      }],
    });

    const parsed = JSON.parse(
      response.content[0].type === 'text'
        ? response.content[0].text : '{}'
    );

    return {
      careers: parsed.careers,
      formations: parsed.formations,
      skills_to_develop: parsed.skills_to_develop,
      timeline: parsed.timeline,
    };
  }
}`,
  },
  {
    name: 'MAUI / Xamarin',
    icon: '📱',
    logo: 'maui',
    years: 3,
    level: 78,
    color: '#00D4FF',
    category: 'Mobile',
    description: '.NET MAUI, Xamarin.Forms, Applications cross-platform',
    codeExample: `// .NET MAUI — Application de gestion des congés
public partial class LeaveRequestPage : ContentPage
{
    private readonly LeaveViewModel _viewModel;

    public LeaveRequestPage(LeaveViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = _viewModel = viewModel;
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await _viewModel.LoadAsync();
    }
}

// ViewModel avec MVVM + CommunityToolkit
public partial class LeaveViewModel : ObservableObject
{
    [ObservableProperty]
    private ObservableCollection<LeaveRequest> leaveRequests = [];

    [ObservableProperty]
    private bool isLoading;

    [RelayCommand]
    private async Task SubmitLeaveAsync(LeaveRequestDto dto)
    {
        IsLoading = true;
        try
        {
            var result = await _leaveService.CreateAsync(dto);
            if (result.IsSuccess)
            {
                await Shell.Current.GoToAsync("..");
                await Toast.Make("Demande envoyée!").Show();
            }
        }
        finally { IsLoading = false; }
    }
}`,
  },
  {
    name: 'Git / CI-CD',
    icon: '🔀',
    logo: 'git',
    years: 3,
    level: 60,
    color: '#FF6B35',
    category: 'DevOps',
    description: 'Git, GitHub Actions, Azure Pipelines, Branching strategies',
    codeExample: `# .github/workflows/deploy.yml — CI/CD Pipeline complet
name: 🚀 Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    name: 🔍 Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with: { dotnet-version: '8.0.x' }
      - run: dotnet restore
      - run: dotnet build --no-restore
      - run: dotnet test --no-build --verbosity normal --collect:"XPlat Code Coverage"
      - uses: codecov/codecov-action@v4

  deploy:
    name: 🚀 Deploy
    needs: quality
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Build & Push Docker image
        run: |
          docker build -t ghcr.io/\${{ github.repository }}:\${{ github.sha }} .
          docker push ghcr.io/\${{ github.repository }}:\${{ github.sha }}
      - name: Deploy to Azure
        uses: azure/webapps-deploy@v3
        with:
          app-name: chk-pms-api
          images: ghcr.io/\${{ github.repository }}:\${{ github.sha }}`,
  },
];

export const skills = {
  backend: [
    { name: 'ASP.NET Core', level: 85 },
    { name: 'Clean Architecture', level: 82 },
    { name: 'DDD / CQRS', level: 88 },
    { name: 'Entity Framework', level: 85 },
    { name: 'Dapper', level: 60 },
    { name: 'SignalR', level: 60 },
    { name: 'REST / GraphQL', level: 87 },
    { name: 'Microservices', level: 72 },
  ],
  frontend: [
    { name: 'React 18', level: 60 },
    { name: 'TypeScript', level: 60 },
    { name: 'Next.js 14', level: 60 },
    { name: 'Tailwind CSS', level: 60 },
    { name: 'Framer Motion', level: 60 },
    { name: 'Tanstack Query', level: 85 },
  ],
  mobile: [
    { name: '.NET MAUI', level: 82 },
    { name: 'Xamarin.Forms', level: 78 },
    { name: 'React Native', level: 70 },
    { name: 'Expo', level: 72 },
  ],
  devops: [
    { name: 'Docker', level: 20 },
    { name: 'GitHub Actions', level: 60 },
    { name: 'CI/CD', level: 85 },
  ],
  architecture: [
    { name: 'Clean Architecture', level: 92 },
    { name: 'Architecture Hexagonale', level: 90 },
    { name: 'DDD', level: 85 },
    { name: 'SOLID Principles', level: 95 },
    { name: 'Design Patterns', level: 88 }
  ],
  softSkills: [
    { name: 'Leadership technique', level: 90 },
    { name: 'Communication', level: 88 },
    { name: 'Mentoring', level: 85 },
    { name: 'Problem Solving', level: 95 },
    { name: 'Agilité / Scrum', level: 85 },
    { name: 'Gestion de projet', level: 80 },
  ],
};

export const projects = [
  {
    id: 1,
    title: 'CHK PMS — Système de Gestion Hôtelière',
    category: 'Enterprise',
    tags: ['C#', '.NET 8', 'React', 'PostgreSQL', 'Clean Architecture'],
    description: 'Système complet de gestion hôtelière couvrant l\'hébergement, la réservation, les caisses, la facturation et les rapports. Architecture hexagonale avec microservices.',
    longDescription: 'Plateforme enterprise complète pour CHK Groupe intégrant la gestion des chambres, réservations en temps réel, caisse enregistreuse intelligente, facturation automatisée, et tableau de bord analytics. Architecture hexagonale garantissant une scalabilité maximale.',
    impact: 'Réduction de 60% du temps de gestion, élimination des erreurs de facturation, ROI positif en 3 mois',
    image: '/projects/chk-pms.png',
    color: '#6C63FF',
    featured: true,
    github: '#',
    demo: '#',
    role: 'Lead Tech & Architecte',
  },
  {
    id: 2,
    title: 'CloudPaie — Refonte Complète',
    category: 'Enterprise',
    tags: ['C#', '.NET 8', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    description: 'Refonte totale du système de gestion de paie CloudPaie. Migration vers Clean Architecture, refonte UI/UX, optimisation des performances et nouvelles fonctionnalités.',
    longDescription: 'Projet de refonte majeure du logiciel CloudPaie utilisé par des entreprises ivoiriennes pour la gestion de la paie. Migration de VB.NET vers C# avec Clean Architecture, nouvelle interface React moderne, et optimisation des calculs de paie complexes.',
    impact: 'Performance 3x améliorée, 0 bug critique post-livraison, adoption par 100% des utilisateurs en 2 semaines',
    image: '/projects/cloudpaie.png',
    color: '#00D4FF',
    featured: true,
    github: '#',
    demo: '#',
    role: 'Lead Tech & Développeur Senior',
  },
  {
    id: 3,
    title: 'Djonanko — WhatsApp Pro PME',
    category: 'SaaS',
    tags: ['Next.js', 'NestJS', 'Supabase', 'Docker', 'WhatsApp API'],
    description: 'Plateforme SaaS permettant aux PME africaines de gérer leurs communications WhatsApp professionnellement. Multi-agents, réponses automatiques, analytics.',
    longDescription: 'Application web Next.js couplée à un microservice NestJS intégrant l\'Evolution API pour WhatsApp. Permet aux équipes commerciales de gérer toutes leurs conversations WhatsApp depuis un dashboard centralisé avec analytics en temps réel.',
    impact: 'Temps de réponse client divisé par 5, gestion centralisée de 500+ conversations/jour',
    image: '/projects/djonanko.png',
    color: '#25D366',
    featured: true,
    github: '#',
    demo: '#',
    role: 'Architecte & Développeur Full Stack',
  },
  {
    id: 4,
    title: 'FinanceIA — Gestion Financière Mobile Money',
    category: 'IA & Mobile',
    tags: ['React', 'Mistral AI', 'Supabase', 'TypeScript', 'Tailwind'],
    description: 'Application de gestion financière intelligente pour utilisateurs africains de Mobile Money (Orange Money, MTN MoMo, Wave). IA intégrée pour analyses et conseils.',
    longDescription: 'Application mobile-first permettant aux utilisateurs de gérer leurs finances Mobile Money avec l\'aide de Mistral AI. Catégorisation automatique des transactions, conseils personnalisés, objectifs d\'épargne et visualisations avancées.',
    impact: 'Amélioration moyenne de 40% des habitudes d\'épargne des utilisateurs actifs',
    image: '/projects/finance-ia.png',
    color: '#00FF88',
    featured: true,
    github: '#',
    demo: '#',
    role: 'Développeur Full Stack & IA',
  },
  {
    id: 5,
    title: 'TrackDelivery — Livraison Dernier Kilomètre',
    category: 'Logistique',
    tags: ['.NET 8', 'React', 'React Native', 'SignalR', 'PostgreSQL'],
    description: 'Plateforme complète de gestion de livraison : suivi en temps réel des livreurs, gestion des colis, rapports et app mobile dédiée aux livreurs moto.',
    longDescription: 'Solution end-to-end pour la gestion des livraisons urbaines. Backend .NET 8 avec Clean Architecture, webapp admin React, application mobile Expo pour les livreurs. Suivi GPS en temps réel via SignalR.',
    impact: 'Réduction de 35% des délais de livraison, traçabilité 100% des colis',
    image: '/projects/track-delivery.png',
    color: '#FF6B35',
    featured: false,
    github: '#',
    demo: '#',
    role: 'Développeur Full Stack',
  },
  {
    id: 6,
    title: 'AgriStart CI — Plateforme Agricole',
    category: 'AgriTech',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    description: 'Plateforme digitale pour les agriculteurs ivoiriens : gestion des cultures, accès aux marchés, conseils agricoles intelligents et financement participatif.',
    longDescription: 'Écosystème digital complet pour l\'agriculture ivoirienne. Permet aux agriculteurs de gérer leurs exploitations, vendre leurs productions, accéder à des conseils experts et solliciter des financements.',
    impact: 'Augmentation de 25% des revenus des agriculteurs utilisateurs',
    image: '/projects/agristart.png',
    color: '#84CC16',
    featured: false,
    github: '#',
    demo: '#',
    role: 'Développeur Full Stack',
  },
  {
    id: 7,
    title: 'Mon Agent Orientation — IA Éducative',
    category: 'IA & Education',
    tags: ['React', 'Claude AI', 'TypeScript', 'Supabase'],
    description: 'Agent IA intelligent qui aide les étudiants africains à choisir leur orientation professionnelle en analysant leurs compétences, intérêts et le marché de l\'emploi.',
    longDescription: 'Agent IA basé sur Claude (Anthropic) qui analyse le profil complet d\'un étudiant et recommande des parcours professionnels personnalisés, des formations adaptées et un plan d\'action concret.',
    impact: 'Réduction du temps de décision d\'orientation de plusieurs mois à quelques minutes',
    image: '/projects/agent-orientation.png',
    color: '#A855F7',
    featured: false,
    github: '#',
    demo: '#',
    role: 'Développeur & Architecte IA',
  },
  {
    id: 8,
    title: 'Financial Skills Institute',
    category: 'EdTech',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    description: 'Plateforme d\'apprentissage financier avec cours interactifs, simulateurs et certifications pour renforcer les compétences financières des professionnels africains.',
    longDescription: 'LMS (Learning Management System) spécialisé en finance avec modules interactifs, quiz adaptatifs, simulateurs de portefeuille d\'investissement et système de certification reconnu.',
    impact: 'Formation de 500+ professionnels en compétences financières',
    image: '/projects/fsi.png',
    color: '#F59E0B',
    featured: false,
    github: '#',
    demo: '#',
    role: 'Développeur Full Stack',
  },
  {
    id: 9,
    title: 'Gestion Assistance Client',
    category: 'Enterprise',
    tags: ['React', 'TypeScript', 'Vite', '.NET', 'SignalR'],
    description: 'Application de gestion des demandes d\'assistance client avec messagerie en temps réel, suivi de statut, accès temporaire sécurisé et tableau de bord agents.',
    longDescription: 'Outil CRM/support interne permettant aux agents de gérer les tickets d\'assistance, communiquer en temps réel avec les clients, demander des accès temporaires aux systèmes et produire des rapports d\'activité.',
    impact: 'Temps de résolution des tickets réduit de 40%',
    image: '/projects/assistance.png',
    color: '#06B6D4',
    featured: false,
    github: '#',
    demo: '#',
    role: 'Développeur Full Stack',
  },
  {
    id: 10,
    title: 'SAAS PMS — Architecture Multi-tenant',
    category: 'SaaS',
    tags: ['C#', '.NET 8', 'React', 'PostgreSQL', 'Clean Architecture', 'Multi-tenant'],
    description: 'API SaaS multi-tenant pour système de gestion de propriétés (Property Management System) avec SuperAdmin, isolation des données et gestion des abonnements.',
    longDescription: 'Architecture SaaS robuste avec isolation complète des données par tenant, gestion des abonnements, SuperAdmin dashboard et API RESTful documentée. Built avec Clean Architecture et CQRS.',
    impact: 'Scalabilité pour +100 tenants simultanés, déploiement en <5 minutes',
    image: '/projects/saas-pms.png',
    color: '#EC4899',
    featured: false,
    github: '#',
    demo: '#',
    role: 'Architecte & Développeur Senior',
  },
];

export const chatbotKnowledge = {
  name: 'Elvis',
  fullName: 'AHOUA Elvis Ghislain',
  title: 'Lead Tech & Développeur Full Stack Senior',
  location: 'Abidjan, Côte d\'Ivoire',
  experience: '5 ans',
  availability: 'Disponible pour missions freelance et opportunités senior',
  expertise: [
    'Développement .NET / C# (ASP.NET Core, Clean Architecture)',
    'React / TypeScript / Next.js',
    'Architecture hexagonale et DDD',
    'Leadership technique et mentoring',
    'IA et automatisation (Claude AI, Mistral AI)',
    '.NET MAUI / Xamarin (applications mobiles)',
    'DevOps : Docker, CI/CD, GitHub Actions',
    'Bases de données : PostgreSQL, MySQL, MSSQL',
  ],
  services: [
    'Développement d\'applications web complètes (React + .NET)',
    'Architecture et refonte de systèmes legacy',
    'Consulting technique et audit de code',
    'Mise en place de CI/CD et DevOps',
    'Développement d\'applications mobiles MAUI/Xamarin',
    'Intégration d\'IA dans vos applications',
    'Formation et mentoring d\'équipes',
    'Lead Tech pour vos projets',
  ],
  rates: {
    freelance: 'À partir de 500 000 FCFA/mois selon le projet',
    consulting: 'À partir de 300 000 FCFA/mois selon la durée et le contenu',
    formation: 'Sur devis selon la durée et le contenu',
  },
  contact: {
    email: 'elvisahoua64@gmail.com',
    whatsapp: '+225 07 68 46 67 45',
    github: 'github.com/ahoua900',
    linkedin: 'linkedin.com/in/elvis-ahoua',
  },
};
