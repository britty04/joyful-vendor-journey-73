
import { Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AIAssistantButtonProps {
  onClick: () => void;
}

const AIAssistantButton = ({ onClick }: AIAssistantButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      variant="outline" 
      size="lg"
      className="group hover:bg-primary/10 border-primary/20 hover:border-primary/30 transition-all"
    >
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">Ask AI Assistant</span>
        <Sparkles className="h-4 w-4 text-primary opacity-70" />
      </div>
    </Button>
  );
};

export default AIAssistantButton;
