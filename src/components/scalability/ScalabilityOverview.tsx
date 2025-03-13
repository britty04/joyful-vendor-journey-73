
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Layers, Puzzle, Globe, Users, Cpu, Shield } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <Card className="border-border transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          {icon}
        </div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const ScalabilityOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Feature
        icon={<Layers className="h-6 w-6" />}
        title="Modular Architecture"
        description="Our system is built with independent, reusable components that can be combined to create new features without breaking existing functionality."
      />
      
      <Feature
        icon={<Puzzle className="h-6 w-6" />}
        title="Plugin Ecosystem"
        description="Extend platform capabilities with plugins for specialized features like calendar integrations, messaging systems, and more."
      />
      
      <Feature
        icon={<Globe className="h-6 w-6" />}
        title="Multi-Region Support"
        description="Expand your marketplace globally with localization features, multi-currency support, and region-specific compliance tools."
      />
      
      <Feature
        icon={<Users className="h-6 w-6" />}
        title="Multi-Tenant System"
        description="Support various business models with our multi-tenant architecture, allowing you to serve different customer segments."
      />
      
      <Feature
        icon={<Cpu className="h-6 w-6" />}
        title="Scalable Infrastructure"
        description="Built on cloud-native technology that automatically scales with your user base and transaction volume."
      />
      
      <Feature
        icon={<Shield className="h-6 w-6" />}
        title="Enterprise Security"
        description="Enterprise-grade security features with data encryption, compliance frameworks, and advanced authentication."
      />
    </div>
  );
};

export default ScalabilityOverview;
