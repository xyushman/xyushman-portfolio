import type { IconType } from 'react-icons';
import { 
  SiGnubash, SiPython, SiCplusplus, SiJavascript, SiTypescript, SiPhp,
  SiHtml5, SiCss, SiBootstrap, SiTailwindcss,
  SiNodedotjs, SiDjango, SiFlask,
  SiMongodb, SiMysql, SiAppwrite,
  SiDocker, SiKubernetes, SiTerraform, SiAnsible, SiJenkins, SiGithubactions, SiGit, SiGithub, SiVagrant, SiPrometheus, SiGrafana, SiLinux,
  SiPytorch, SiPandas,
  SiSass, SiGooglecloud, SiFramer, SiFirebase, SiVuedotjs,
  SiExpress, SiSupabase,
  SiTensorflow, SiJupyter
} from 'react-icons/si';
import { FaJava, FaDatabase, FaAws, FaWindows, FaCloud, FaChartLine } from 'react-icons/fa';

export type Category = 'LANGUAGES' | 'FRONTEND' | 'BACKEND' | 'DATABASES' | 'INFRA - DEVOPS' | 'AI / ML';

export interface SkillNode {
  id: string;
  label: string;
  category: Category;
  icon: IconType;
  color: string;
  x: number; 
  y: number; 
}

let seed = 12345;
const random = () => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const rawSkills: Omit<SkillNode, 'x' | 'y'>[] = [
  // Programming & Scripting
  { id: 'bash', label: 'Bash', category: 'LANGUAGES', icon: SiGnubash, color: '#4EAA25' },
  { id: 'py', label: 'Python', category: 'LANGUAGES', icon: SiPython, color: '#3776ab' },
  { id: 'cpp', label: 'C++', category: 'LANGUAGES', icon: SiCplusplus, color: '#00599c' },
  { id: 'java', label: 'Java', category: 'LANGUAGES', icon: FaJava, color: '#5382a1' },
  { id: 'js', label: 'JavaScript', category: 'LANGUAGES', icon: SiJavascript, color: '#f7df1e' },
  { id: 'ts', label: 'TypeScript', category: 'LANGUAGES', icon: SiTypescript, color: '#3178c6' },
  { id: 'php', label: 'PHP', category: 'LANGUAGES', icon: SiPhp, color: '#777bb4' },

  // Frontend
  { id: 'html', label: 'HTML', category: 'FRONTEND', icon: SiHtml5, color: '#e34f26' },
  { id: 'css', label: 'CSS', category: 'FRONTEND', icon: SiCss, color: '#1572b6' },
  { id: 'sass', label: 'Sass', category: 'FRONTEND', icon: SiSass, color: '#cc6699' },
  { id: 'bootstrap', label: 'Bootstrap', category: 'FRONTEND', icon: SiBootstrap, color: '#7952b3' },
  { id: 'tailwind', label: 'Tailwind', category: 'FRONTEND', icon: SiTailwindcss, color: '#06b6d4' },
  { id: 'framer', label: 'Framer Motion', category: 'FRONTEND', icon: SiFramer, color: '#0055FF' },
  { id: 'vuejs', label: 'Vue.js', category: 'FRONTEND', icon: SiVuedotjs, color: '#4FC08D' },

  // Backend
  { id: 'node', label: 'Node.js', category: 'BACKEND', icon: SiNodedotjs, color: '#339933' },
  { id: 'express', label: 'Express.js', category: 'BACKEND', icon: SiExpress, color: '#ffffff' },
  { id: 'django', label: 'Django', category: 'BACKEND', icon: SiDjango, color: '#092e20' },
  { id: 'flask', label: 'Flask', category: 'BACKEND', icon: SiFlask, color: '#ffffff' },

  // Databases & DB Services
  { id: 'mongodb', label: 'MongoDB', category: 'DATABASES', icon: SiMongodb, color: '#47a248' },
  { id: 'mysql', label: 'MySQL', category: 'DATABASES', icon: SiMysql, color: '#4479a1' },
  { id: 'dynamodb', label: 'DynamoDB', category: 'DATABASES', icon: FaAws, color: '#4053D6' },
  { id: 'rds', label: 'AWS RDS', category: 'DATABASES', icon: FaAws, color: '#527FFF' },
  { id: 'oracle', label: 'Oracle', category: 'DATABASES', icon: FaDatabase, color: '#F80000' },
  { id: 'appwrite', label: 'Appwrite', category: 'DATABASES', icon: SiAppwrite, color: '#F02E65' },
  { id: 'neondb', label: 'NeonDB', category: 'DATABASES', icon: FaDatabase, color: '#00e599' },
  { id: 'firebase', label: 'Firebase', category: 'DATABASES', icon: SiFirebase, color: '#FFCA28' },
  { id: 'supabase', label: 'Supabase', category: 'DATABASES', icon: SiSupabase, color: '#3ECF8E' },

  // Infra & DevOps
  { id: 'aws', label: 'AWS', category: 'INFRA - DEVOPS', icon: FaAws, color: '#232f3e' },
  { id: 'googlecloud', label: 'Google Cloud', category: 'INFRA - DEVOPS', icon: SiGooglecloud, color: '#4285F4' },
  { id: 'azure', label: 'Azure', category: 'INFRA - DEVOPS', icon: FaCloud, color: '#0078D4' },
  { id: 'terraform', label: 'Terraform', category: 'INFRA - DEVOPS', icon: SiTerraform, color: '#7b42bc' },
  { id: 'ansible', label: 'Ansible', category: 'INFRA - DEVOPS', icon: SiAnsible, color: '#EE0000' },
  { id: 'docker', label: 'Docker', category: 'INFRA - DEVOPS', icon: SiDocker, color: '#2496ed' },
  { id: 'k8s', label: 'Kubernetes', category: 'INFRA - DEVOPS', icon: SiKubernetes, color: '#326ce5' },
  { id: 'jenkins', label: 'Jenkins', category: 'INFRA - DEVOPS', icon: SiJenkins, color: '#D24939' },
  { id: 'githubactions', label: 'GitHub Actions', category: 'INFRA - DEVOPS', icon: SiGithubactions, color: '#2088ff' },
  { id: 'git', label: 'Git', category: 'INFRA - DEVOPS', icon: SiGit, color: '#f05032' },
  { id: 'github', label: 'GitHub', category: 'INFRA - DEVOPS', icon: SiGithub, color: '#ffffff' },
  { id: 'vagrant', label: 'Vagrant', category: 'INFRA - DEVOPS', icon: SiVagrant, color: '#1563FF' },
  { id: 'cloudformation', label: 'CloudFormation', category: 'INFRA - DEVOPS', icon: FaAws, color: '#FF4F8B' },
  { id: 'prometheus', label: 'Prometheus', category: 'INFRA - DEVOPS', icon: SiPrometheus, color: '#E6522C' },
  { id: 'grafana', label: 'Grafana', category: 'INFRA - DEVOPS', icon: SiGrafana, color: '#F46800' },
  { id: 'linux', label: 'Linux', category: 'INFRA - DEVOPS', icon: SiLinux, color: '#fcc624' },
  { id: 'windows', label: 'Windows Server', category: 'INFRA - DEVOPS', icon: FaWindows, color: '#0078D6' },

  // AI & ML
  { id: 'pytorch', label: 'PyTorch', category: 'AI / ML', icon: SiPytorch, color: '#ee4c2c' },
  { id: 'pandas', label: 'Pandas', category: 'AI / ML', icon: SiPandas, color: '#150458' },
  { id: 'tensorflow', label: 'TensorFlow', category: 'AI / ML', icon: SiTensorflow, color: '#FF6F00' },
  { id: 'jupyter', label: 'Jupyter Notebook', category: 'AI / ML', icon: SiJupyter, color: '#F37626' },
  { id: 'matplotlib', label: 'Matplotlib', category: 'AI / ML', icon: FaChartLine, color: '#11557c' }
];

const shuffleArray = <T>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const shuffledSkills = shuffleArray(rawSkills);

const count = shuffledSkills.length;
const cols = Math.ceil(Math.sqrt(count * 1.5)); // Aspect ratio scaling
const rows = Math.ceil(count / cols);

export const SKILLS: SkillNode[] = shuffledSkills.map((skill, index) => {
  const col = index % cols;
  const row = Math.floor(index / cols);
  
  // Use a smaller safe area (80%) and a larger padding (10%) to keep icons away from edges
  const cellW = 80 / cols;
  const cellH = 80 / rows; 
  
  const baseX = 10 + col * cellW + cellW / 2;
  const baseY = 10 + row * cellH + cellH / 2;
  
  const jitterX = (random() - 0.5) * cellW * 0.8;
  const jitterY = (random() - 0.5) * cellH * 0.8;
  
  return {
    ...skill,
    x: baseX + jitterX,
    y: baseY + jitterY
  };
});
