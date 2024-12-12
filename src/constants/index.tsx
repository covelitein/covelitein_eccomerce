import React from "react";
import {
  Code,
  Layers,
  Settings,
  RefreshCw,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import {
  AiOutlineBook,
  AiOutlineBulb,
  AiOutlineCustomerService,
} from "react-icons/ai";

export const aboutPoints = [
  {
    id: 1,
    title: "Professional Support",
    description:
      "Our team provides dedicated support to ensure your projects are executed seamlessly. We're here to guide you every step of the way.",
    icon: <AiOutlineCustomerService size={30} className="text-white" />,
  },
  {
    id: 2,
    title: "Planning and Execution",
    description:
      "We excel at turning ideas into actionable plans, ensuring flawless execution and measurable results for your business.",
    icon: <AiOutlineBulb size={30} className="text-white" />,
  },
  {
    id: 3,
    title: "Education",
    description:
      "We empower our clients with the knowledge and tools needed to navigate the digital world confidently and effectively.",
    icon: <AiOutlineBook size={30} className="text-white" />,
  },
];
export const services = [
  {
    title: "Custom Software Development",
    description:
      "Tailored software solutions for startups and established businesses, designed to enhance productivity and scale operations effectively.",
    icon: <Code size={36} className="text-blue-600" />,
  },
  {
    title: "Digital Product Design & Development",
    description:
      "End-to-end design and development of digital products, from ideation to launch, with a focus on user experience and cutting-edge technology.",
    icon: <Layers size={36} className="text-blue-600" />,
  },
  {
    title: "Technology Consulting & Strategy",
    description:
      "Expert guidance for leveraging the right technology stack to meet business goals, optimize processes, and stay ahead in a competitive market.",
    icon: <Settings size={36} className="text-blue-600" />,
  },
  {
    title: "Brand Digital Transformation",
    description:
      "Helping brands modernize and transition into the digital age through innovative tools, scalable platforms, and data-driven decision-making.",
    icon: <RefreshCw size={36} className="text-blue-600" />,
  },
  {
    title: "Tech Literacy Workshops",
    description:
      "Empowering teams with essential digital skills and knowledge to navigate and utilize technology effectively in their daily operations.",
    icon: <BookOpen size={36} className="text-blue-600" />,
  },
  {
    title: "Skill Enhancement Bootcamps",
    description:
      "Intensive, hands-on training programs to help individuals and teams upskill in emerging technologies and methodologies.",
    icon: <TrendingUp size={36} className="text-blue-600" />,
  },
];

export const pricingPlans = [
  {
    title: "Starter",
    price: "$49",
    description: "For individuals or small teams just getting started.",
    features: [
      "Custom Software Solutions",
      "Basic Technology Consulting",
      "UI/UX Design Services",
      "Email Support",
    ],
    buttonLabel: "Choose Starter",
    isPopular: false,
  },
  {
    title: "Professional",
    price: "$99",
    description: "Ideal for growing businesses requiring advanced solutions.",
    features: [
      "Everything in Starter",
      "Digital Product Development",
      "Brand Digital Transformation",
      "Priority Support",
    ],
    buttonLabel: "Choose Professional",
    isPopular: true,
  },
  {
    title: "Enterprise",
    price: "$199",
    description: "Designed for enterprises needing tailored services.",
    features: [
      "Everything in Professional",
      "Custom Technology Strategy",
      "Dedicated Account Manager",
      "Advanced Security Solutions",
    ],
    buttonLabel: "Choose Enterprise",
    isPopular: false,
  },
];

export const educationPlans = [
  {
    title: "Basic",
    price: "$50",
    description: "Great for beginners looking to upskill.",
    features: [
      "Tech Literacy Workshops",
      "Access to Community Forums",
      "Email Support",
    ],
    buttonLabel: "Get Basic",
    isPopular: false,
  },
  {
    title: "Advanced",
    price: "$80",
    description: "Perfect for professionals seeking skill enhancement.",
    features: [
      "Everything in Basic",
      "Skill Enhancement Bootcamps",
      "Certification Programs",
      "Priority Support",
    ],
    buttonLabel: "Get Advanced",
    isPopular: true,
  },
  {
    title: "Masterclass",
    price: "$150",
    description: "For teams and individuals mastering advanced skills.",
    features: [
      "Everything in Advanced",
      "One-on-One Mentorship",
      "Custom Workshops",
      "Exclusive Resources",
    ],
    buttonLabel: "Get Masterclass",
    isPopular: false,
  },
];

export const reviews = [
  {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    comment:
      "Amazing service! The team went above and beyond to deliver exactly what we needed. Highly recommend!",
  },
  {
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/100?img=2",
    rating: 4,
    comment:
      "Great experience overall. The communication was excellent, and the project was delivered on time.",
  },
  {
    name: "Emily Johnson",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    comment:
      "Exceptional quality and attention to detail. Our project turned out better than expected!",
  },
];

export const navigationLinks: { label: string; href: string }[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blogs", href: "/#blogs" },
];

export const blogs = [
  {
    title: "How Digital Transformation is Shaping the Future",
    image:
      "https://images.pexels.com/photos/3194523/pexels-photo-3194523.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Discover how brands are leveraging digital transformation to stay competitive in a rapidly changing world.",
    link: "#",
  },
  {
    title: "5 Tips for Building a Successful Digital Product",
    image:
      "https://images.pexels.com/photos/3653849/pexels-photo-3653849.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Learn key strategies for creating digital products that delight users and drive business growth.",
    link: "#",
  },
  {
    title: "Why Technology Consulting is a Game-Changer",
    image:
      "https://images.pexels.com/photos/3153204/pexels-photo-3153204.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Explore the benefits of working with tech consultants to optimize your processes and achieve your goals.",
    link: "#",
  },
];

export const faqs: { id: string; question: string; answer: string }[] = [
  {
    id: "question-1",
    question: "What services do you offer?",
    answer:
      "We specialize in web and mobile app development, UX/UI design, and providing tech solutions for businesses of all sizes.",
  },
  {
    id: "question-2",
    question: "How long does it take to build a website?",
    answer:
      "The timeline depends on the complexity of the project. On average, it can take 4-12 weeks for a standard website.",
  },
  {
    id: "question-3",
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer maintenance and support services to ensure yourwebsite or app remains up-to-date and functional.",
  },
  {
    id: "question-4",
    question: "What is your pricing structure?",
    answer:
      "Our pricing depends on the scope and requirements of the project. Contact us for a custom quote.",
  },
  {
    id: "question-5",
    question: "Can you work with my existing team?",
    answer:
      "Absolutely! We can collaborate with your in-house team to achieve your goals.",
  },
];
